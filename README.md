# TaskFlow

TaskFlow is a full-stack task management application built with FastAPI, MySQL, React, and Bootstrap. It supports secure user authentication, role-based access control, and task CRUD operations in a responsive web interface.

---

## Features

### Authentication
- User registration
- User login
- JWT-based authentication
- Protected frontend routes
- Logout flow

### Authorization
- Role-based access control (User and Admin)
- Users can access only their own tasks
- Admin can view all tasks

### Task Management
- Create tasks
- View tasks
- Update tasks
- Delete tasks
- Track task status (`pending` / `completed`)

### Frontend
- Responsive UI with Bootstrap
- Professional landing page
- Sign up and login screens
- Protected workspace dashboard
- Task summary cards and task management interface

### Backend
- FastAPI REST API
- SQLAlchemy ORM
- MySQL database
- Alembic migrations
- Pydantic validation
- Centralized validation error handling

---

## Tech Stack

### Backend
- FastAPI
- SQLAlchemy 2.0
- MySQL
- Alembic
- Pydantic
- JWT
- Passlib / bcrypt

### Frontend
- React
- Vite
- Bootstrap
- Axios
- React Router DOM

### API Testing
- Postman

---

## Project Structure

```text
project-root/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── schemas/
│   │   └── services/
│   ├── alembic/
│   ├── alembic.ini
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md