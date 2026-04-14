from typing import Annotated
from security import verify_token
from repositories import UserRepository
from database import get_async_session
from fastapi import Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/login")

SessionDep = Annotated[AsyncSession, Depends(get_async_session)]
LoginFormDep = Annotated[OAuth2PasswordRequestForm, Depends(OAuth2PasswordRequestForm)]
TokenDep = Annotated[str, Depends(oauth2_scheme)]

async def get_current_user(async_session: SessionDep, token: TokenDep):
    credentials_exception = HTTPException(
        status_code=401, 
        detail="Could not validate credentials", 
        headers={"WWW-Authenticate": "Bearer"}
    )
    user_id = verify_token(token)
    repo = UserRepository(session=async_session)
    user = await repo.get_by_id(user_id=user_id)
    if user is None:
        raise credentials_exception
    return user

UserDep = Annotated[object, Depends(get_current_user)]