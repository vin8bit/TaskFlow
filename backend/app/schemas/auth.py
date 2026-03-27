from pydantic import BaseModel, EmailStr


class TokenPayload(BaseModel):
    sub: str
    email: EmailStr
    role: str