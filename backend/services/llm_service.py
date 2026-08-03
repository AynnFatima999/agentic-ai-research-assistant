import os
import logging

from openai import OpenAI
from dotenv import load_dotenv


load_dotenv("backend/.env")

logger = logging.getLogger(__name__)


api_key = os.getenv("OPENROUTER_API_KEY")


client = OpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1",
)


def generate_response(prompt: str) -> str:
    """
    Generate response using OpenRouter LLM.
    """

    if not prompt or not prompt.strip():
        logger.warning("Empty prompt received.")
        return ""

    if not api_key:
        logger.error("OPENROUTER_API_KEY is missing.")
        return ""

    try:
        response = client.chat.completions.create(
            model="deepseek/deepseek-chat-v3.1",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )

        content = response.choices[0].message.content

        if not content:
            logger.warning("LLM returned empty response.")
            return ""

        return content

    except Exception as e:
        logger.exception(f"LLM generation failed: {e}")
        return ""