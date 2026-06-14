import os
from fastapi import FastAPI, HTTPException
from models.diagnostic_state import ChatRequest, ChatResponse, SessionState
from services.gemini_service import ask_gemini

app = FastAPI(title="Mantis AI Diagnostic Engine")

SESSIONS = {}

# --- MOCK MOSS RETRIEVAL LAYER ---
# If your teammate finishes the real vector DB, swap this out with their API call!
def mock_moss_retrieve(product_id: int, user_message: str) -> str:
    """
    Simulates searching the Honda Activa 6G service manual based on keywords.
    """
    msg = user_message.lower()
    
    if "horn" in msg:
        return """
        [DOCUMENT SOURCE: Honda Activa 6G Service Manual - Section 12: Electrical Systems - Page 22]
        - Horn Troubleshooting Checklist:
          1. Verify battery voltage is above 12.4V. If low, headlights will dim when cranking.
          2. Inspect Fuse F3 (10A mini-fuse) located in the front cover utility box. If blown, replace immediately.
          3. Check horn grounding terminal connection at the frame for corrosion.
        """
    elif "start" in msg or "crank" in msg or "battery" in msg:
        return """
        [DOCUMENT SOURCE: Honda Activa 6G Service Manual - Section 3: Maintenance - Page 8]
        - Engine Fails to Start:
          1. Check if the side-stand indicator switch is clean and fully disengaged.
          2. Measure battery voltage across terminals. Should read 12.6V resting.
          3. Inspect spark plug cap connection for loose fit or moisture ingress.
        """
    
    # Default fallback context if no explicit keywords match
    return """
    [DOCUMENT SOURCE: Honda Activa 6G General Specifications - Page 2]
    - Standard Electrical System: 12V Maintenance-Free Battery.
    - Standard Maintenance: Inspect fuses, wiring harnesses, and grounding points during routine physical inspection.
    """

def load_prompt(filename: str) -> str:
    path = os.path.join("prompts", filename)
    if os.path.exists(path):
        with open(path, "r") as f:
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
    
    # 1. Fetch relevant manual snippets using our retrieval layer
    # We query using the initial problem or the latest message to find technical context
    manual_context = mock_moss_retrieve(state.product_id, state.initial_problem)
    
    system_rules = load_prompt("system_prompt.txt")
    
    formatted_history = ""
    for turn in state.history:
        prefix = "User Symptom: " if turn["role"] == "user" else "Technician: "
        formatted_history += f"{prefix}{turn['text']}\n"
    
    # 2. Append the extracted manual context directly into Gemini's active prompt block
    if state.question_count < 3:
        stage = "investigation"
        investigation_rules = load_prompt("investigation_prompt.txt")
        
        full_prompt = f"""
        {system_rules}
        
        {investigation_rules}
        
        --- VERIFIED MANUAL MANUAL DOCUMENTATION CONTEXT ---
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
        
        --- VERIFIED MANUAL MANUAL DOCUMENTATION CONTEXT ---
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