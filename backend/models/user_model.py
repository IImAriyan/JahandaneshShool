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

class UserModel:
    def __init__(self, ROW=None, USER_ID=None, username=None, password=None,
                 full_name=None, email=None, phone_number=None, USER_ROLE=None,
                 nationalCode=None, address=None, profile_picture_url=None,
                 created_at=None, updated_at=None, is_active=True,
                 last_login=None, gender=None, birthdate=None, grade=None,
                 parent_phone_number=None):
        self.ROW = ROW
        self.USER_ID = USER_ID
        self.username = username
        self.password = password
        self.full_name = full_name
        self.email = email
        self.phone_number = phone_number
        self.USER_ROLE = USER_ROLE
        self.nationalCode = nationalCode
        self.address = address
        self.profile_picture_url = profile_picture_url
        self.created_at = created_at
        self.updated_at = updated_at
        self.is_active = is_active
        self.last_login = last_login
        self.gender = gender
        self.birthdate = birthdate
        self.grade = grade
        self.parent_phone_number = parent_phone_number

    def to_dict(self, include_password=False):
        data = self.__dict__.copy()
        if not include_password:
            data.pop("password", None)
        return data
