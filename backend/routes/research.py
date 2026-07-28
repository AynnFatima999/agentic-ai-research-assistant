from fastapi import APIRouter

from backend.models.schemas import (
    ResearchRequest,
    ResearchResponse,
)

from backend.services.research_service import ResearchService

router = APIRouter(prefix="/research", tags=["Research"])

service = ResearchService()


@router.post("/", response_model=ResearchResponse)
async def research(request: ResearchRequest):

    result = service.run_research(request.topic)

    return ResearchResponse(
        topic=result["topic"],
        summary=result["summary"],
        key_points=result["key_points"],
        references=result["references"],
    )