from dotenv import load_dotenv
import os

load_dotenv()


class Settings:
    APP_NAME = "Agentic AI Research Assistant"

    OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

    FASTAPI_HOST = os.getenv("FASTAPI_HOST", "127.0.0.1")
    FASTAPI_PORT = int(os.getenv("FASTAPI_PORT", 8000))


settings = Settings()