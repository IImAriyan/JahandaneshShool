from flask import Blueprint, jsonify, request
from datetime import datetime
from models.hadith_model import HadithModel
from utils.lambada_func import isAdmin
from authentication.jwt import authentication
from environment import API_ROUTES

auth = authentication()
hadith_routes = Blueprint('hadith_routes', __name__)

def register_hadith_routes(app, controllers):
    @hadith_routes.route(API_ROUTES["HADITH"]["GET_HADITH_LIST"][1], methods=API_ROUTES["HADITH"]["GET_HADITH_LIST"][0])
    @auth.token_required()
    def get_hadith_list(current_user_id):
        try:
            return jsonify(controllers["hadith_controller"].get_all_hadiths()), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @hadith_routes.route(API_ROUTES["HADITH"]["GET_HADITH_BY_ID"][1], methods=API_ROUTES["HADITH"]["GET_HADITH_BY_ID"][0])
    @auth.token_required()
    def get_hadith_by_id(hadith_id, current_user_id):
        try:
            hadith = controllers["hadith_controller"].get_hadith_by_id(hadith_id)
            if hadith:
                return jsonify(hadith), 200
            return jsonify({"error": "Hadith not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @hadith_routes.route(API_ROUTES["HADITH"]["ADD_HADITH"][1], methods=API_ROUTES["HADITH"]["ADD_HADITH"][0])
    @auth.token_required()
    def add_hadith(current_user_id):
        try:
            if not isAdmin(controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]):
                return jsonify({"text": "You don't have access to this API"}), 403
            data = request.get_json()
            new_hadith = HadithModel(
                ROW=None,
                HADITH_ID=None,
                title=data.get("title"),
                arabic_text=data.get("arabic_text"),
                persian_text=data.get("persian_text"),
                source=data.get("source"),
                narrator=data.get("narrator"),
                topic=data.get("topic"),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
                created_by=current_user_id
            )
            controllers["hadith_controller"].add_hadith(new_hadith)
            return jsonify({"text": "Hadith added successfully"}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @hadith_routes.route(API_ROUTES["HADITH"]["UPDATE_HADITH"][1], methods=API_ROUTES["HADITH"]["UPDATE_HADITH"][0])
    @auth.token_required()
    def update_hadith(current_user_id):
        try:
            if not isAdmin(controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]):
                return jsonify({"text": "You don't have access to this API"}), 403
            data = request.get_json()
            hadith_id = data.get("HADITH_ID")
            if not hadith_id:
                return jsonify({"error": "HADITH_ID is required"}), 400
            updated_hadith = HadithModel(
                ROW=None,
                HADITH_ID=hadith_id,
                title=data.get("title"),
                arabic_text=data.get("arabic_text"),
                persian_text=data.get("persian_text"),
                source=data.get("source"),
                narrator=data.get("narrator"),
                topic=data.get("topic"),
                created_at=data.get("created_at"),
                updated_at=datetime.utcnow(),
                created_by=current_user_id
            )
            updated = controllers["hadith_controller"].update_hadith(HADITH_ID=hadith_id, newHadith=updated_hadith)
            if updated:
                return jsonify({"text": "Hadith updated successfully"}), 200
            return jsonify({"text": "No data was updated"}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @hadith_routes.route(API_ROUTES["HADITH"]["DELETE_HADITH"][1], methods=API_ROUTES["HADITH"]["DELETE_HADITH"][0])
    @auth.token_required()
    def delete_hadith(hadith_id, current_user_id):
        try:
            if not isAdmin(controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]):
                return jsonify({"text": "You don't have access to this API"}), 403
            controllers["hadith_controller"].delete_hadith(hadith_id)
            return jsonify({"text": "Hadith deleted successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    app.register_blueprint(hadith_routes)
