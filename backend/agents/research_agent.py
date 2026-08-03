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

    def research(
        self,
        topic: str,
        summary_length: str = "medium",
        progress_callback=None
    ) -> dict:
        """
        Perform research on the given topic.
        """

        if progress_callback:
            progress_callback(10, "Searching web...")

        search_results = self.search_tool.search(topic)

        if progress_callback:
            progress_callback(
                30,
                f"Found {len(search_results)} sources."
            )

        references = []
        collected_text = ""

        # Check more sources but keep only top 3 valid references
        for result in search_results[:5]:

            if progress_callback:
                progress_callback(
                    50,
                    f"Reading: {result['title']}"
                )

            url = result["url"]

            text = self.parser.extract_content(url)

            if text:
                collected_text += text + "\n\n"

                references.append(
                    {
                        "title": result["title"],
                        "url": url
                    }
                )

            if len(references) == 3:
                break

        if not collected_text:
            if progress_callback:
                progress_callback(
                    100,
                    "No useful information found."
                )

            return {
                "topic": topic,
                "summary": "No useful information found.",
                "key_points": [],
                "references": references,
            }

        length_instruction = {
            "short": "Generate a brief summary in 3-4 sentences.",
            "medium": "Generate a balanced summary with enough detail.",
            "long": "Generate a detailed summary with deeper explanation.",
        }.get(
            summary_length,
            "Generate a balanced summary with enough detail."
        )

        prompt = f"""
You are an AI Research Assistant.

Research Topic:
{topic}

Based on the following information:

{collected_text}

Generate:

1. Summary:
{length_instruction}

2. Five key points.

Respond in this format:

Summary:
...

Key Points:
- ...
- ...
"""

        if progress_callback:
            progress_callback(
                80,
                "Generating summary..."
            )

        response = generate_response(prompt)

        summary = response
        key_points = []

        if "Key Points:" in response:
            summary_part, points_part = response.split(
                "Key Points:",
                1
            )

            summary = summary_part.replace(
                "Summary:",
                ""
            ).strip()

            key_points = [
                point.replace("-", "").strip()
                for point in points_part.split("\n")
                if point.strip().startswith("-")
            ]

        if progress_callback:
            progress_callback(
                95,
                "Preparing references..."
            )

        result = {
            "topic": topic,
            "summary": summary,
            "key_points": key_points,
            "references": references,
        }

        if progress_callback:
            progress_callback(
                100,
                "Research completed successfully."
            )

        return result