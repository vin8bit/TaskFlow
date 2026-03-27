from sqlalchemy.orm import Session

from app.schemas.user import UserLogin
from app.services.user_service import get_user_by_email
from app.core.security import verify_password


def authenticate_user(db: Session, login_data: UserLogin):
    user = get_user_by_email(db, login_data.email)

    if not user:
        raise ValueError("Invalid email or password")

    if not verify_password(login_data.password, user.hashed_password):
        raise ValueError("Invalid email or password")

    return user