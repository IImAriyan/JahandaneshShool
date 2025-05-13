
"""
# Jahan Danesh School Backend
"""
"""
       Hello, this project is a website for *Jahan Danesh School*, and this part is the backend.  
     It is built using Python, with the Flask framework and a MySQL database for data storage.  
     The backend also integrates AI-powered features to enhance user experience and automate certain tasks.  
      These AI features may include intelligent recommendations, automated content analysis, or interactive  
         tools to support learning. The backend is designed to be lightweight, fast, and scalable,  
       ensuring a smooth experience for both students and administrators. APIs are exposed for front-end  
     integration, and security measures such as authentication and input validation are implemented to  
                                               protect user data.
"""


# Import Libraries
from flask import Flask, jsonify, request
from flask_cors import CORS
from core.database import DB
from models.user_model import UserModel
from utils.lambada_func import isAdmin
from authentication.jwt import authentication
from controllers.user_controller import UserController
from authentication.jwt import jwt
from config import API_ROUTES

# VARIABLES
HOST = "192.168.10.162"
PORT = 5000

# ------------------ CREATE DB ----------------- "
DB = DB()
(connection, cursor) = DB.connect()
# ------------------ CREATE DB ----------------- "



# ------------------ CREATE FLASK APP ----------------- "
app = Flask(__name__)
CORS(app=app)
# ------------------ CREATE FLASK APP ----------------- "



controllers = {
    "user_controller": UserController(connection=connection, cursor=cursor),
}


test_user_model = UserModel(
    ROW=1,
    USER_ID="1234567890",
    username="EmyLonseUo53", 
    password="User24001261",
    email="adminjonm@gmali.com",
    phone_number="0913423512",
    USER_ROLE="user",
    nationalCode="1234567890",
    address="test address",
)

controllers["user_controller"].add_user(test_user_model)

# Auth service
auth = authentication()

# START ------------------ CREATE API ----------------- [USER CONTROLLER] "

@app.route(API_ROUTES["USER"]["USER_LIST"][1], methods=API_ROUTES["USER"]["USER_LIST"][0])
@auth.token_required()  
def get_user_list(current_user_id):
    try:
        if isAdmin(controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]):
            user_list = controllers["user_controller"].get_all_users()
            return jsonify(user_list), 200
        else:
            return jsonify({'text': "You don't have access to this api"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@app.route(API_ROUTES["USER"]["GET_USER"][1], methods=API_ROUTES["USER"]["GET_USER"][0])
@auth.token_required()
def get_user(user_id,current_user_id):
    try:
        user = controllers["user_controller"].get_user(user_id)
        user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]
        if user :
            if user_id == current_user_id or isAdmin(userRole=user_role) :
              return jsonify(user), 200
            else :
              return jsonify({'text': "You don't have access to this api"}), 403
            
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route(API_ROUTES["USER"]["REM_USER"][1], methods=API_ROUTES["USER"]["REM_USER"][0])
@auth.token_required()
def remove_user(user_id,current_user_id):
    try:
        user_role = controllers["user_controller"].get_user(current_user_id)["USER_ROLE"]
        if isAdmin(userRole=user_role) :
            controllers["user_controller"].delete_user(user_id)
            return jsonify({"text": "کاربر با موفقیت حذف شد"}), 200
        else:
            return jsonify({'text': "You don't have access to this api"}), 403
    except Exception as e:
        return jsonify({"error": str(e)}), 500
  
@app.route(API_ROUTES["AUTHENTICATION"]["LOGIN"][1], methods=API_ROUTES["AUTHENTICATION"]["LOGIN"][0])
def login():
    try:
        data = request.get_json()
        username = data.get("username")
        password = data.get("password")

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400
        
        text , code = controllers["user_controller"].login(username=username,password=password)
        return jsonify(text), code

    except Exception as e:
        return jsonify({"error": str(e)}), 500
  
    
# END ------------------ CREATE API ----------------- [USER CONTROLLER] "



def main():
    if __name__ == "__main__":
        app.run(host=HOST, port=PORT)
main()