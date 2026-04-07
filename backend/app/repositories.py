from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from models import Task, Category
from schemas import TaskCreate, CategoryCreate

class TaskRepository:
    session: AsyncSession
    def __init__(self, session: AsyncSession):
        self.session = session
    
    async def create(self, task_data: TaskCreate):
        db_task = Task(**task_data.model_dump())
        self.session.add(db_task)
        await self.session.commit()
        await self.session.refresh(db_task)
        return db_task
    
    async def get_all(self, limit: int, offset: int):
        query = select(Task).limit(limit).offset(offset)
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