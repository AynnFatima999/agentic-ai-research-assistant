from backend.tools.web_search import WebSearchTool
from backend.tools.content_parser import ContentParser
from backend.services.llm_service import generate_response


class ResearchAgent:
    """
    Main AI agent responsible for performing research.
    """

    def __init__(self):
        self.search_tool = WebSearchTool()
        self.parser = ContentParser()

    def research(self, topic: str) -> dict:
        """
        Perform research on the given topic.
        """

        search_results = self.search_tool.search(topic)

        references = []
        collected_text = ""

        for result in search_results[:3]:
            url = result["url"]

            text = self.parser.extract_content(url)

            if text:
                collected_text += text + "\n\n"
                references.append(url)

        if not collected_text:
            return {
                "topic": topic,
                "summary": "No useful information found.",
                "key_points": [],
                "references": references,
            }

        prompt = f"""
You are an AI Research Assistant.

Research Topic:
{topic}

Based on the following information:

{collected_text}

Generate:

1. A short summary.
2. Five key points.

Respond in this format:

Summary:
...

Key Points:
- ...
- ...
"""

        response = generate_response(prompt)

        summary = response
        key_points = []

        if "Key Points:" in response:
            summary_part, points_part = response.split("Key Points:", 1)

            summary = summary_part.replace("Summary:", "").strip()

            key_points = [
                point.replace("-", "").strip()
                for point in points_part.split("\n")
                if point.strip().startswith("-")
            ]

        return {
            "topic": topic,
            "summary": summary,
            "key_points": key_points,
            "references": references,
        }