import json
import os
from services.embedder import generate_embedding

DATA_FILE = "data/indexed_chunks.json"

def index_chunks(product_id, chunks, source):
    indexed_data = []

    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            try:
                indexed_data = json.load(file)
            except json.JSONDecodeError:
                indexed_data = []

    for i, chunk in enumerate(chunks):
        indexed_data.append({
            "id": f"{product_id}_{i}",
            "product_id": int(product_id),
            "content": chunk["content"],
            "page": chunk["page"],
            "source": source,
            "embedding": generate_embedding(chunk["content"])
        })

    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(indexed_data, file, indent=2)

    return len(chunks)