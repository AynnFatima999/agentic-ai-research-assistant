from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import settings
from backend.routes.research import router as research_router

app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(research_router)


@app.get("/")
async def root():
    return {
        "message": "Agentic AI Research Assistant API is running!"
    }