from fastapi import FastAPI

from app.database import Base, engine
from app import models

from app.routers.products import router as product_router
from app.routers.upload import router as upload_router
from app.routers.chat import router as chat_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Mantis Backend")

app.include_router(product_router)
app.include_router(upload_router)
app.include_router(chat_router)

@app.get("/")
def root():
    return {"message": "Mantis API Running"}