from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from security import get_password_hash
from models import Task, Category, User
from schemas import TaskCreate, CategoryCreate, UserCreate
from sqlalchemy.orm import selectinload

class TaskRepository:
    session: AsyncSession
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def create(self, task: TaskCreate):
        task_data = task.model_dump()

        user_ids = task_data.pop("user_ids") # будет всегда хотя бы 1 иначе pydantic ошибка
        query = select(User).where(User.id.in_(user_ids))
        users = await self.session.execute(query)
        users = users.scalars().all()

        if (len(users) != len(user_ids)):
            raise HTTPException(404, "Some users not found")
        
        task_data["users"] = users
        db_task = Task(**task_data)

        self.session.add(db_task)
        await self.session.commit()

        query = select(Task).where(Task.id == db_task.id).options(selectinload(Task.category), selectinload(Task.users))
        result = await self.session.execute(query)
        return result.scalar_one()
    
    async def get_all(self, limit: int, offset: int):
        query = select(Task).options(selectinload(Task.category), selectinload(Task.users)).limit(limit).offset(offset)
        result = await self.session.execute(query)
        return result.scalars().all()

class CategoryRepository:
    session: AsyncSession
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def create(self, category_data: CategoryCreate):
        db_category = Category(**category_data.model_dump())
        self.session.add(db_category)
        await self.session.commit()
        await self.session.refresh(db_category)
        return db_category
    
class UserRepository():
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, user: UserCreate):
        user_data = user.model_dump()
        password = user_data.pop("password")
        password_hash = get_password_hash(password)
        db_user = User(**user_data, password_hash = password_hash)
        self.session.add(db_user)
        await self.session.commit()
        await self.session.refresh(db_user)
        return db_user