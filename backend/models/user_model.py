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

class UserModel:
    def __init__(self, ROW=None, USER_ID=None, username=None, password=None,
                 email=None, phone_number=None, USER_ROLE=None, nationalCode=None, address=None):
        self.ROW = ROW
        self.USER_ID = USER_ID
        self.username = username
        self.password = password
        self.email = email
        self.phone_number = phone_number
        self.USER_ROLE = USER_ROLE
        self.nationalCode = nationalCode
        self.address = address

        