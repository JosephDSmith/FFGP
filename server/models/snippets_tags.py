from config import db

snippets_tags = db.Table(
    "snippets_tags",
    db.Column("snippet_id", db.Integer, db.ForeignKey("snippets.id")),
    db.Column("tag_id", db.Integer, db.ForeignKey("tags.id")),
)
