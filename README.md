# To-Do Application

A full-stack To-Do application built with **Nest.js** backend and **Next.js** frontend, featuring JWT authentication and clean architecture with the repository pattern.

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Backend** | Nest.js, TypeORM, MySQL, JWT Authentication |
| **Frontend** | Next.js 16+ (App Router), TypeScript, Tailwind CSS |
| **Database** | MySQL 8.0 (Docker) |

## ✨ Features

- ✅ User authentication (Register/Login) with JWT
- ✅ Create, Read, Update, Delete todos
- ✅ Edit todo title, description, and status
- ✅ Filter todos by status (PENDING, IN_PROGRESS, DONE)
- ✅ Clean architecture with repository pattern
- ✅ Type-safe with TypeScript
- ✅ Responsive UI with Tailwind CSS
- ✅ Protected API routes with JWT middleware

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **Docker** and **Docker Compose**
- **Git**

---

## 🚀 Quick Start

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd TODO
```

### Step 2: Start MySQL Database

```bash
docker compose up -d
```

> ⏳ Wait 10-15 seconds for MySQL to fully initialize.

Verify the database is running:

```bash
docker compose ps
```

You should see `todo_mysql` with status `Up`.

### Step 3: Setup & Run Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Run database migrations
npm run migration:run

# Start the backend server
npm run start:dev
```

✅ Backend will run on **http://localhost:9000**

### Step 4: Setup & Run Frontend

Open a **new terminal** and run:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

✅ Frontend will run on **http://localhost:9001**

---

## 🔧 Environment Variables

### Backend (`.env`)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=todo_user
DB_PASSWORD=todo_password
DB_NAME=todo_db
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=1d
PORT=9000
FRONTEND_URL=http://localhost:9001
```

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:9000
```

---


### Database Connection Issues

```bash
# Check if MySQL container is running
docker compose ps

# View MySQL logs
docker compose logs mysql

# Restart the container
docker compose restart
```

### Port Already in Use

| Service | Default Port |
|---------|--------------|
| Backend | 9000 |
| Frontend | 9001 |
| MySQL | 3306 |

Change ports in `.env` files if needed.

### Migration Issues

```bash
# Revert last migration
npm run migration:revert

# Run migrations again
npm run migration:run
```

### Reset Everything

```bash
# Stop and remove containers + volumes
docker compose down -v

# Start fresh
docker compose up -d

# Wait for MySQL, then run migrations
cd backend
npm run migration:run
```

---