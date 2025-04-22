"""this file provides a db session dependancy"""
from app.database import SessionLocal

# Dependancy
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
