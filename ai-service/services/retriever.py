import json
import numpy as np
from services.embedder import generate_embedding

DATA_FILE = "data/indexed_chunks.json"

def cosine_similarity(vec1, vec2):
    vec1 = np.array(vec1)
    vec2 = np.array(vec2)

    return np.dot(vec1, vec2) / (np.linalg.norm(vec1) * np.linalg.norm(vec2))

def retrieve_chunks(product_id, query, top_k=5):
    query_embedding = generate_embedding(query)

    with open(DATA_FILE, "r", encoding="utf-8") as file:
        chunks = json.load(file)

    results = []

    for chunk in chunks:
        if chunk["product_id"] == int(product_id):
            score = cosine_similarity(query_embedding, chunk["embedding"])

            results.append({
                "content": chunk["content"],
                "page": chunk["page"],
                "source": chunk["source"],
                "score": float(score)
            })

    results.sort(key=lambda x: x["score"], reverse=True)

    return results[:top_k]