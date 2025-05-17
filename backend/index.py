"""
# Jahan Danesh School Backend
"""
"""
    This project is the backend for *Jahan Danesh School's* website.
    It is built using Python with the Flask framework and uses a MySQL database for storage.
    It integrates AI-powered features for smart recommendations, content analysis, and interactive tools.
    The backend is designed to be lightweight, fast, and scalable.
    It exposes APIs for frontend integration and includes security features like authentication and input validation.
"""

# Import required libraries
from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime

# Import modules
from core.database import DB
from models.user_model import UserModel
from models.hadith_model import HadithModel
from utils.lambada_func import isAdmin
from authentication.jwt import authentication
from controllers.user_controller import UserController
from controllers.hadith_controller import HadithController
from environment import API_ROUTES


# Server configuration
HOST = "0.0.0.0" #192.168.10.162
PORT = 5000

# ------------------ Initialize Database ------------------
DB = DB()
(connection, cursor) = DB.connect()
# ----------------------------------------------------------


# ------------------ Initialize Flask App ------------------
app = Flask(__name__)
CORS(app=app)
# ----------------------------------------------------------


# Initialize controllers
controllers = {
    "user_controller": UserController(connection=connection, cursor=cursor),
    "hadith_controller": HadithController(connection=connection, cursor=cursor)
}

# Sample test user (only for initial testing purposes)
# test_user_model = UserModel(
#     ROW=1,
#     USER_ID="1234567890",
#     username="EmyLonseUo53", 
#     password="User24001261",
#     email="adminjonm@gmali.com",
#     phone_number="0913423512",
#     USER_ROLE="user",
#     nationalCode="1234567890",
#     address="test address",
# )

# controllers["user_controller"].add_user(test_user_model)

# Initialize authentication service
auth = authentication()

# ------------------ User Controller APIs ------------------

@app.route(API_ROUTES["USER"]["USER_LIST"][1], methods=API_ROUTES["USER"]["USER_LIST"][0])
@auth.token_required()
def get_user_list(current_user_id):
    try:
        # Check if current user is admin
        if isAdmin(controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]):
            # Fetch all users from database
            user_list = controllers["user_controller"].get_all_users()
            return jsonify(user_list), 200
        else:
            # If not admin, deny access
            return jsonify({'text': "You don't have access to this API"}), 403
    except Exception as e:
        # Handle any unexpected error
        return jsonify({"error": str(e)}), 500


@app.route(API_ROUTES["USER"]["GET_USER"][1], methods=API_ROUTES["USER"]["GET_USER"][0])
@auth.token_required()
def get_user(user_id, current_user_id):
    try:
        # Get target user info from database
        user = controllers["user_controller"].get_user(user_id)

        # Get current user's role
        user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]

        if user:
            # Allow if current user is admin or owner of the data
            if user_id == current_user_id or isAdmin(userRole=user_role):
                return jsonify(user), 200
            else:
                return jsonify({'text': "You don't have access to this API"}), 403
        else:
            # User not found
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        # Handle error
        return jsonify({"error": str(e)}), 500


