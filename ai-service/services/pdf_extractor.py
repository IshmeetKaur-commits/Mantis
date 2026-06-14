import fitz

def extract_text_from_pdf(pdf_path):
    pages = []

    doc = fitz.open(pdf_path)

    for page_number, page in enumerate(doc, start=1):
        text = page.get_text()

        if text.strip():
            pages.append({
                "page": page_number,
                "text": text
            })

    return pages