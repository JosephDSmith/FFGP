from app import app, db
from models.models import *
from random import choice as rc
from faker import Faker

fake = Faker()

with app.app_context():
    print("Starting seed...")
    db.session.query(snippets_tags).delete()
    Snippet.query.delete()
    User.query.delete()
    Tag.query.delete()
    
    users = []
    for _ in range(10):
        users.append(User(email=fake.email()))
    db.session.add_all(users)

    tags = []
    for _ in range(10):
        t = Tag(name=fake.word())
        tags.append(t)
    db.session.add_all(tags)

    text_snippets = []
    for _ in range(100):
        s = Snippet(text_content=fake.text(100))
        s.user = rc(users)
        s.tags.append(rc(tags))
        text_snippets.append(s)
    db.session.add_all(text_snippets)

    image_snippets = []
    for _ in range(100):
        s = Snippet(image_content=fake.image_url())
        s.user = rc(users)
        s.tags.append(rc(tags))
        s.tags.append(rc(tags))
        image_snippets.append(s)
    db.session.add_all(image_snippets)

    both_snippets = []
    for _ in range(100):
        s = Snippet(image_content=fake.image_url(), text_content=fake.text(100))
        s.user = rc(users)
        s.tags.append(rc(tags))
        s.tags.append(rc(tags))
        s.tags.append(rc(tags))
        both_snippets.append(s)
    db.session.add_all(both_snippets)

    db.session.commit()
    print("Finished seed!")