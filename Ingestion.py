from elasticsearch import Elasticsearch

def main():
    # Connect to Elasticsearch (UPDATED)
    es = Elasticsearch(
        "https://localhost:9200",
        basic_auth=("elastic", "pJoWREUtv=ZIC*GXUcbE"),
        verify_certs=False
    )

    # Check connection
    if not es.ping():
        print("❌ Cannot connect to Elasticsearch")
        return
    print("✅ Connected to Elasticsearch")

    # Dummy product data
    products = [
        {"id": 1, "name": "Laptop", "price": 50000, "category": "Electronics"},
        {"id": 2, "name": "Phone", "price": 30000, "category": "Electronics"},
        {"id": 3, "name": "Shoes", "price": 2000, "category": "Fashion"},
        {"id": 4, "name": "Watch", "price": 5000, "category": "Accessories"},
        {"id": 5, "name": "Headphones", "price": 1500, "category": "Electronics"}
    ]

    # Index name
    index_name = "products"

    # Create index (optional)
    if not es.indices.exists(index=index_name):
        es.indices.create(index=index_name)
        print(f"📦 Index '{index_name}' created")

    # Insert products
    for product in products:
        es.index(
            index=index_name,
            id=product["id"],
            document=product
        )
        print(f"✔ Inserted: {product['name']}")

    print("\n🎉 All products indexed successfully!")

if __name__ == "__main__":
    main()