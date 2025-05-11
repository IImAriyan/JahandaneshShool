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
import config
import jwt
from datetime import datetime, timedelta


class authentication:
    """
    Authentication class for handling JWT tokens.
    """

    def __init__(self):
        self.secret_key = config.JWT["SECRET_KEY"]
        self.algorithm = config.JWT["ALGORITHM"]
        self.access_token_expire_minutes = config.JWT["ACCESS_TOKEN_EXPIRE_MINUTES"]


    def create_token(self, user_id):
        """
        Create a JWT token for the given user ID.
        """
        # Set the expiration time for the token
        expiration = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
        schema = {
            "iss": "Jahan Danesh School",
            "sub": "Authentication",
            "alg": self.algorithm,
            "userID": None,
            "typ": "JWT"
        }
        token = jwt.encode(schema, self.secret_key, algorithm=self.algorithm)
        return token
    def decode_token(self, token):
        """ 
        Decode the JWT token and return the payload.
        """

        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    def verify_token(self, token):
        """
        Verify the JWT token and return the payload.
        """
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None