from flask import Blueprint, request, jsonify, current_app
from utils.lambada_func import isAdmin
from models.user_model import UserModel
from environment import API_ROUTES

user_bp = Blueprint("user_routes", __name__)


@user_bp.route(API_ROUTES["USER"]["USER_LIST"][1], methods=API_ROUTES["USER"]["USER_LIST"][0])
def get_user_list():
    auth = current_app.auth
    controllers = current_app.controllers

    @auth.token_required()
    def inner(current_user_id):
        try:
            if isAdmin(controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]):
                users = controllers["user_controller"].get_all_users()
                return jsonify(users), 200
            return jsonify({'text': "You don't have access to this API"}), 403
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return inner()


@user_bp.route(API_ROUTES["USER"]["GET_USER"][1], methods=API_ROUTES["USER"]["GET_USER"][0])
def get_user(user_id):
    auth = current_app.auth
    controllers = current_app.controllers

    @auth.token_required()
    def inner(current_user_id):
        try:
            user = controllers["user_controller"].get_user(user_id)
            user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]

            if user:
                if user_id == current_user_id or isAdmin(user_role):
                    user.pop('password', None)
                    return jsonify(user), 200
                return jsonify({'text': "You don't have access to this API"}), 403
            return jsonify({"error": "User not found"}), 404
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return inner()


@user_bp.route(API_ROUTES["USER"]["REM_USER"][1], methods=API_ROUTES["USER"]["REM_USER"][0])
def remove_user(user_id):
    auth = current_app.auth
    controllers = current_app.controllers

    @auth.token_required()
    def inner(current_user_id):
        try:
            user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]
            if isAdmin(user_role):
                controllers["user_controller"].delete_user(user_id)
                return jsonify({"text": "User deleted successfully"}), 200
            return jsonify({'text': "You don't have access to this API"}), 403
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return inner()


@user_bp.route(API_ROUTES["USER"]["ADD_USER"][1], methods=API_ROUTES["USER"]["ADD_USER"][0])
def add_user():
    auth = current_app.auth
    controllers = current_app.controllers

    @auth.token_required()
    def inner(current_user_id):
        try:
            user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]
            if not isAdmin(user_role):
                return jsonify({'text': "You don't have access to this API"}), 403

            data = request.get_json()
            new_user = UserModel(**data)
            controllers["user_controller"].add_user(new_user)
            return jsonify({"text": "User added successfully"}), 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return inner()


@user_bp.route(API_ROUTES["USER"]["UPDATE_USER"][1], methods=API_ROUTES["USER"]["UPDATE_USER"][0])
def update_user():
    auth = current_app.auth
    controllers = current_app.controllers

    @auth.token_required()
    def inner(current_user_id):
        try:
            data = request.get_json()
            user_id = data.get("USER_ID")
            if not user_id:
                return jsonify({"error": "USER_ID is required"}), 400

            user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]
            if user_id != current_user_id and not isAdmin(user_role):
                return jsonify({'text': "You don't have access to this API"}), 403

            updated_user = UserModel(**data)
            updated = controllers["user_controller"].update_user(user_id, updated_user)
            if updated:
                return jsonify({"text": "User updated successfully"}), 200
            return jsonify({"text": "No data was provided to update"}), 400
        except Exception as e:
            return jsonify({"error": str(e)}), 500

    return inner()


@user_bp.route(API_ROUTES["AUTHENTICATION"]["LOGIN"][1], methods=API_ROUTES["AUTHENTICATION"]["LOGIN"][0])
def login():
    controllers = current_app.controllers
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        role = data.get("role", "user")
        role = "user" if role == "parent" else role

        if not username or not password:
            return jsonify({"error": "Username, role and password are required"}), 400

        text, code = controllers["user_controller"].login(username, password, role)
        return jsonify(text), code
    except Exception as e:
        return jsonify({"error": str(e)}), 500
