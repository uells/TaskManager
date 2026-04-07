from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
import os
from dotenv import load_dotenv

load_dotenv()

print(os.getenv('DB_USER'))
DB_URL = (
    f"postgresql+asyncpg://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}"
    f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"
)

class Base(DeclarativeBase):
    pass

engine = create_async_engine(DB_URL, echo=True)

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

async def get_async_session():
    async with async_session_maker() as session:
        yield session

async def create_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def clear_database():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)