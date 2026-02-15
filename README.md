# HRMS Lite – Full Stack Application

## 📌 Project Overview

HRMS Lite is a lightweight Human Resource Management System built as a full-stack application.  
It allows an admin to manage employees and track daily attendance.

The application focuses on clean architecture, RESTful API design, database persistence, and production-ready UI.

---

## 🚀 Live Application

Frontend: https://hrms-lite-eight-kappa.vercel.app/  
Backend API: https://hrms-lite-1yrp.onrender.com 

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router v7
- Ant Design (UI Library)
- Fetch API

### Backend
- FastAPI
- SQLAlchemy ORM
- PostgreSQL
- Pydantic Validation

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: Render PostgreSQL

---

## ✨ Features

### Employee Management
- Add new employee
- View employee list
- Delete employee
- Unique Employee ID & Email validation

### Attendance Management
- Mark daily attendance (Present / Absent)
- Prevent future date selection
- View attendance records per employee

### Backend Features
- RESTful API design
- Proper HTTP status codes
- Server-side validation
- Duplicate handling
- PostgreSQL persistence

---

## 🗄 Database Schema

### Employees Table
- id (Primary Key)
- employee_id (Unique)
- full_name
- email (Unique)
- department
- created_at

### Attendance Table
- id (Primary Key)
- employee_id (Foreign Key)
- date
- status

---

## ⚙️ Running Project Locally

---

### 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# or
source venv/bin/activate  # Mac/Linux

pip install -r requirements.txt

Create .env file:

DATABASE_URL=postgresql://username:password@localhost:5432/[your_database_name]

Run server:

uvicorn main:app --reload

Backend runs at:

http://127.0.0.1:8000

Swagger Docs:

http://127.0.0.1:8000/docs
```

### 2️⃣ Frontend Setup
```base
cd frontend
npm install
npm run dev
```
Frontend runs at:

http://localhost:5173

💪
