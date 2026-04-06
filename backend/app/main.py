from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from database import create_database
from routers import router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_database()
    yield

app = FastAPI(lifespan=lifespan)

app.include_router(router, prefix="/api/v1")