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

import environment as env
import jwt
from datetime import datetime, timedelta
from flask import request, jsonify
from functools import wraps


class authentication:
    """
    Authentication class for handling JWT tokens.
    """

    def __init__(self):
        self.secret_key = env.JWT["SECRET_KEY"]
        self.algorithm = env.JWT["ALGORITHM"]
        self.access_token_expire_minutes = env.JWT["ACCESS_TOKEN_EXPIRE_MINUTES"]

    def create_token(self, user_id):
        """
        Create a JWT token for the given user ID.
        """
        expiration = datetime.utcnow() + timedelta(minutes=self.access_token_expire_minutes)
        schema = {
            "iss": "Jahan Danesh School",
            "sub": "Authentication",
            "userID": user_id,
            "exp": expiration
        }
        token = jwt.encode(schema, self.secret_key, algorithm=self.algorithm)
        return token

    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    def verify_token(self, token):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None

    def token_required(self):
        """
        Decorator to protect routes with JWT authentication.
        """
        def decorator(f):
            @wraps(f)
            def decorated(*args, **kwargs):
                token = None
                if 'Authorization' in request.headers:
                    auth_header = request.headers['Authorization']
                    if auth_header.startswith("Bearer "):
                        token = auth_header.split(" ")[1]

                if not token:
                    return jsonify({'message': 'Token is missing!'}), 401

                data = self.verify_token(token)
                if not data:
                    return jsonify({'message': 'Token is invalid or expired!'}), 401

                return f(*args, **kwargs, current_user_id=data["userID"])
            return decorated
        return decorator
