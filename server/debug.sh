flask shell
from app import app, db
from models.models import *
User.query.first()