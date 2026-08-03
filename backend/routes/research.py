import json
import logging
import asyncio
from asyncio import Queue

from fastapi import (
    APIRouter,
    HTTPException,
    Query,
    Request,
)
from fastapi.responses import StreamingResponse
from sse_starlette.sse import EventSourceResponse

from backend.models.schemas import (
    ResearchRequest,
    ResearchResponse,
)
from backend.services.research_service import ResearchService
from backend.services.pdf_service import PDFService
from backend.core.limiter import limiter


logger = logging.getLogger(__name__)


router = APIRouter(
    prefix="/research",
    tags=["Research"],
)

service = ResearchService()


@router.post("/", response_model=ResearchResponse)
@limiter.limit("10/minute")
async def research(
    request: Request,
    body: ResearchRequest,
):

    try:
        result = service.run_research(
            body.topic,
            body.summary_length,
        )

        return ResearchResponse(
            topic=result["topic"],
            summary=result["summary"],
            key_points=result["key_points"],
            references=result["references"],
        )

    except Exception as e:
        logger.exception(f"Research endpoint failed: {e}")

        raise HTTPException(
            status_code=500,
            detail="Research process failed. Please try again.",
        )


@router.get("/stream")
@limiter.limit("10/minute")
async def stream_research(
    request: Request,
    topic: str = Query(...),
    summary_length: str = Query("medium"),
):

    async def event_generator():

        queue = Queue()

        def progress_callback(progress: int, message: str):
            queue.put_nowait(
                {
                    "progress": progress,
                    "message": message,
                }
            )

        async def run_research():

            result = await asyncio.to_thread(
                service.run_research,
                topic,
                summary_length,
                progress_callback,
            )

            queue.put_nowait(
                {
                    "completed": True,
                    "result": result,
                }
            )

        asyncio.create_task(run_research())

        while True:

            event = await queue.get()

            if event.get("completed"):

                yield {
                    "event": "completed",
                    "data": json.dumps(event["result"]),
                }

                break

            yield {
                "event": "progress",
                "data": json.dumps(event),
            }

    return EventSourceResponse(event_generator())


@router.post(
    "/pdf",
    response_class=StreamingResponse,
    responses={
        200: {
            "description": "Generated PDF report",
            "content": {
                "application/pdf": {},
            },
        }
    },
)
@limiter.limit("5/minute")
async def research_pdf(
    request: Request,
    body: ResearchRequest,
):

    try:
        result = service.run_research(
            body.topic,
            body.summary_length,
        )

        pdf = PDFService.generate_pdf(
            topic=result["topic"],
            summary=result["summary"],
            key_points=result["key_points"],
            references=result["references"],
        )

        filename = (
            body.topic
            .strip()
            .lower()
            .replace(" ", "_")
            .replace("/", "_")
        )

        return StreamingResponse(
            iter([pdf]),
            media_type="application/pdf",
            headers={
                "Content-Disposition": (
                    f'attachment; filename="{filename}.pdf"'
                )
            },
        )

    except Exception as e:
        logger.exception(f"PDF generation failed: {e}")

        raise HTTPException(
            status_code=500,
            detail="Failed to generate PDF.",
        )