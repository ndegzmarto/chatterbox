"""This file sets up FastAPI app & creates tables"""

from fastapi import FastAPI
from app.database import engine, Base, SessionLocal
from app.routes import query
from fastapi.middleware.cors import CORSMiddleware

# initialize
app = FastAPI()


# allow cors

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# create tables
Base.metadata.create_all(bind=engine)


# include routers
app.include_router(query.router, prefix="/api")



