from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase
from config import DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME

DB_URL = (
    f"postgresql+asyncpg://{DB_USER}:{DB_PASS}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
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