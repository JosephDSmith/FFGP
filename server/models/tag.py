from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from .snippets_tags import *

from config import db


class Tag(db.Model, SerializerMixin):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    snippets = db.relationship(
        "Snippet", secondary=snippets_tags, back_populates="tags"
    )


    def __repr__(self):
        return f"<Name:{self.name}>"