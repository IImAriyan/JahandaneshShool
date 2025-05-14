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
import uuid
import bcrypt
from typing import Optional, List
from datetime import datetime
from authentication.jwt import authentication
from models.user_model import UserModel


class UserController:
    def __init__(self, cursor=None, connection=None):
        self.cursor = cursor
        self.connection = connection
        self.allowed_fields = {
            "username", "password", "full_name", "email", "phone_number", "USER_ROLE",
            "nationalCode", "address", "profile_picture_url", "is_active", "last_login",
            "gender", "birthdate", "grade", "parent_phone_number"
        }

    def _check_db(self):
        if self.cursor is None or self.connection is None:
            raise ValueError("Cursor and connection must be provided.")

    def user_exists(self, username: str) -> bool:
        self._check_db()
        self.cursor.execute("SELECT 1 FROM jahandanesh_users WHERE username = %s", (username,))
        return self.cursor.fetchone() is not None

    def add_user(self, user: UserModel) -> bool:
        self._check_db()

        if self.user_exists(user.username):
            return False

        user.USER_ID = str(uuid.uuid4())
        hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        now = datetime.utcnow()

        self.cursor.execute(
            """
            INSERT INTO jahandanesh_users 
            (USER_ID, username, password, full_name, email, phone_number, USER_ROLE, 
             nationalCode, address, profile_picture_url, created_at, updated_at, 
             is_active, last_login, gender, birthdate, grade, parent_phone_number)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                user.USER_ID,
                user.username,
                hashed_password,
                user.full_name,
                user.email,
                user.phone_number,
                user.USER_ROLE,
                user.nationalCode,
                user.address,
                user.profile_picture_url,
                now,  # created_at
                now,  # updated_at
                user.is_active,
                user.last_login,
                user.gender,
                user.birthdate,
                user.grade,
                user.parent_phone_number
            ),
        )
        self.connection.commit()
        return True

    def get_user(self, USER_ID: str) -> Optional[dict]:
        self._check_db()

        self.cursor.execute("SELECT * FROM jahandanesh_users WHERE USER_ID = %s", (USER_ID,))
        result = self.cursor.fetchone()

        if result is None:
            return None

        user = UserModel(*result)
        return user.to_dict(include_password=False)

    def update_user(self, USER_ID: str, newUser: UserModel) -> bool:
        self._check_db()

        update_fields = []
        update_values = []

        for field in self.allowed_fields:
            value = getattr(newUser, field, None)
            if value is not None:
                if field == "password":
                    value = bcrypt.hashpw(value.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
                update_fields.append(f"{field} = %s")
                update_values.append(value)

        # Always update updated_at
        update_fields.append("updated_at = %s")
        update_values.append(datetime.utcnow())

        update_values.append(USER_ID)

        query = f"""
            UPDATE jahandanesh_users
            SET {', '.join(update_fields)}
            WHERE USER_ID = %s
        """

        self.cursor.execute(query, tuple(update_values))
        self.connection.commit()
        return True

    def delete_user(self, USER_ID: str) -> bool:
        self._check_db()
        self.cursor.execute("DELETE FROM jahandanesh_users WHERE USER_ID = %s", (USER_ID,))
        self.connection.commit()
        return True

    def get_all_users(self) -> List[dict]:
        self._check_db()
        self.cursor.execute("SELECT * FROM jahandanesh_users")
        results = self.cursor.fetchall()

        users = [UserModel(*result).to_dict(include_password=False) for result in results]
        return users

    def login(self, username: str, password: str):
        self._check_db()

        self.cursor.execute(
            "SELECT USER_ID, username, password FROM jahandanesh_users WHERE username = %s",
            (username,)
        )
        result = self.cursor.fetchone()

        if result is None:
            return {"text": "نام کاربری یا رمز اشتباه است"}, 400

        user_id, db_username, db_pass = result

        if not bcrypt.checkpw(password.encode('utf-8'), db_pass.encode('utf-8')):
            return {"text": "نام کاربری یا رمز اشتباه است"}, 400

        auth = authentication()
        token = auth.create_token(user_id)

        # آپدیت last_login
        self.cursor.execute(
            "UPDATE jahandanesh_users SET last_login = %s WHERE USER_ID = %s",
            (datetime.utcnow(), user_id)
        )
        self.connection.commit()

        return {"text": "ورود با موفقیت انجام شد", "token": token}, 200
