import os
from config import app, db
from flask import Flask, url_for, session, redirect, jsonify
from authlib.common.security import generate_token
from authlib.integrations.flask_client import OAuth
from models.models import User
import requests

oauth = OAuth(app)

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')
CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'

oauth.register(
    name='google',
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    server_metadata_url=CONF_URL,
    client_kwargs={
        'scope': 'openid profile email'
    }
)

# This is a route the React front end can call to get session data
@app.route('/api/authorized')
def check_auth():
  if session.get('email'):
    user = User.query.filter_by(email = session.get('email')).first()
    snippet_count = len(user.snippets)

    return jsonify({
      'id': user.id,
      'email': user.email, 
      'picture': user.picture,
      'snippet_count': snippet_count}), 200
  else:
    return jsonify({"error": "unauthorized"}), 401

# This constructs a redirect URI to the Google oauth server 
# and redirects the user there
@app.route('/google/')
def google():
  redirect_uri = url_for('google_auth', _external=True)
  session['nonce'] = generate_token()
  return oauth.google.authorize_redirect(redirect_uri, nonce=session['nonce'])


# The Google auth server redirects the user back to this route
# This route parses out the response to try and auth the user
@app.route('/google/auth')  
def google_auth():
  token = oauth.google.authorize_access_token()
  user = oauth.google.parse_id_token(token, nonce=session['nonce'])
  if user.get('nonce') != session.get('nonce'):
    return 'Invalid nonce', 400
  email = user['email']
  session['email'] = email
  picture = user['picture']
  session['picture'] = picture
  session['token'] = token['access_token']
  db_user = User.query.filter_by(email=email).first()
  if not db_user:
    new_user = User(email=email, picture=picture)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id 
  else:
    session['user_id'] = db_user.id
  return '<html> Success!<script type="text/javascript"> window.onload = function() { window.opener.postMessage({ url: window.location.href }, \'*\'); window.close(); } </script></html>'


# Log out
@app.route('/clear')
def clear():
  session['email'] = None
  session['nonce'] = None
  return redirect('/')

# Revoke the Oauth access
# Useful for resetting the state
@app.route('/revoke')
def revoke():
  token = session['token']

  revoke = requests.post('https://oauth2.googleapis.com/revoke',
      params={'token': token},
      headers = {'content-type': 'application/x-www-form-urlencoded'})

  status_code = getattr(revoke, 'status_code')
  if status_code == 200:
    return redirect(url_for('clear'))
  else:
    return('An error occurred.')  