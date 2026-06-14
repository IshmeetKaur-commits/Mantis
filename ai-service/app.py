import os
import httpx  # Make sure to run 'pip install httpx' if you don't have it
from fastapi import FastAPI, HTTPException
from models.diagnostic_state import ChatRequest, ChatResponse, SessionState
from services.gemini_service import ask_gemini

app = FastAPI(title="Mantis AI Diagnostic Engine")

SESSIONS = {}

# --- LIVE MOSS RETRIEVAL LAYER ---
# Replaced the old mock function with your teammate's live production database!
async def live_moss_retrieve(product_id: int, user_message: str) -> str:
    """
    Queries the live MOSS vector search database on port 5001 for matching manual segments.
    """
    url = "http://localhost:5001/api/retrieve"
    payload = {
        "product_id": product_id,
        "query": user_message
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, timeout=5.0)
            
            if response.status_code == 200:
                data = response.json()
                results = data.get("results", [])
                
                if not results:
                    return "No matching manual documentation found for this specific symptom configuration."
                
                # Format the top matching manual fragments for Gemini's prompt background
                context_str = ""
                for doc in results:
                    context_str += f"\n[DOCUMENT SOURCE: {doc.get('source')} - Page {doc.get('page')}]\n"
                    context_str += f"{doc.get('content')}\n"
                return context_str
                
            else:
                print(f"MOSS Server returned error code: {response.status_code}")
                return "Warning: Technical manual link database is temporarily unresponsive."
                
    except Exception as e:
        print(f"Failed to connect to MOSS server: {str(e)}")
        return "Warning: Connection to technical manual documentation layer failed."

def load_prompt(filename: str) -> str:
    path = os.path.join("prompts", filename)
    if os.path.exists(path):
        with open(path, f"r") as f:
            return f.read()
    return ""

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if request.session_id not in SESSIONS:
        SESSIONS[request.session_id] = SessionState(
            session_id=request.session_id,
            product_id=request.product_id,
            initial_problem=request.message
        )
    
    state = SESSIONS[request.session_id]
    state.history.append({"role": "user", "text": request.message})
    
    # --- HIT THE LIVE DB ENGINE ---
    # Fetching real verified database snippets instead of static keywords!
    manual_context = await live_moss_retrieve(state.product_id, state.initial_problem)
    
    system_rules = load_prompt("system_prompt.txt")
    
    formatted_history = ""
    for turn in state.history:
        prefix = "User Symptom: " if turn["role"] == "user" else "Technician: "
        formatted_history += f"{prefix}{turn['text']}\n"
    
    if state.question_count < 3:
        stage = "investigation"
        investigation_rules = load_prompt("investigation_prompt.txt")
        
        full_prompt = f"""
        {system_rules}
        
        {investigation_rules}
        
        --- VERIFIED MANUAL DOCUMENTATION CONTEXT ---
        {manual_context}
        
        --- CURRENT TRANSACTION STATE ---
        Target Product ID: {state.product_id}
        Original Issue Logged: {state.initial_problem}
        
        --- DIAGNOSTIC CHAT LOG ---
        {formatted_history}
        
        Remember: Ask exactly ONE highly strategic technical question based on the documentation context to isolate the problem.
        """
        state.question_count += 1
    else:
        stage = "diagnosis"
        diagnosis_rules = load_prompt("diagnosis_prompt.txt")
        
        full_prompt = f"""
        {system_rules}
        
        {diagnosis_rules}
        
        --- VERIFIED MANUAL DOCUMENTATION CONTEXT ---
        {manual_context}
        
        --- FINAL DATA COLLECTION ---
        Target Product ID: {state.product_id}
        Original Issue Logged: {state.initial_problem}
        
        --- COMPLETE CHAT HISTORY ---
        {formatted_history}
        
        Provide the final diagnostic summary. You MUST explicitly reference the exact Document Source, Section, and Page numbers provided in the context blocks above.
        """
    
    try:
        ai_reply = ask_gemini(full_prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini Processing Failure: {str(e)}")
        
    state.history.append({"role": "model", "text": ai_reply})
    
    return ChatResponse(reply=ai_reply, stage=stage)
