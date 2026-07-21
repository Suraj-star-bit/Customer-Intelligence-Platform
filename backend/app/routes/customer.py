from fastapi import APIRouter
from sqlalchemy import text
from app.database import engine

router = APIRouter()


@router.get("/customers")
def get_customers():

    with engine.connect() as connection:
        result = connection.execute(text("SELECT * FROM customers LIMIT 50"))

        customers = []

        for row in result:
            customers.append(dict(row._mapping))

        return customers