"""This file sets up FastAPI app & creates tables"""

from fastapi import FastAPI
from app.database import engine, Base, SessionLocal
from app.routes import query

# initialize
app = FastAPI()


# create tables
Base.metadata.create_all(bind=engine)


# include routers
app.include_router(query.router, prefix="/api")



