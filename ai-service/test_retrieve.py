from services.retriever import retrieve_chunks

results = retrieve_chunks(
    product_id=1,
    query="horn fuse problem"
)

print("\nRESULTS FOUND:", len(results))

for i, r in enumerate(results, start=1):
    print("\n====================")
    print("Result", i)
    print("Page:", r["page"])
    print("Score:", round(r["score"], 4))
    print("Source:", r["source"])
    print("Content:")
    print(r["content"][:500])
