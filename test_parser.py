from backend.tools.content_parser import ContentParser


parser = ContentParser()

content = parser.extract_content(
    "https://fastapi.tiangolo.com/"
)

print(content[:1000])