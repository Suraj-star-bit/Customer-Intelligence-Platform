from fastapi import FastAPI
from app import database
from app.routes import customer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(customer.router)


@app.get("/health")
def health_check():
    return {
        "status": "Backend running"
    }