from typing import Optional, List
from models.user_model import UserModel
import uuid


class UserController:
    def __init__(self, cursor=None, connection=None):
        self.cursor = cursor
        self.connection = connection
        self.allowed_fields = {
            "username", "password", "email", "phone_number", "USER_ROLE", "nationalCode", "address"
        }

    def _check_db(self):
        if self.cursor is None or self.connection is None:
            raise ValueError("Cursor and connection must be provided.")

    def user_exists(self, username: str) -> bool:
        self._check_db()

        self.cursor.execute(
            "SELECT 1 FROM jahandanesh_users WHERE username = %s", (username,)
        )
        return self.cursor.fetchone() is not None

    def add_user(self, user: UserModel) -> bool:
        self._check_db()

        if self.user_exists(user.username):
            return False

        user.USER_ID = str(uuid.uuid4())

        self.cursor.execute(
            """
            INSERT INTO jahandanesh_users 
            (USER_ID, username, password, email, phone_number, USER_ROLE, nationalCode, address) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                user.USER_ID,
                user.username,
                user.password,
                user.email,
                user.phone_number,
                user.USER_ROLE,
                user.nationalCode,
                user.address,
            ),
        )
        self.connection.commit()
        return True

    def get_user(self, USER_ID: str) -> Optional[UserModel]:
        self._check_db()

        self.cursor.execute(
            "SELECT * FROM jahandanesh_users WHERE USER_ID = %s", (USER_ID,)
        )
        result = self.cursor.fetchone()

        if result is None:
            return None

        return{
            "USER_ID": result[1],
            "username": result[2],
            "password": result[3],
            "email": result[4],
            "phone_number": result[5],
            "USER_ROLE": result[6],
            "nationalCode": result[7],
            "address": result[8],
        }

    def update_user(self, USER_ID: str, field: str, value) -> bool:
        self._check_db()

        if field not in self.allowed_fields:
            raise ValueError("Invalid field for update.")

        query = f"UPDATE jahandanesh_users SET {field} = %s WHERE USER_ID = %s"
        self.cursor.execute(query, (value, USER_ID))
        self.connection.commit()
        return True

    def delete_user(self, USER_ID: str) -> bool:
        self._check_db()

        self.cursor.execute("DELETE FROM jahandanesh_users WHERE USER_ID = %s", (USER_ID,))
        self.connection.commit()
        return True

    def get_all_users(self) :
        self._check_db()

        self.cursor.execute("SELECT * FROM jahandanesh_users")
        results = self.cursor.fetchall()

        users = []
        for result in results:
            users.append(
                {
                    "ROW": result[0],
                    "USER_ID": result[1],
                    "username": result[2],
                    "password": result[3],
                    "email": result[4],
                    "phone_number": result[5],
                    "USER_ROLE": result[6],
                    "nationalCode": result[7],
                    "address": result[8]
                }
            )

        return users
