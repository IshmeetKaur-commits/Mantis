import os
import requests

from fastapi import APIRouter, UploadFile, File, Form

from app.database import SessionLocal
from app.models import Document

router = APIRouter()

UPLOAD_DIR = "app/uploads"

@router.post("/upload")
async def upload_file(
    product_id: int = Form(...),
    file: UploadFile = File(...)
):
    filepath = os.path.join(UPLOAD_DIR, file.filename)

    with open(filepath, "wb") as buffer:
        buffer.write(await file.read())
        with open(filepath, "rb") as pdf_file:
    requests.post(
        "http://localhost:5001/api/index-manual",
        data={"product_id": product_id},
        files={"manual": pdf_file}
    )
        

    db = SessionLocal()

    document = Document(
        name=file.filename,
        product_id=product_id
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    return {
        "success": True,
        "document_id": document.id
    }
