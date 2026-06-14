from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)

    documents = relationship(
        "Document",
        back_populates="product"
    )


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

    product_id = Column(
        Integer,
        ForeignKey("products.id")
    )

    product = relationship(
        "Product",
        back_populates="documents"
    )