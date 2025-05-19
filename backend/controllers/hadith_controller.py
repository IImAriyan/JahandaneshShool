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

from models.hadith_model import HadithModel

class HadithController() :
    def __init__(self, cursor = None , connection = None):
        self.cursor = cursor
        self.connection = connection
        self.table_name = "weekly_hadiths"
        self.allowed_fields = {"row", "said_by", "content", "created_in"}

    def _check_db(self):
        if self.cursor is None or self.connection is None:
            raise ValueError("Cursor and connection must be provided.")
        
    def get_all_hadiths(self) -> list:
        self._check_db()
        with self.connection.cursor() as cursor:
            cursor.execute(f"SELECT * FROM {self.table_name}")
            rows = cursor.fetchall()
        return [HadithModel(*row).to_dict() for row in rows]


    def get_last_hadith(self) -> HadithModel:
        self._check_db()
        with self.connection.cursor() as cursor:
            cursor.execute(f"SELECT * FROM {self.table_name} ORDER BY row DESC LIMIT 1")
            row = cursor.fetchone()
        if row:
            return HadithModel(*row).to_dict()
        return None

    
    def add_hadith(self, hadith: HadithModel) -> bool:
        self._check_db()
        if not hadith.row or not hadith.said_by or not hadith.content or not hadith.created_in:
            return False
        
        self.cursor.execute(
            f"""
            INSERT INTO {self.table_name} (row, said_by, content, created_in)
            VALUES (%s, %s, %s, %s)
            """,
            (hadith.row, hadith.said_by, hadith.content, hadith.created_in)
        )
        self.connection.commit()
        return True

    