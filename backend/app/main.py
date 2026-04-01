from fastapi import FastAPI, HTTPException
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
    task_data = task.model_dump()
    task_data["id"] = len(tasks) + 1
    tasks.append(task_data)
    return {"status": "Задача добавлена!"}

@app.get("/tasks", summary="Список задач")
def get_tasks():
    return tasks

@app.get("/tasks/{task_id}", summary="Получить задачу по ее id")
def get_task(task_id: int):
    for task in tasks:
        if task["id"] == task_id:
            return task
    raise HTTPException(status_code=404, detail="Задача не найдена!")