@app.route(API_ROUTES["USER"]["REM_USER"][1], methods=API_ROUTES["USER"]["REM_USER"][0])
@auth.token_required()
def remove_user(user_id, current_user_id):
    try:
        # Check if current user is admin
        user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]
        if isAdmin(userRole=user_role):
            # Delete user from database
            controllers["user_controller"].delete_user(user_id)
            return jsonify({"text": "User deleted successfully"}), 200
        else:
            return jsonify({'text': "You don't have access to this API"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route(API_ROUTES["USER"]["ADD_USER"][1], methods=API_ROUTES["USER"]["ADD_USER"][0])
@auth.token_required()
def add_user(current_user_id):
    try:
        # Check if current user is admin
        user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]
        if isAdmin(userRole=user_role):
            # Get user data from request body
            data = request.get_json()

            # Create new UserModel object
            new_user = UserModel(
                ROW=None,
                USER_ID=None,  # USER_ID will be auto-generated
                username=data.get("username"),
                password=data.get("password"),
                full_name=data.get("full_name"),
                email=data.get("email"),
                phone_number=data.get("phone_number"),
                USER_ROLE=data.get("USER_ROLE"),
                nationalCode=data.get("nationalCode"),
                address=data.get("address"),
                profile_picture_url=data.get("profile_picture_url"),
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow(),
                is_active=data.get("is_active", True),
                last_login=datetime.utcnow(),
                gender=data.get("gender"),
                birthdate=data.get("birthdate"),
                grade=data.get("grade"),
                parent_phone_number=data.get("parent_phone_number")
            )

            # Save new user to database
            controllers["user_controller"].add_user(new_user)
            return jsonify({"text": "User added successfully"}), 200
        else:
            return jsonify({'text': "You don't have access to this API"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route(API_ROUTES["USER"]["UPDATE_USER"][1], methods=API_ROUTES["USER"]["UPDATE_USER"][0])
@auth.token_required()
def update_user(current_user_id):
    try:
        # Get data from request body
        data = request.get_json()
        user_id = data.get("USER_ID")

        # Validate USER_ID
        if not user_id:
            return jsonify({"error": "USER_ID is required"}), 400
        user = controllers["user_controller"].get_user(user_id)
        # Get current user role
        user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]

        # Check permission: only user or admin can update
        if user_id != current_user_id and not isAdmin(user_role):
            return jsonify({'text': "You don't have access to this API"}), 403

        # Create updated UserModel object
        updated_user = UserModel(
            ROW=None,
            USER_ID=user_id,
            username=data.get("username"),
            password=data.get("password"),
            full_name=data.get("full_name"),
            email=data.get("email"),
            phone_number=data.get("phone_number"),
            USER_ROLE=data.get("USER_ROLE"),
            nationalCode=data.get("nationalCode"),
            address=data.get("address"),
            profile_picture_url=data.get("profile_picture_url"),
            created_at=data.get("created_at", data.get("created_at")),
            updated_at=datetime.utcnow(),
            is_active=data.get("is_active", data.get("is_active"),
            last_login=data.get("last_login", data.get("last_login")),
            gender=data.get("gender"),
            birthdate=data.get("birthdate"),
            grade=data.get("grade"),
            parent_phone_number=data.get("parent_phone_number")
        ))

        # Attempt to update user in DB
        updated = controllers["user_controller"].update_user(USER_ID=user_id, newUser=updated_user)

        # Response based on update result
        if updated:
            return jsonify({"text": "User updated successfully"}), 200
        else:
            return jsonify({"text": "No data was provided to update"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route(API_ROUTES["AUTHENTICATION"]["LOGIN"][1], methods=API_ROUTES["AUTHENTICATION"]["LOGIN"][0])
def login():
    try:
        # Get login credentials from request
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")
        role = data.get("role")
        role = 'user' if role == 'parent' else role

        # Validate input
        if not username or not password:
            return jsonify({"error": "Username , role and password are required"}), 400

        # Attempt login using user controller
        text, code = controllers["user_controller"].login(username=username, password=password,role=role)
        return jsonify(text), code

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ------------------ End of User APIs ------------------

# ------------------ Start of Hadith APIs ------------------

@app.route(API_ROUTES["Hadith"]["GET_LAST"][1], methods=API_ROUTES["Hadith"]["GET_LAST"][0])
@auth.token_required()
def get_last_hadith(current_user_id):
    try:
        # Fetch last hadith from database
        last_hadith = controllers["hadith_controller"].get_last_hadith()
        if last_hadith:
            return jsonify(last_hadith), 200
        else:
            return jsonify({"error": "No hadith found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route(API_ROUTES["Hadith"]["GET_ALL"][1], methods=API_ROUTES["Hadith"]["GET_ALL"][0])
@auth.token_required()
def get_all_hadiths(current_user_id):
    try:
        # Fetch all hadiths from database
        if not isAdmin(controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]):
            return jsonify({'text': "You don't have access to this API"}), 403
        
        hadiths = controllers["hadith_controller"].get_all_hadiths()
        return jsonify(hadiths), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route(API_ROUTES["Hadith"]["ADD_HADITH"][1], methods=API_ROUTES["Hadith"]["ADD_HADITH"][0])
@auth.token_required()
def add_hadith(current_user_id):
    try:
        # Check if current user is admin
        user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]
        if not isAdmin(userRole=user_role):
            return jsonify({'text': "You don't have access to this API"}), 403
        
        # Get hadith data from request body
        data = request.get_json()
        
        # Create new HadithModel object
        new_hadith = HadithModel(
            row=None,  # row will be auto-generated
            said_by=data.get("said_by"),
            content=data.get("content"),
            created_in=datetime.utcnow()
        )
        
        # Save new hadith to database
        success = controllers["hadith_controller"].add_hadith(new_hadith)
        
        if success:
            return jsonify({"text": "Hadith added successfully"}), 200
        else:
            return jsonify({"error": "Failed to add hadith"}), 400
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500




# Entry point
def main():
    if __name__ == "__main__":
        app.run(host=HOST, port=PORT)

main()
