from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from app.api.main import api_router
from app.core.exceptions import validation_exception_handler
from app.db.session import engine

app = FastAPI()

app.add_exception_handler(RequestValidationError, validation_exception_handler)

app.include_router(api_router)


@app.get("/")
def root():
    return {"message": "API is running successfully 🚀"}


@app.get("/test-db")
def test_db():
    try:
        connection = engine.connect()
        connection.close()
        return {"message": "Database connected successfully ✅"}
    except Exception as e:
        return {"error": str(e)}
    
