from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_restful import Api
from flask_bcrypt import Bcrypt

app = Flask(__name__,
            static_url_path='',
            static_folder='../client/build',
            template_folder='../client/build'
            )  
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy()

migrate = Migrate(app, db, render_as_batch=True)

db.init_app(app)

bcrypt = Bcrypt(app)

api = Api(app)

CORS(app)
