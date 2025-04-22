"""schema file validates and serializes api data"""

from pydantic import BaseModel
from datetime  import datetime


class QueryRequest(BaseModel):
    question: str


class QueryResponse(BaseModel):
    answer: str


class QueryHistoryItem(BaseModel):
    id: str
    question: str
    answer: str
    created_at: datetime

    class Config:
        orm_mode = True
