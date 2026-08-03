from ddgs import DDGS
import logging

logger = logging.getLogger(__name__)


class WebSearchTool:
    def search(self, query: str, max_results: int = 5):
        """
        Search DuckDuckGo and return candidate sources.

        Returns:
            list[dict]:
                [
                    {
                        "title": "...",
                        "url": "..."
                    }
                ]
        """

        # Validate input
        if not query or not query.strip():
            logger.warning("Empty search query received.")
            return []

        results = []

        try:
            with DDGS() as ddgs:
                search_results = ddgs.text(
                    query.strip(),
                    max_results=max_results
                )

                for item in search_results:
                    url = item.get("href", "")
                    title = item.get("title", "")

                    if url:
                        results.append(
                            {
                                "title": title,
                                "url": url
                            }
                        )

            if not results:
                logger.warning(f"No search results found for query: {query}")

        except Exception as e:
            logger.exception(f"Web search failed: {e}")
            return []

        return results