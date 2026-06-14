# Mantis - MOSS Retrieval Service

## Setup

```bash
pip install -r requirements.txt
```

## Index Manual

Place PDF in:

```text
uploads/activa_manual.pdf
```

Run:

```bash
python test_index.py
```

## Test Retrieval

```bash
python test_retrieve.py
```

## Start Server

```bash
python app.py
```

Server:

```text
http://127.0.0.1:5001
```

## API

POST `/api/retrieve`

Request:

```json
{
  "product_id": 1,
  "query": "horn fuse problem"
}
```

Returns relevant manual chunks with page references.