from pydantic import BaseModel, Field
from typing import List


class ResearchRequest(BaseModel):
    topic: str = Field(..., min_length=3, max_length=200)
    summary_length: str = Field(
        default="medium",
        pattern="^(short|medium|long)$"
    )


class SearchResult(BaseModel):
    title: str
    url: str


class Reference(BaseModel):
    title: str
    url: str


class ResearchResponse(BaseModel):
    topic: str
    summary: str
    key_points: List[str]
    references: List[Reference]