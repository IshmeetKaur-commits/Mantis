from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    product_id: int
    session_id: str
    message: str

@router.post("/chat")
def chat(request: ChatRequest):
    return {
        "reply": "Is the headlight working normally?",
        "stage": "investigation"
    }