"""
This model stores the queries from the user and 
responses from the LLM

"""

from sqlalchemy import Column, String, DateTime
from datetime import datetime
from app.database import Base
import uuid
from datetime import datetime, timezone
from zoneinfo import ZoneInfo


class QueryHistory(Base):
  
  """model attributes"""

  __tablename__ = "query_history"

  id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
  question = Column(String, nullable=False)
  answer = Column(String, nullable=False)
  created_at = Column(DateTime, default=datetime.now(ZoneInfo("Africa/Nairobi")))

