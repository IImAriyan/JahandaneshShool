
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
from typing import Optional, Union, List
from models.user_model import UserModel
import uuid


class UserController:
    def __init__(self):
        # Allowed fields for safe updates
        self.allowed_fields = {
            "username", "password", "email", "phone_number", "USER_ROLE", "nationalCode", "address"
        }

    def _check_db(self, cursor, connection):
        # Ensure both cursor and connection are provided
        if cursor is None or connection is None:
            raise ValueError("Cursor and connection must be provided.")

    def user_exists(self, username: str, cursor=None, connection=None) -> bool:
        # Check if a user with the given username exists in the database
        self._check_db(cursor, connection)

        cursor.execute(
            "SELECT 1 FROM jahandanesh_users WHERE username = %s", (username,)
        )
        return cursor.fetchone() is not None

    def add_user(self, user: UserModel, cursor=None, connection=None) -> bool:
        # Add a new user to the database if not already exists
        self._check_db(cursor, connection)

        if self.user_exists(user.username, cursor=cursor, connection=connection):
            return False
        user.USER_ID = str(uuid.uuid4())


        cursor.execute(
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
        connection.commit()
        return True

    def get_user(self, USER_ID: str, cursor=None, connection=None) -> Optional[UserModel]:
        # Retrieve a user by USER_ID
        self._check_db(cursor, connection)

        cursor.execute(
            "SELECT * FROM jahandanesh_users WHERE USER_ID = %s", (USER_ID,)
        )
        result = cursor.fetchone()

        if result is None:
            return None

        return UserModel(
            ROW=result,
            USER_ID=result[0],
            username=result[1],
            password=result[2],
            email=result[3],
            phone_number=result[4],
            USER_ROLE=result[5],
            nationalCode=result[6],
            address=result[7]
        )

    def update_user(self, USER_ID: str, field: str, value, cursor=None, connection=None) -> bool:
        # Update a specific field of a user
        self._check_db(cursor, connection)

        if field not in self.allowed_fields:
            raise ValueError("Invalid field for update.")

        query = f"UPDATE jahandanesh_users SET {field} = %s WHERE USER_ID = %s"
        cursor.execute(query, (value, USER_ID))
        connection.commit()
        return True

    def delete_user(self, USER_ID: str, cursor=None, connection=None) -> bool:
        # Delete a user by USER_ID
        self._check_db(cursor, connection)

        cursor.execute("DELETE FROM jahandanesh_users WHERE USER_ID = %s", (USER_ID,))
        connection.commit()
        return True

    def get_all_users(self, cursor=None, connection=None) -> List[UserModel]:
        # Retrieve all users from the database
        self._check_db(cursor, connection)

        cursor.execute("SELECT * FROM jahandanesh_users")
        results = cursor.fetchall()

        users = []
        for row in results:
            users.append(UserModel(
                ROW=row,
                USER_ID=row[0],
                username=row[1],
                password=row[2],
                email=row[3],
                phone_number=row[4],
                USER_ROLE=row[5],
                nationalCode=row[6],
                address=row[7]
            ))
        return users
