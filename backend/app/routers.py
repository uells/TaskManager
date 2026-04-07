from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_async_session
from schemas import TaskCreate, CategoryCreate
from repositories import TaskRepository, CategoryRepository

router = APIRouter()

@router.post("/task")
async def create_task(task: TaskCreate, session: AsyncSession = Depends(get_async_session)):
    repo = TaskRepository(session)
    return await repo.create(task)

@router.post("/category")
async def create_category(category: CategoryCreate, session: AsyncSession = Depends(get_async_session)):
    repo = CategoryRepository(session)
    return await repo.create(category)

@router.get("/posts", summary="Получить задачи")
async def get_tasks(limit: int, offset: int, session: AsyncSession = Depends(get_async_session)):
    repo = TaskRepository(session)
    return await repo.get_all(limit, offset)