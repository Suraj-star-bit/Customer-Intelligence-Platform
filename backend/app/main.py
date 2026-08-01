from fastapi import FastAPI
from app import database
from app.routes import customer
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analytics

from app.database import Base, engine
from app.models import Customer

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(customer.router)
app.include_router(analytics.router)

@app.get("/")
def root():
    return {
        "message": "Customer Intelligence API is running"
    }

@app.get("/health")
def health_check():
    return {
        "status": "Backend running"
    }