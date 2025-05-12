
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
from core.database import DB
from models.user_model import UserModel
from controllers.user_controller import UserController
from authentication.jwt import jwt
from config import API_ROUTES

# # ------------------ Testing ----------------- "
# DB = DB()
# (connection, cursor) = DB.connect()
# # user = UserModel(
# #     ROW=None,
# #     USER_ID = "1",
# #     username = "Reza",
# #     password =  "1368",
# #     email = "reza@gmail.com",
# #     phone_number = "0913453821",   
# #     USER_ROLE = "user",
# #     nationalCode = "142701294",
# #     address = "Tehran, Iran"
# # )


# VARIABLES
HOST = "192.168.10.162"
PORT = 5000

# ------------------ CREATE DB ----------------- "
DB = DB()
(connection, cursor) = DB.connect()

app = Flask(__name__)
controllers = {
    "user_controller": UserController(connection=connection, cursor=cursor),
}


# ------------------ CREATE API ----------------- "
@app.route(API_ROUTES["USER"]["USER_LIST"][1], methods=API_ROUTES["USER"]["USER_LIST"][0])
def get_user_list():
    try:
        user_list = controllers["user_controller"].get_all_users()
        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route(API_ROUTES["USER"]["GET_USER"][1], methods=API_ROUTES["USER"]["GET_USER"][0])
def get_user(user_id):
    try:
        user = controllers["user_controller"].get_user(user_id)
        if user:
            return jsonify(user), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


def main():
    if __name__ == "__main__":
        app.run(host=HOST, port=PORT)
main()