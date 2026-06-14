from fastapi import APIRouter
from app.database import SessionLocal
from app.models import Product

router = APIRouter()

@router.get("/products")
def get_products():
    db = SessionLocal()
    return db.query(Product).all()

@router.get("/products/{id}")
def get_product(id: int):
    db = SessionLocal()
    return db.query(Product).filter(Product.id == id).first()