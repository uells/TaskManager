from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from database import create_database

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_database()
    yield

app = FastAPI(lifespan=lifespan)