from pydantic import BaseModel
from datetime import date

class CategoryCreate(BaseModel):
    name: str

class CategoryGet(CategoryCreate):
    id: int

class TaskBase(BaseModel):
    date_begin: date
    date_fact_end: date | None
    date_plan_end: date | None
    category_id: int
    author: str
    name: str
    description: str
    link: str | None
    channel: str
    status: str
    id_parent_task: int | None

class TaskCreate(TaskBase):
    user_ids: list[int]

class TaskGet(TaskBase):
    id: int
    category: CategoryGet
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