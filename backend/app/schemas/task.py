from pydantic import BaseModel, Field


class TaskCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=150)
    description: str | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    status: str
    owner_id: int

    model_config = {"from_attributes": True}

class TaskUpdate(BaseModel):
    title: str = Field(..., min_length=2, max_length=150)
    description: str | None = None
    status: str = Field(..., pattern="^(pending|completed)$")