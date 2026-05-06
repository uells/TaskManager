from fastapi import APIRouter, Depends, HTTPException, Response, Request
from schemas import TaskCreate, CategoryCreate, TaskFilter, TaskGet, TaskUpdate,  CategoryGet, TokenGet, UserCreate, UserGet, RefreshTokenCreate
from repositories import TaskRepository, CategoryRepository, UserRepository, RefreshTokenRepository
from dependencies import SessionDep, LoginFormDep, TaskFilterDep, UserDep
from security import verify_password_hash, DUMMY_HASH, create_access_token, create_refresh_token
from datetime import datetime
router = APIRouter()

@router.post("/auth/login", summary="Аутентификация пользователя", response_model=TokenGet)
async def get_token(async_session: SessionDep, form: LoginFormDep, response: Response):
    invalid_credentials_exp = HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    user_repo = UserRepository(async_session)
    user = await user_repo.get_by_username(form.username)
    if user is None:
        verify_password_hash(form.password, DUMMY_HASH)
        raise invalid_credentials_exp
    if not verify_password_hash(form.password, user.password_hash):
        raise invalid_credentials_exp
    refresh_token, expires_at = create_refresh_token()
    refresh_token_schemas = RefreshTokenCreate(
        id_user=user.id,
        token=refresh_token,
        expires_at=expires_at
        )
    refresh_token_repo = RefreshTokenRepository(async_session)
    await refresh_token_repo.create(refresh_token_schemas)
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        path="/api/v1/auth"
    )
    return TokenGet(access_token= create_access_token(user.id), token_type="Bearer")

@router.post("/auth/refresh", summary="Обновление access-токена", response_model=TokenGet)
async def refresh_tokens(async_session: SessionDep, request: Request, response: Response):
    invalid_credentials_exp = HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )
    refresh_token = request.cookies.get("refresh_token")
    if refresh_token is None:
        raise invalid_credentials_exp
    refresh_token_repo = RefreshTokenRepository(async_session)
    refresh_token_db = await refresh_token_repo.get(refresh_token)
    if refresh_token_db is None:
        raise invalid_credentials_exp
    if refresh_token_db.expires_at < datetime.now():
        raise invalid_credentials_exp
    new_refresh_token, expires_at = create_refresh_token()
    
    await refresh_token_repo.create(RefreshTokenCreate(
        id_user=refresh_token_db.id_user,
        token=new_refresh_token,
        expires_at=expires_at
    ))
    await refresh_token_repo.delete(refresh_token)
    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        path="/api/v1/auth"
    )
    return TokenGet(access_token=create_access_token(refresh_token_db.id_user), token_type="Bearer")

@router.post("/auth/logout", summary="Инвалидация refresh токена")
async def logout(async_session: SessionDep, request: Request, response: Response, _user: UserDep):
    refresh_token_repo = RefreshTokenRepository(async_session)
    refresh_token = request.cookies.get("refresh_token")
    if refresh_token is None:
        return
    await refresh_token_repo.delete(refresh_token)
    response.delete_cookie(key="refresh_token", path="/api/v1/auth")

@router.post("/user", summary="Создание пользователя", response_model=UserGet)
async def create_user(user: UserCreate, session: SessionDep):
    repo = UserRepository(session)
    return await repo.create(user)

@router.get("/user", summary="Получение списка всех пользователей", response_model=list[UserGet])
async def get_users(session: SessionDep, _user: UserDep):
    repo = UserRepository(session)
    return await repo.get_all()

@router.post("/category", summary="Создание категории", response_model=CategoryGet)
async def create_category(category: CategoryCreate, session: SessionDep, _user: UserDep):
    repo = CategoryRepository(session)
    return await repo.create(category)

@router.get("/category", summary="Получение списка категорий", response_model=list[CategoryGet])
async def get_categories(session: SessionDep, _user: UserDep):
    repo = CategoryRepository(session)
    return await repo.get_all()

@router.delete("/category/{id_category}", summary="Удаление категории", status_code=204)
async def delete_category(id_category: int, session: SessionDep, _user: UserDep):
    repo = CategoryRepository(session)
    is_deleted = await repo.delete(id_category)
    if  not is_deleted:
        raise HTTPException(404, "Category not found")

@router.post("/task", summary="Создание задачи", response_model=TaskGet)
async def create_task(task: TaskCreate, session: SessionDep, _user: UserDep):
    repo = TaskRepository(session)
    return await repo.create(task)

@router.get("/task", summary="Получение задач", response_model=list[TaskGet])
async def get_tasks(filter: TaskFilterDep, session: SessionDep, _user: UserDep, limit: int = 10, offset: int = 0):
    repo = TaskRepository(session)
    return await repo.get_list(limit, offset, filter)

@router.get("/task/{id_task}", summary="Получение одной задачи по id", response_model=TaskGet)
async def get_task(id_task: int, session: SessionDep, _user: UserDep):
    not_found_exp = HTTPException(
        status_code=404,
        detail="Not found"
    )
    repo = TaskRepository(session)
    task = await repo.get(id_task)
    if task is None:
        raise not_found_exp
    return task

@router.delete("/task/{id_task}", summary="Удаление задачи по id", status_code=204)
async def delete_task(id_task: int, session: SessionDep, _user: UserDep):
    not_found_exp = HTTPException(
        status_code=404,
        detail="Not found"
    )
    repo = TaskRepository(session)
    is_deleted = await repo.delete(id_task)
    if not is_deleted:
        raise not_found_exp
    
@router.put("/task/{id_task}", summary="Полное обновление задачи", response_model=TaskGet)
async def update_task(id_task: int, task: TaskUpdate, session: SessionDep, _user: UserDep):
    repo = TaskRepository(session)
    return await repo.update(id_task, task)