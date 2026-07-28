from ddgs import DDGS


class WebSearchTool:
    def search(self, query: str, max_results: int = 5):
        """
        Search DuckDuckGo and return candidate sources.
        """

        results = []

        try:
            with DDGS() as ddgs:
                search_results = ddgs.text(
                    query,
                    max_results=max_results
                )

                for item in search_results:
                    results.append(
                        {
                            "title": item.get("title", ""),
                            "url": item.get("href", "")
                        }
                    )

        except Exception as e:
            print("Search Error:", e)

        return results