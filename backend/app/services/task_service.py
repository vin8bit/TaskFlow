from sqlalchemy.orm import Session

from app.models.task import Task
from app.schemas.task import TaskCreate
from app.schemas.task import TaskUpdate

def create_task(db: Session, task_data: TaskCreate, owner_id: int):
    task = Task(
        title=task_data.title,
        description=task_data.description,
        owner_id=owner_id
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def get_tasks_by_owner(db: Session, owner_id: int):
    return db.query(Task).filter(Task.owner_id == owner_id).all()


def get_all_tasks(db: Session):
    return db.query(Task).all()

def get_task_by_id(db: Session, task_id: int):
    return db.query(Task).filter(Task.id == task_id).first()


def update_task(db: Session, task: Task, task_data: TaskUpdate):
    task.title = task_data.title
    task.description = task_data.description
    task.status = task_data.status

    db.commit()
    db.refresh(task)
    return task

def delete_task(db: Session, task: Task):
    db.delete(task)
    db.commit()