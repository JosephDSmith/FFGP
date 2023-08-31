from app import app, db
from models.models import *
from faker import Faker
fake = Faker()

with app.app_context():
    print("Starting seed...")
    Snippet.query.delete()
    User.query.delete()
    Tag.query.delete()
    
    user = User(email='asdf@asdf.com')
    snippet = Snippet(text_content='asdf')
    user.snippets.append(snippet)
    db.session.add(user)
    db.session.add(snippet)
    db.session.commit()
    print("Finished seed!")