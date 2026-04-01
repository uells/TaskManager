from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from datetime import date

app = FastAPI()

class TaskCreate(BaseModel):
    date_begin: date
    date_fact_end: Optional[date] = None
    date_plan_end: Optional[date] = None
    category_id: int
    author: str
    name: str
    description: str
    link: Optional[str] = None
    channel: str
    status: str
    id_parent_task: Optional[int] = None

tasks = []

@app.post("/tasks", summary="Добавление задачи")
def create_task(task: TaskCreate):
    tasks.append(task)
    return {"status": "Задача добавлена!"}

@app.get("/tasks", summary="Список задач")
def get_tasks():
    return tasks


