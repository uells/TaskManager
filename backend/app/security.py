from pwdlib import PasswordHash
from datetime import datetime, timedelta
import jwt
from jwt.exceptions import InvalidTokenError
from config import JWT_SECRET_KEY, JWT_ALGORITHM, JWT_EXPIRATION_HOURS
from fastapi import HTTPException

password_hash = PasswordHash.recommended()

DUMMY_HASH = password_hash.hash("dummypassword")

def get_password_hash(password: str) -> str:
    return password_hash.hash(password)

def verify_password_hash(password: str, hash: str) -> bool:
    return password_hash.verify(password, hash)

def create_access_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.now() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload=payload, key=JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)

def verify_token(token: str) -> int:
    credentials_exception = HTTPException(
            status_code=401, 
            detail="Could not validate credentials", 
            headers={"WWW-Authenticate": "Bearer"}
        )
    try:
        payload = jwt.decode(token, key=JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return int(user_id)
    except InvalidTokenError:
        raise credentials_exception