from fastapi import APIRouter, Query
from elasticsearch import Elasticsearch, exceptions

router = APIRouter()

# Elasticsearch connection with timeout and error handling
try:
    es = Elasticsearch(
        ["http://localhost:9200"],
        request_timeout=10  # seconds
    )
    if not es.ping():
        raise ConnectionError("Elasticsearch is not reachable.")
except Exception as e:
    raise RuntimeError(f"Failed to connect to Elasticsearch: {e}")

@router.get("/products/filter")
def filter_products(category: str = Query(..., description="Product category")):
    try:
        query = {
            "match": {
                "category": category
            }
        }

        # Use query= for ES 8.x compatibility
        response = es.search(index="products", query=query)

        hits = response.get("hits", {}).get("hits", [])
        products = [item["_source"] for item in hits]

        return {
            "status": "success",
            "count": len(products),
            "products": products
        }

    except exceptions.ConnectionError:
        return {
            "status": "error",
            "message": "Failed to connect to Elasticsearch."
        }
    except exceptions.NotFoundError:
        return {
            "status": "error",
            "message": "Index 'products' not found."
        }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
