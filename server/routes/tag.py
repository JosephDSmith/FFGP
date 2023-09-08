from flask import request, make_response, session
from flask_restful import Resource
from models.models import Tag, Snippet
from config import api, db


class Tags(Resource):

    def get(self):
        tags = Tag.query.all()
        tag_list = [tag.to_dict() for tag in tags]
        return tag_list, 200

class TagById(Resource):
    def get(self, id):
        tag = Tag.query.filter_by(id=id).first()
        return tag.to_dict(), 200
        

class SnippetTag(Resource):
    def get(self, id):
        snippet = Snippet.query.get(id)
        if not snippet:
            response = make_response({"error": "Snippet not found"}, 404)
        else:
            tag_list = [tag.to_dict() for tag in snippet.tags]
            response = make_response(tag_list, 200)
        return response

    def post(self, id):
      json_data = request.get_json()
      tag_name = json_data.get("name")

      tag = Tag.query.filter_by(name=tag_name).first()

      if not tag:
          tag = Tag(name=tag_name)

      snippet = Snippet.query.get(id)

      if tag not in snippet.tags:
          snippet.tags.append(tag)
          db.session.add(snippet)
          db.session.commit()
          response = make_response(snippet.to_dict(), 201)
      else:
          response = make_response({"error": "Tag already associated with the snippet"}, 400)

      return response
    
    def delete(self, snippet_id, id):
        snippet = Snippet.query.get(snippet_id)
        tag = Tag.query.get(id)

        if not snippet or not tag:
            return {"error": "Snippet or tag not found"}, 404

        if tag in snippet.tags:
            snippet.tags.remove(tag)
            db.session.commit()
            return "Tag removed from snippet", 204
        else:
            return {"error": "Tag is not associated with the snippet"}, 400


api.add_resource(Tags, "/api/tags", "/api/tags")
api.add_resource(TagById, "/api/tags/<int:id>")
api.add_resource(SnippetTag, "/api/snippets/<int:id>/tag", endpoint="snippet_tag_single")
api.add_resource(SnippetTag, "/api/snippets/<int:snippet_id>/tag/<int:id>", endpoint="snippet_tag_multiple")


