from backend.agents.research_agent import ResearchAgent


class ResearchService:
    """
    Service layer that communicates with the Research Agent.
    """

    def __init__(self):
        self.agent = ResearchAgent()

    def run_research(self, topic: str):
        """
        Execute the research workflow.
        """
        return self.agent.research(topic)