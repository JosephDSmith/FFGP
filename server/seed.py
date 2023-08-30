from app import app, db
from models.models import *
from faker import Faker
fake = Faker()

with app.app_context():
    print("Starting seed...")
    Snippet.query.delete()
    for _ in range(1000):
        snippet = Snippet(content=fake.text())
        db.session.add(snippet)
    db.session.commit()
    print("Finished seed!")