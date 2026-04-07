from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

DUMMY_HASH = password_hash.hash("dummypassword")

def get_password_hash(password: str) -> str:
    return password_hash.hash(password)

def verify_password_hash(password: str, password_hash: str) -> bool:
    return password_hash.verify(password, password_hash)