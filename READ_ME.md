# Mantis AI

### Intelligent Automated Diagnostic Engine for Two-Wheeler Troubleshooting

An advanced AI-powered diagnostic assistant designed to streamline automotive troubleshooting. By combining Large Language Models (LLMs) with automated service manual semantic routing, Mantis AI guides technicians through a structured 3-stage investigation process to isolate mechanical faults, improve diagnostic accuracy, and reduce repair turnaround time.

---

## 👥 Team Details

### Team Name

**Cyber Ciphers**

### Team Members

| Name                | Role        |
| ------------------- | ----------- |
| **Ishmeet Kaur**    | Team Leader |
| **Cherrish Kansal** | Team Member |
| **MONA**            | Team Member |
| **Ginisha Miglani** | Team Member |

---

## 🚀 Project Overview

Modern automotive troubleshooting often relies on large, complex service manuals, leading to diagnostic delays and increased chances of human error.

**Mantis AI** acts as an intelligent diagnostic partner that:

* Collects and tracks vehicle symptoms
* Consults relevant technical documentation
* Conducts a structured investigation through targeted questions
* Generates a source-backed diagnosis with manual references

Unlike a generic chatbot, Mantis AI operates using a controlled diagnostic workflow that ensures consistency, traceability, and explainability.

---

## ✨ Key Architectural Highlights

### State-Driven Investigation Loop

A custom state machine tracks:

* Session history
* Investigation stage
* Number of questions asked
* Diagnostic progress

### MOSS (Manual-Oriented Semantic Search)

A context-aware retrieval mechanism that dynamically scans service manuals and technical documents based on user-reported symptoms.

Current source integrated:

* Honda Activa 6G Service Manual
* Honda Activa 6G Service Specifications

### Asynchronous Microservice Architecture

The system is separated into independent services:

* Frontend UI
* Backend API Gateway
* AI Inference Service

This separation improves scalability, maintainability, and deployment flexibility.

---

## 🏗️ System Architecture

```text
┌─────────────────────┐
│     Frontend UI     │
│ React + Tailwind    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Backend Gateway     │
│ FastAPI (Port 8000) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ AI Service          │
│ FastAPI (Port 8001) │
│ Gemini 2.5 Flash    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Service Manuals     │
│ Honda Activa 6G     │
└─────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend

* React.js (Vite)
* Tailwind CSS

### Backend Gateway (Port 8000)

* FastAPI
* Python
* CORS Middleware

### AI Inference Service (Port 8001)

* Google Gemini 2.5 Flash
* Google GenAI SDK
* Pydantic
* Uvicorn

---

## ✨ Features

### Session State Tracking

Maintains isolated multi-turn conversations using in-memory session management through the `SessionState` object.

### Strong Schema Validation

Uses Pydantic models to validate all API requests and responses.

### Source-Based Explanations

Every diagnosis includes:

* Service manual reference
* Page number
* Section title
* Verification instructions

### Dynamic Prompt Construction

User responses are injected into the active diagnostic context to refine future investigation steps.

### Controlled Diagnostic Workflow

The AI is restricted to a structured investigation process and transitions to diagnosis only after sufficient information has been collected.

---

## 📂 Data Schemas

```python
from pydantic import BaseModel
from typing import List

class ChatRequest(BaseModel):
    product_id: int
    session_id: str
    message: str


class ChatResponse(BaseModel):
    reply: str
    stage: str  # investigation | diagnosis


class SessionState:
    session_id: str
    product_id: int
    initial_problem: str
    history: List[dict]
    question_count: int
```

---

## ⚙️ Setup & Installation

### 1. Clone Repository

```bash
git clone https://github.com/<your-username>/Mantis-main.git
cd Mantis-main
```

### 2. Configure Environment Variables

Create a `.env` file inside the `ai-service` directory.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### 3. Start AI Service (Port 8001)

```bash
cd ai-service

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app:app --reload --port 8001
```

### 4. Start Backend Gateway (Port 8000)

```bash
cd ../backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload --port 8000
```

### 5. Start Frontend (Port 5173)

```bash
cd ../frontend

npm install

npm run dev
```

---

## 📖 Usage Guide

### Step 1 – Open the Application

Navigate to:

```text
http://localhost:5173
```

### Step 2 – Enter a Vehicle Symptom

Example:

```text
The horn is working intermittently or failing entirely.
```

### Step 3 – Investigation Phase

The AI enters Investigation Mode and asks targeted diagnostic questions based on information retrieved from the service manual.

Example:

```text
Have you checked the battery voltage and fuse condition?
```

### Step 4 – Diagnosis Phase

After completing three investigation rounds, the system automatically transitions into Diagnosis Mode.

The final response includes:

* Probable root cause
* Recommended checks
* Service manual references
* Section citations
* Repair recommendations

---

## 🔍 API Documentation

FastAPI automatically generates OpenAPI documentation.

### AI Service Swagger UI

```text
http://localhost:8001/docs
```

### Backend Gateway Swagger UI

```text
http://localhost:8000/docs
```

---

## 🤝 Contributors

This project was collaboratively developed by **Team Cyber Ciphers** as part of a hackathon initiative focused on applying Artificial Intelligence to real-world automotive diagnostics.

### Contributions

* **Ishmeet Kaur (Team Leader)** – Project architecture, AI workflow design, backend integration, documentation, project coordination, and deployment.
* **Cherrish Kansal** – Frontend development, user interface implementation, and usability improvements.
* **MONA** – Research, testing, validation, and documentation support.
* **Ginisha Miglani** – System integration, debugging, and quality assurance.

---

## 🎯 Future Enhancements

* OCR-based service manual ingestion
* Multi-vehicle support
* Voice-assisted diagnostics
* Computer Vision-based component inspection
* Predictive maintenance recommendations
* Workshop analytics dashboard
* Fine-tuned domain-specific diagnostic models

---

## 📜 License

This project was developed as part of a hackathon and educational innovation initiative. It is intended for academic, research, and demonstration purposes.
