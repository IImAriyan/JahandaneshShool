from flask import Flask
from flask_cors import CORS
from core.database import DB
from controllers.user_controller import UserController
from controllers.hadith_controller import HadithController
from authentication.jwt import authentication

from routes.user_routes import user_bp
from routes.hadith_routes import hadith_bp

HOST = "0.0.0.0"
PORT = 5000

db_instance = DB()
connection, cursor = db_instance.connect()

app = Flask(__name__)
CORS(app=app, resources={r"/*": {"origins": "https://jahandanesh.com"}})

controllers = {
    "user_controller": UserController(connection=connection, cursor=cursor),
    "hadith_controller": HadithController(connection=connection, cursor=cursor)
}

auth = authentication()

app.controllers = controllers
app.auth = auth

app.register_blueprint(user_bp)
app.register_blueprint(hadith_bp)


@app.after_request
def refresh_db_and_controllers(response):
    global db_instance, connection, cursor

    if response.status_code == 200:
        try:
            cursor.close()
            connection.close()
        except Exception:
            pass

        db_instance = DB()
        connection, cursor = db_instance.connect()

        app.controllers = {
            "user_controller": UserController(connection=connection, cursor=cursor),
            "hadith_controller": HadithController(connection=connection, cursor=cursor)
        }
        app.auth = authentication()

    return response


def main():
    if __name__ == "__main__":
        app.run(host=HOST, port=PORT)

main()
