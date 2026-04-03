from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

DB_URL = "sqllite + aiosqlite:///./data/tasks.db"

class Base(DeclarativeBase):
    pass

engine = create_async_engine(DB_URL, echo=True)

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

async def get_async_session():
    async with async_session_maker() as session:
        yield session