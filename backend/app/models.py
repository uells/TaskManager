from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Date, ForeignKey
from database import Base
from datetime import date
from typing import List

class Category(Base):
    __tablename__ = "categories"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]

    tasks: Mapped[List[Task]] = relationship("Task", back_populates="category")

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    date_begin: Mapped[date] = mapped_column(Date)
    date_fact_end: Mapped[date | None] = mapped_column(Date)
    date_plan_end: Mapped[date | None] = mapped_column(Date)
    category_id: Mapped[int] = mapped_column(ForeignKey("categories.id"))
    author: Mapped[str]
    name: Mapped[str]
    description: Mapped[str]
    link: Mapped[str | None]
    channel: Mapped[str]
    status: Mapped[str]
    id_parent_task: Mapped[int | None] = mapped_column(ForeignKey("tasks.id"))

    users: Mapped[List[User]] = relationship("User", secondary="co_executors", back_populates="tasks")
    category: Mapped[Category] = relationship("Category", back_populates="tasks")
    parent: Mapped[Task | None] = relationship("Task", back_populates="subtasks", remote_side=[id])
    subtasks: Mapped[List[Task]] = relationship("Task", back_populates="parent")

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    username: Mapped[str] = mapped_column(unique=True)
    password_hash: Mapped[str]
    fio: Mapped[str]
    deportament: Mapped[str]
    contract_number: Mapped[str]

    tasks: Mapped[List[Task]] = relationship("Task", secondary="co_executors", back_populates="users")

class CoExecutor(Base):
    __tablename__ = "co_executors"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    id_task: Mapped[int] = mapped_column(ForeignKey("tasks.id"))
    id_user: Mapped[int] = mapped_column(ForeignKey("users.id"))


