from pydantic import BaseModel
from typing import List, Optional

# API Request structure
class ChatRequest(BaseModel):
    product_id: int
    session_id: str
    message: str

# API Response structure
class ChatResponse(BaseModel):
    reply: str
    stage: str  # "investigation" or "diagnosis"

# The state object stored in memory for tracking the session history
class SessionState(BaseModel):
    session_id: str
    product_id: int
    initial_problem: str = ""
    history: List[dict] = []  # List of {"role": "user"/"model", "text": "..."}
    question_count: int = 0