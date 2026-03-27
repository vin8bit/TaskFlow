from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.security import oauth2_scheme, decode_access_token
from app.db.deps import get_db
from app.schemas.auth import TokenPayload
from app.models.user import User


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    token_data = TokenPayload(**payload)

    user = db.query(User).filter(User.id == int(token_data.sub)).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )

    return user