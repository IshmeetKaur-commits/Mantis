from services.pdf_extractor import extract_text_from_pdf
from services.chunker import chunk_text
from services.moss_indexer import index_chunks

pdf_path = "uploads/activa_manual.pdf"

pages = extract_text_from_pdf(pdf_path)
print("Pages:", len(pages))

chunks = chunk_text(pages)
print("Chunks:", len(chunks))

count = index_chunks(
    product_id=1,
    chunks=chunks,
    source="activa_manual.pdf"
)

print("Indexed:", count)