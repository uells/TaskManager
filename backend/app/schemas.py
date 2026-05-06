from pydantic import BaseModel
from datetime import date, datetime

class CategoryCreate(BaseModel):
    name: str

class CategoryGet(CategoryCreate):
    id: int

class TaskBase(BaseModel):
    date_begin: date
    date_fact_end: date | None
    date_plan_end: date | None
    category_id: int | None
    author: str
    name: str
    description: str
    link: str | None
    channel: str
    status: str
    id_parent_task: int | None

class TaskCreate(TaskBase):
    user_ids: list[int]
    category_id: int

class TaskUpdate(TaskCreate):
    pass

class TaskGet(TaskBase):
    id: int
    category: CategoryGet | None
    users: list[UserGet]
    # parent: 

class UserCreate(BaseModel):
    username: str
    password: str
    fio: str
    deportament: str
    contract_number: str

class UserGet(BaseModel):
    id: int
    fio: str
    deportament: str
    contract_number: str

class TokenGet(BaseModel):
    access_token: str
    token_type: str

class RefreshTokenCreate(BaseModel):
    id_user: int
    token: str
    expires_at: datetime

class TaskFilter(BaseModel):
    date_from: date | None = None
    date_to: date | None = None
    id_user: int | None = None
    status: str | None = None