from fastapi import FastAPI
from app import database
from app.routes import customer

app = FastAPI()

app.include_router(customer.router)


@app.get("/health")
def health_check():
    return {
        "status": "Backend running"
    }