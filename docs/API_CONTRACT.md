# Mantis API Contract

## Product Object

```json
{
  "id": 1,
  "name": "Honda Activa 6G",
  "description": "110cc scooter",
  "category": "Scooter",
  "image_url": "image.jpg"
}
```

---

## Get All Products

GET /products

Response:

```json
[
  {
    "id": 1,
    "name": "Honda Activa 6G",
    "description": "110cc scooter"
  }
]
```

---

## Get Product Details

GET /products/{id}

Response:

```json
{
  "id": 1,
  "name": "Honda Activa 6G",
  "description": "110cc scooter",
  "documents": [
    {
      "id": 5,
      "name": "service_manual.pdf"
    }
  ]
}
```

---

## Upload Document

POST /upload

Form Data:

product_id
file

Response:

```json
{
  "success": true,
  "document_id": 12
}
```

---

## Chat Endpoint

POST /chat

Request:

```json
{
  "product_id": 1,
  "session_id": "abc123",
  "message": "My scooter horn is not working"
}
```

Response (Investigation Stage):

```json
{
  "reply": "Is the headlight working normally?",
  "stage": "investigation"
}
```

Response (Diagnosis Stage):

```json
{
  "reply": "Based on your answers, the most probable cause is Fuse F3. Refer to page 22 of the service manual.",
  "stage": "diagnosis"
}
```
