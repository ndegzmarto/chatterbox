"""This file creates the api endpoints: the post handles queries and get retrieves them"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas import QueryRequest, QueryHistoryItem, QueryResponse
from app.models.query import QueryHistory
from app.deps import get_db
from dotenv import load_dotenv
from together import Together
import os

router = APIRouter()

load_dotenv()

client = Together(
    api_key = os.getenv('TOGETHER_API_KEY')
) 

# openapi key integration

@router.post("/query", response_model=QueryResponse)
def handle_query(request: QueryRequest, db: Session = Depends(get_db)):
    question = request.question.strip()

    if not question:
        raise HTTPException(status_code=400, detail="question not available")
    
    # llm integration 
    answer = client.chat.completions.create(
        model = "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
        messages = [
            {"role": "system", "content": "you are a helpful assistant"},
            {"role": "user", "content": question}
        ]

    )

    db_query = QueryHistory(question=question, answer=answer.choices[0].message.content)
    db.add(db_query)
    db.commit()
    db.refresh(db_query)
    return {"answer": answer.choices[0].message.content}

@router.get("/history", response_model=list[QueryHistoryItem])
def get_history(db: Session = Depends(get_db), limit: int = 100):
    return db.query(QueryHistory).order_by(QueryHistory.created_at.desc()).limit(limit).all()