from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: int
    name: str

    class Config:
        from_attributes = True


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str

    class Config:
        from_attributes = True


class ProductDetailResponse(ProductResponse):
    documents: list[DocumentResponse]