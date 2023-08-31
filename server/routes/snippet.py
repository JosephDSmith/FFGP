from flask_restful import Resource
from models.models import Snippet
from config import api


class Snippets(Resource):
    def get(self):
        snippets = [s.to_dict() for s in Snippet.query.all()]
        return snippets, 200
    
    def post(self):
        pass


class SnippetById(Resource):
    def get(self, id):
        snippet = Snippet.query.filter_by(id=id).first().to_dict()
        return snippet, 200
    
    def patch(self, id):
        #edit snippet
        pass

    def delete(self, id):
        pass


# todo: Add tag 
# todo: Remove tag

api.add_resource(Snippets, "/api/snippets")
api.add_resource(SnippetById, "/api/snippets/<int:id>")
