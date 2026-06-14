def chunk_text(pages, chunk_size=800, overlap=150):
    chunks = []

    for page in pages:
        text = page["text"]
        page_number = page["page"]

        start = 0
        while start < len(text):
            end = start + chunk_size
            chunk = text[start:end]

            chunks.append({
                "page": page_number,
                "content": chunk
            })

            start += chunk_size - overlap

    return chunks