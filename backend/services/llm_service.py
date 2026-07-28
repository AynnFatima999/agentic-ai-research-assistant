import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv("backend/.env")

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


def generate_response(prompt: str) -> str:
    response = client.chat.completions.create(
        model="deepseek/deepseek-chat-v3.1",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return response.choices[0].message.content