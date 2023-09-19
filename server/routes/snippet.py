from flask import request, make_response, session
from sqlalchemy.exc import IntegrityError
from flask_restful import Resource
from models.models import Snippet, Tag
from config import api, db


class Snippets(Resource):
    def get(self):
        snippets = [s.to_dict() for s in Snippet.query.all()]
        return snippets, 200

    def post(self):
        form_json = request.get_json()
        try:
            new_snippet = Snippet(
                text_content=form_json["text_content"],
                image_content=form_json["image_content"],
                user_id=session["user_id"],
            )
            db.session.add(new_snippet)
            db.session.commit()
            for t in form_json["selected_tags"]:
                tag = Tag.query.filter_by(id=t).first()
                new_snippet.tags.append(tag)
            db.session.commit()

            response = make_response(
                new_snippet.to_dict(),
                201,
            )
            return response

        except IntegrityError as e:
            db.session.rollback()
            return {"error": "An unexpected error has occurred"}, 500

        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 422
        finally:
            db.session.close()


class SnippetById(Resource):
    def get(self, id):
        snippet = Snippet.query.filter_by(id=id).first().to_dict()
        if not snippet:
            return {"error": "The item you are looking for cannot be found"}, 404
        return snippet, 200

    def patch(self, id):
        snippet = Snippet.query.filter_by(id=id).first()
        if not snippet:
            return {"error": "The item you are looking for cannot be found"}, 404
        if snippet.user_id != session["user_id"]:
            return {"error": "You are not authorized to perform this action"}, 401

        form_json = request.get_json()

        try:
            for attr in form_json:
                setattr(snippet, attr, form_json[attr])

            db.session.add(snippet)
            db.session.commit()

            response = make_response(snippet.to_dict(), 200)
            return response

        except IntegrityError as e:
            db.session.rollback()
            return {"error": "An unexpected error has occurred"}, 500

        except ValueError as e:
            db.session.rollback()
            return {"error": str(e)}, 422
        finally:
            db.session.close()

    def delete(self, id):
        snippet = Snippet.query.filter_by(id=id).first()
        if not snippet:
            return {"error": "The snippet you are looking for cannot be found"}, 404
        if snippet.user_id != session["user_id"]:
            return {"error": "You are not authorized to perform this action"}, 401

        db.session.delete(snippet)
        db.session.commit()

        response = make_response("snippet deleted", 204)

        return response


api.add_resource(Snippets, "/api/snippets")
api.add_resource(SnippetById, "/api/snippets/<int:id>")
