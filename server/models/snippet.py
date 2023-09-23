from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from .snippets_tags import *

from config import db, bcrypt


class Snippet(db.Model, SerializerMixin):
    __tablename__ = "snippets"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    text_content = db.Column(db.String, nullable=True)
    tags = db.relationship("Tag", secondary=snippets_tags, back_populates="snippets")
    user = db.relationship("User", back_populates="snippets")

    serialize_rules = ("-tags.snippets", "-user.snippets")

    ALLOWED_EXTENSIONS = ["png", "jpg", "jpeg", "gif"]

    @validates("text_content")
    def validate_content(self, key, value):
        if key == "text_content":
            if value is None:
                raise ValueError(
                    "At least one of text_content or image_content must have a value for Snippet."
                )
        return value



    def __repr__(self):
        return f"<Snippet {self.id=}>"
