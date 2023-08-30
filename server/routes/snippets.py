
from flask_restful import Resource
from models.models import Snippet
from config import api


class Snippets(Resource):
    def get(self):
        snippets = [s.to_dict() for s in Snippet.query.all()]
        return snippets, 200


class SnippetDetails(Resource):
    def get(self, id):
        snippet = Snippet.query.filter_by(id=id).first().to_dict()
        return snippet, 200


api.add_resource(Snippets, "/api/snippets")
api.add_resource(SnippetDetails, "/api/snippets/<int:id>")
