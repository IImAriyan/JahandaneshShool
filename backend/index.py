
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

from core.database import DB
from models.user_model import UserModel
from controllers.user_controller import UserController
from authentication.jwt import jwt

# ------------------ Testing ----------------- "
DB = DB()
(connection, cursor) = DB.connect()
user = UserModel(
    ROW=None,
    USER_ID = "1",
    username = "Reza",
    password =  "1368",
    email = "reza@gmail.com",
    phone_number = "0913453821",   
    USER_ROLE = "user",
    nationalCode = "142701294",
    address = "Tehran, Iran"
)
# # DB.add_user(user, cursor=cursor, connection=connection)

controller = UserController()
# controller.add_user(user, cursor=cursor, connection=connection)
print(jwt())