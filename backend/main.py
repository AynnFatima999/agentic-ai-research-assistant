from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from slowapi.extension import _rate_limit_exceeded_handler

from backend.config import settings
from backend.routes.research import router as research_router
from backend.core.limiter import limiter


app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0"
)


app.state.limiter = limiter

app.add_exception_handler(
    RateLimitExceeded,
    _rate_limit_exceeded_handler
)


app.add_middleware(
    SlowAPIMiddleware
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
@limiter.limit("30/minute")
async def root(request: Request):
    return {
        "message": "Agentic AI Research Assistant API is running!"
    }