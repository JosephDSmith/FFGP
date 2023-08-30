from config import db
from sqlalchemy_serializer import SerializerMixin


class Snippet(db.Model, SerializerMixin):
    __tablename__ = "snippets"

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)

    def __repr__(self):
        return f"<Snippet id={self.id} content={self.content}>"
