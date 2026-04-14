from typing import Annotated
from security import verify_token
from repositories import UserRepository
from database import get_async_session
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")

SessionDep = Annotated[AsyncSession, Depends(get_async_session)]
TokenDep = Annotated[str, Depends(oauth2_scheme)]

async def get_current_user(async_session: SessionDep, token: TokenDep):
    user_id = verify_token(token)
    repo = UserRepository(session=async_session)
    return await repo.get(user_id=user_id)