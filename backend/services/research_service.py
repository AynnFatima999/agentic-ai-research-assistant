import logging

from cachetools import TTLCache

from backend.agents.research_agent import ResearchAgent


logger = logging.getLogger(__name__)


class ResearchService:
    """
    Service layer that communicates with the Research Agent.
    """

    def __init__(self):
        self.agent = ResearchAgent()

        self.cache = TTLCache(
            maxsize=100,
            ttl=3600,
        )

    def run_research(
        self,
        topic: str,
        summary_length: str = "medium",
        progress_callback=None
    ):
        """
        Execute the research workflow with caching.
        """

        if not topic or not topic.strip():

            logger.warning("Empty research topic received.")

            if progress_callback:
                progress_callback(
                    100,
                    "Research topic is empty."
                )

            return {
                "topic": topic,
                "summary": "",
                "key_points": [],
                "references": []
            }


        clean_topic = topic.strip()

        cache_key = (
            clean_topic.lower(),
            summary_length,
        )


        if cache_key in self.cache:

            logger.info(
                f"Returning cached research: {clean_topic}"
            )

            if progress_callback:
                progress_callback(
                    100,
                    "Loaded from cache."
                )

            return self.cache[cache_key]


        try:

            result = self.agent.research(
                topic=clean_topic,
                summary_length=summary_length,
                progress_callback=progress_callback
            )


            self.cache[cache_key] = result


            logger.info(
                f"Research cached: {clean_topic}"
            )


            return result


        except Exception as e:

            logger.exception(
                f"Research workflow failed: {e}"
            )

            if progress_callback:
                progress_callback(
                    100,
                    "Research failed."
                )

            return {
                "topic": topic,
                "summary": "",
                "key_points": [],
                "references": []
            }