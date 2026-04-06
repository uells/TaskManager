from pydantic import BaseModel
from datetime import date

class CategoryCreate(BaseModel):
    name: str

class TaskCreate(BaseModel):
    date_begin: date
    date_fact_end: date | None
    date_plan_end: date | None
    category_id: int
    author: str
    name: str
    description: str
    link: str | None
    channel: str
    status: str
    id_parent_task: int | None
