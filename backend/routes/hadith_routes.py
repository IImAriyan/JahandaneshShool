from flask import Blueprint, request, jsonify, current_app as app
from datetime import datetime
from models.hadith_model import HadithModel
from utils.lambada_func import isAdmin
from environment import API_ROUTES

hadith_bp = Blueprint("hadith_routes", __name__)

@hadith_bp.route(API_ROUTES["Hadith"]["GET_LAST"][1], methods=API_ROUTES["Hadith"]["GET_LAST"][0])
def get_last_hadith():
    auth = app.auth
    controllers = app.controllers

    @auth.token_required()
    def inner(current_user_id):
        try:
            last_hadith = controllers["hadith_controller"].get_last_hadith()
            if last_hadith:
                return jsonify(last_hadith), 200
            return jsonify({"error": "No hadith found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return inner()


@hadith_bp.route(API_ROUTES["Hadith"]["GET_ALL"][1], methods=API_ROUTES["Hadith"]["GET_ALL"][0])
def get_all_hadiths():
    auth = app.auth
    controllers = app.controllers

    @auth.token_required()
    def inner(current_user_id):
        try:
            user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]
            if not isAdmin(user_role):
                return jsonify({'text': "You don't have access to this API"}), 403

            hadiths = controllers["hadith_controller"].get_all_hadiths()
            return jsonify(hadiths), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return inner()


@hadith_bp.route(API_ROUTES["Hadith"]["ADD_HADITH"][1], methods=API_ROUTES["Hadith"]["ADD_HADITH"][0])
def add_hadith():
    auth = app.auth
    controllers = app.controllers

    @auth.token_required()
    def inner(current_user_id):
        try:
            user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]
            if not isAdmin(user_role):
                return jsonify({'text': "You don't have access to this API"}), 403

            data = request.get_json()
            new_hadith = HadithModel(
                row=None,
                said_by=data.get("said_by"),
                content=data.get("content"),
                created_in=datetime.utcnow()
            )

            success = controllers["hadith_controller"].add_hadith(new_hadith)
            if success:
                return jsonify({"text": "Hadith added successfully"}), 200
            return jsonify({"error": "Failed to add hadith"}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return inner()
