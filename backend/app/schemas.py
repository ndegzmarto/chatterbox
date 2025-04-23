"""schema file validates and serializes api data"""

from pydantic import BaseModel, ConfigDict
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

    model_config = ConfigDict(from_attributes=True)

