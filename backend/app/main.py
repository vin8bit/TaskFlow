from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError

from app.api.user import router as user_router
from app.api.task import router as task_router
from app.core.exceptions import validation_exception_handler
from app.db.init_db import init_db
from app.db.session import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_db()


app.add_exception_handler(RequestValidationError, validation_exception_handler)

app.include_router(user_router)
app.include_router(task_router)


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
    
@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "Backend is healthy"
    }