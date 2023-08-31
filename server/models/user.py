from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False, unique=True)
    is_admin = db.Column(db.Boolean, default=False)
    _password_hash = db.Column(db.String)
    snippets = db.relationship("Snippet", back_populates="user")

    @validates("email")
    def validate_email(self, key, email):
        email = email.strip()
        if "@" not in email:
            raise ValueError("Please provide a valid email")
        if "." not in email:
            raise ValueError("Please provide a valid email")
        return email

    def __repr__(self):
        return f"<User {self.id=} {self.email=}>"
