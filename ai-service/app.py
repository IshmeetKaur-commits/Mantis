from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from services.pdf_extractor import extract_text_from_pdf
from services.chunker import chunk_text
from services.moss_indexer import index_chunks
from services.retriever import retrieve_chunks

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs("data", exist_ok=True)


@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Mantis MOSS Retrieval Service is running"
    })


@app.route("/api/index-manual", methods=["POST"])
def index_manual():
    product_id = request.form.get("product_id")
    file = request.files.get("manual")

    if not product_id or not file:
        return jsonify({
            "error": "product_id and manual PDF are required"
        }), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    pages = extract_text_from_pdf(file_path)
    chunks = chunk_text(pages)

    chunks_indexed = index_chunks(
        product_id=product_id,
        chunks=chunks,
        source=file.filename
    )

    return jsonify({
        "message": "Manual indexed successfully",
        "product_id": int(product_id),
        "pages_extracted": len(pages),
        "chunks_indexed": chunks_indexed
    })


@app.route("/api/retrieve", methods=["POST"])
def retrieve():
    data = request.get_json()

    product_id = data.get("product_id")
    query = data.get("query")

    if not product_id or not query:
        return jsonify({
            "error": "product_id and query are required"
        }), 400

    results = retrieve_chunks(product_id, query)

    return jsonify({
        "product_id": int(product_id),
        "query": query,
        "results": results
    })


if __name__ == "__main__":
    app.run(debug=True, port=5001)