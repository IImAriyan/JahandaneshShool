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

# import libraries
import mysql.connector
import uuid
from models.user_model import UserModel

class DB :
    def __init__(self):
        # ---- VARIABLES ----
        self.HOST = "localhost"
        self.USER = "root"
        self.PASS = ""
        self.DATABASE = "jahandanesh_school"
    def connect(self) :

        # CONNECTION 
        self.connection = mysql.connector.connect(
            host=self.HOST,
            user=self.USER,
            password=self.PASS,
            database=self.DATABASE
        )
        return (self.connection, self.connection.cursor())
    
    def close(self) :
        # CLOSE CONNECTION
        self.connection.close()

