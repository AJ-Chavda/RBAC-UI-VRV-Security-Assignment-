
# Role-Based Access Control (RBAC) Project

This project demonstrates the implementation of **Authentication**, **Authorization**, and **Role-Based Access Control (RBAC)** using a **React** frontend and a **Django** backend.

## **Objective**

The goal of this project is to implement secure systems where users can:
1. Authenticate via secure methods.
2. Be assigned roles (e.g., Admin, User, Moderator).
3. Access resources based on their roles, ensuring proper **RBAC**.

---

## **Core Features**

- **Authentication**: Secure user registration, login, and logout.
- **Authorization**: Role-based access to specific resources or endpoints.
- **Security**: Utilizes JWT (JSON Web Tokens) for session management and authentication.
- **Frontend**: Built with React to provide a dynamic user interface.
- **Backend**: Powered by Django to handle business logic, database interactions, and API endpoints.

---

## **Technologies Used**

- **Frontend**: React.js
- **Backend**: Django (Python)
- **Database**: SQLite
- **Authentication**: JSON Web Tokens (JWT)
- **API Testing**: Postman

---

## **Setup Instructions**

### Prerequisites
1. Install **Node.js** and **npm** (for the frontend).
2. Install **Python** and **pip** (for the backend).
3. Install **virtualenv** for Python environment isolation.

---

### **Backend Setup (Django)**

1. Navigate to the backend directory:
   ```bash
   cd rbac_ui
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv env
   source env/bin/activate  # On Windows, use `env\Scripts\activate`
   ```

3. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

4. Run database migrations:
   ```bash
   python manage.py migrate
   ```

5. Create super user
   ```bash
   python manage.py createsuperuser
   ```

6. Start the backend server:
   ```bash
   python manage.py runserver
   ```

   The backend will run on **http://localhost:8000**.

---

### **Frontend Setup (React)**

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

   The frontend will run on **http://localhost:3000**.

---

## **How to Run**

1. Start the backend server.
2. Access only backend via **http://localhost:8000/admin** in your browser.
3. Start the frontend server.
4. Access the application via **http://localhost:3000** in your browser.

---

## **Directory Structure**

```base
Project/
├─ FrontEnd/
│  ├─ node-module/
│  ├─ public/
│  │  ├─ index.html
│  │  ├─ manifest.json
│  │  ├─ favicon.ico
│  ├─ src/
│  │  ├─ components/
│  │  │  ├─ Home.js
│  │  │  ├─ Navbar.js
│  │  │  ├─ Login.js
│  │  │  ├─ Register.js
│  │  │  ├─ Dashboard.js
│  │  │  ├─ RoleManagement.js
│  │  │  ├─ UserManagement.js
│  │  │  ├─ PermissionManagement.js
│  │  ├─ context/
│  │  │  ├─ AuthContext.js
│  │  ├─ middleware/
│  │  │  ├─ PrivateRoute,js
│  │  ├─ App.js
│  │  ├─ App.css
│  │  ├─ App.test.css
│  │  ├─ index.js
│  │  ├─ index.css
│  │  ├─ axios.js
├─ Backend/
│  ├─ rbac_ui/
│  │  ├─ __init__.py
│  │  ├─ asgi.py
│  │  ├─ settings.py
│  │  ├─ urls.py
│  │  ├─ wsgi.py
│  ├─ myapp/
│  │  ├─ migrations/
│  │  ├─ __init__.py
│  │  ├─ admin.py
│  │  ├─ apps.py
│  │  ├─ models.py
│  │  ├─ permissions.py
│  │  ├─ serializers.py
│  │  ├─ tests.py
│  │  ├─ views.py
│  ├─ db.sqlite3
│  ├─ manage.py
│  ├─ requirements.txt

```
---

## **Endpoints**

### Authentication
- `POST /register` - User registration
- `POST /login` - User login
- `POST /logout` - User logout

### Role-Based Access
- Example: `GET /admin/` - Accessible only to Admin users.
- `GET /api/dashboard/` - Accessible to only Admin.

---

## **Security Features**

- **Password Hashing**: Ensures user passwords are stored securely.
- **JWT Tokens**: Used for session management and to protect endpoints.

---

