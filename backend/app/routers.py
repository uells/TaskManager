from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from database import get_async_session
from schemas import TaskCreate, CategoryCreate, TaskGet, CategoryGet, UserCreate, UserGet
from repositories import TaskRepository, CategoryRepository, UserRepository

router = APIRouter()

@router.post("/task")
async def create_task(task: TaskCreate, session: AsyncSession = Depends(get_async_session)):
    repo = TaskRepository(session)
    return await repo.create(task)

@router.post("/category")
async def create_category(category: CategoryCreate, session: AsyncSession = Depends(get_async_session)):
    repo = CategoryRepository(session)
    return await repo.create(category)

@router.get("/task", summary="Получить задачи", response_model=list[TaskGet])
async def get_tasks(limit: int, offset: int, session: AsyncSession = Depends(get_async_session)):
    repo = TaskRepository(session)
    return await repo.get_all(limit, offset)

@router.post("/user", summary="Создание пользователя", response_model=UserGet)
async def create_user(user: UserCreate, session: AsyncSession = Depends(get_async_session)):
    repo = UserRepository(session)
    return await repo.create(user)