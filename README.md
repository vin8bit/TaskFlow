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
```
## Backend Setup

Go to the backend folder:
```
cd backend
```

Create a virtual environment:
```
python -m venv venv
```
Create a virtual environment:
```
python -m venv venv
```
Activate it on Windows:
```
venv\Scripts\activate
```
Install dependencies:
```
pip install -r requirements.txt
```
Then open .env and set your real values:
```
APP_NAME=TaskFlow Backend
PORT=8000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=internship_db

JWT_SECRET=your_jwt_secret_here
```
Create the database in MySQL if it does not already exist:
```
CREATE DATABASE internship_db;
```

Run migrations:
```
alembic upgrade head
```
Start the backend server:
```
uvicorn app.main:app --reload
```
Start the backend server:
```
uvicorn app.main:app --reload
```

##Frontend Setup

Open a new terminal.
Go to the frontend folder:
```
cd frontend
```

Install packages:
```
npm install
```

Start the frontend:
```
npm run dev
```
```

Frontend will run at:
```
http://localhost:5173
```
