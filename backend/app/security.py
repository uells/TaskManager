from pwdlib import PasswordHash
from datetime import datetime, timedelta
import jwt
from config import JWT_SECRET_KEY, JWT_ALGORITHM, JWT_EXPIRATION_HOURS


password_hash = PasswordHash.recommended()

DUMMY_HASH = password_hash.hash("dummypassword")

def get_password_hash(password: str) -> str:
    return password_hash.hash(password)

def verify_password_hash(password: str, password_hash: str) -> bool:
    return password_hash.verify(password, password_hash)

def create_access_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.now() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload=payload, key=JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
