Habit Hero

The Habit Hero project is a full-stack habit tracking application where users can create, update, and track their daily habits. The frontend, built with React and Vite, provides a responsive interface for interacting with the app, sending requests to the Django REST API backend. The backend, using Django REST Framework and SQLite3, handles authentication, CRUD operations for habits, and data storage. API calls from the frontend fetch, create, or update habit data, while the backend ensures data integrity and responds with JSON. Together, this architecture allows real-time habit management and a seamless user experience.

This repository contains the backend API and database logic.

Frontend: React (Vite or CRA)
Backend: Django + Django REST Framework

---

Features

- User Authentication (Register / Login)
- Habit CRUD Operations (Add, View, Update, Delete)
- Mark Habit as Completed
- RESTful API Endpoints
- SQLite (local) / Railway (cloud) Database Support
- Django Admin Panel for Managing Data

---

Tech Stack

- **Python 3.12+**
- **Django 5+**
- **Django REST Framework**
- **SQLite3 (local)**

```Frontend

npm create vite@latest habit-hero-frontend
cd habit-hero-frontend
npm install
npm install axios react-router-dom
npm run build
npm run dev
```

```Backend
git clone https://github.com/nandanbhandary1/Habit_Hero-backend.git
cd Habit_Hero-backend
python -m venv venv
venv\Scripts\activate   # On Windows OR
source venv/bin/activate   # On Mac/Linux
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

```
