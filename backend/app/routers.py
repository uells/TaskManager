from fastapi import APIRouter, Depends, HTTPException
from schemas import TaskCreate, CategoryCreate, TaskGet, CategoryGet, TokenGet, UserCreate, UserGet
from repositories import TaskRepository, CategoryRepository, UserRepository
from dependencies import SessionDep, LoginFormDep, UserDep
from security import verify_password_hash, DUMMY_HASH, create_access_token

router = APIRouter()

@router.post("/user", summary="Создание пользователя", response_model=UserGet)
async def create_user(user: UserCreate, session: SessionDep):
    repo = UserRepository(session)
    return await repo.create(user)

@router.post("/login", summary="Аутентификация пользователя", response_model=TokenGet)
async def get_token(async_session: SessionDep, form: LoginFormDep):
    invalid_credentials_exp = HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    repo = UserRepository(async_session)
    user = await repo.get_by_username(form.username)
    if user is None:
        verify_password_hash(form.password, DUMMY_HASH)
        raise invalid_credentials_exp
    if not verify_password_hash(form.password, user.password_hash):
        raise invalid_credentials_exp
    response = {
        "access_token": create_access_token(user.id),
        "token_type": "Bearer"
    }
    return response

@router.post("/task", summary="Создание задачи", response_model=TaskGet)
async def create_task(task: TaskCreate, session: SessionDep, user: UserDep):
    repo = TaskRepository(session)
    return await repo.create(task)

@router.post("/category", summary="Создание категории", response_model=CategoryGet)
async def create_category(category: CategoryCreate, session: SessionDep, user: UserDep):
    repo = CategoryRepository(session)
    return await repo.create(category)

@router.get("/task", summary="Получение задач", response_model=list[TaskGet])
async def get_tasks(limit: int, offset: int, session: SessionDep, user: UserDep):
    repo = TaskRepository(session)
    return await repo.get_all(limit, offset)

