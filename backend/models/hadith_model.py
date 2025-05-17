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

class HadithModel:
    def __init__(self,row:str, said_by:str , content:str , created_in:str):
        self.row = row
        self.said_by = said_by
        self.content = content
        self.created_in = created_in
        
    def to_dict(self):
        return {
            "row": self.row,
            "said_by": self.said_by,
            "content": self.content,
            "created_in": self.created_in
        }