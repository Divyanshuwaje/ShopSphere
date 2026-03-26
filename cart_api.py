
from fastapi import APIRouter
from pydantic import BaseModel, Field
from typing import List
from threading import Lock

router = APIRouter()

# Temporary cart storage (in-memory)
cart_data = {}
cart_lock = Lock()  # Thread safety

class CartItem(BaseModel):
    email: str
    product_name: str
    price: float = Field(..., gt=0, description="Price must be greater than 0")

# API to add product to cart
@router.post("/cart/add")
def add_to_cart(item: CartItem):
    with cart_lock:  # Prevent race conditions
        if item.email not in cart_data:
            cart_data[item.email] = []

        cart_data[item.email].append({
            "product_name": item.product_name,
            "price": item.price
        })

    return {"status": "success", "message": "Product added to cart"}

# API to view cart
@router.get("/cart/{email}")
def view_cart(email: str):
    with cart_lock:
        return {"cart": cart_data.get(email, [])}

# API to clear cart
@router.delete("/cart/{email}")
def clear_cart(email: str):
    with cart_lock:
        if email in cart_data:
            cart_data[email] = []
            return {"status": "success", "message": "Cart cleared"}
        return {"status": "error", "message": "Cart not found"}
