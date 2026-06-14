from app.database import SessionLocal
from app.models import Product

db = SessionLocal()

product = Product(
    name="Honda Activa 6G",
    description="110cc scooter"
)

db.add(product)
db.commit()

print("Done")