# Keel

Keel is a personal finance app for tracking accounts, transactions, budgets, categories, tags, and recurring activities. It is built with a React + Vite frontend, an Express API, and PostgreSQL.

## Features

- Email/password authentication with protected routes
- JWT-based API auth and session handling
- Multiple account types with balances and transaction history
- Income, expense, and transfer transactions
- Hierarchical categories and tagging
- Budget tracking by period
- Recurring transaction workflows
- Dashboard and reporting views for overall financial health
- Optional Google OAuth setup via Passport configuration

## Project Structure

```text
backend/     Express API, PostgreSQL access, auth, and recurring-job logic
frontend/    React + Vite single-page application
README.md
Docker Compose file at the repo root
```

## Tech Stack

- Frontend: React, Vite, React Query, React Router, Tailwind CSS
- Backend: Node.js, Express, Passport, PostgreSQL, JWT
- Database: PostgreSQL
- Optional tooling: Docker Compose, recurring job processing

## Prerequisites

- Node.js 18+
- npm
- PostgreSQL 14+
- Docker and Docker Compose if you want the containerized setup

## Local Development Setup

### 1) Create a PostgreSQL database

```bash
createdb keel
psql -d keel -f backend/src/db/schema.sql
```

### 2) Create the backend environment file

Create `backend/.env` with values similar to:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=keel
DB_USER=postgres
DB_PASSWORD=your-postgres-password

JWT_SECRET=replace-with-a-long-random-secret
JWT_REFRESH_SECRET=replace-with-another-random-secret

CLIENT_URL=http://localhost:5173

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback

NODE_ENV=development
PORT=5000
```

### 3) Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 4) Configure the frontend API URL

If the frontend is not using the default value, create `frontend/.env`:

```dotenv
VITE_API_BASE_URL=http://localhost:5000/api
```

### 5) Run the app

Start the backend in one terminal:

```bash
cd backend
npx nodemon src/index.js
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open the app in the browser at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

## API Overview

The backend serves the app under `/api`.

| Resource | Base path |
| --- | --- |
| Auth | `/api/auth` |
| Accounts | `/api/accounts` |
| Categories | `/api/categories` |
| Transactions | `/api/transactions` |
| Tags | `/api/tags` |
| Budgets | `/api/budgets` |
| Recurring transactions | `/api/recurringTransactions` |

Most endpoints require authentication. The frontend stores the JWT in local storage and attaches it to requests via the Axios client.

## Available Commands

### Frontend

```bash
npm run dev      # Start Vite in development mode
npm run build    # Build the production bundle
npm run preview  # Preview the production build locally
```

### Backend

```bash
node src/index.js        # Start the API directly
npx nodemon src/index.js # Start the API with auto-reload
```

> Note: the backend package scripts currently reference `index.js` at the package root, but the app entry point in this project is `src/index.js`.

## Docker Setup

The repo includes a Compose file that starts the frontend and backend services. It does not provision PostgreSQL, so you still need a reachable PostgreSQL instance and the required backend environment variables.

```bash
docker compose up --build
```

The default local frontend port for Vite is `5173`, while the backend listens on `5000`.

## Notes

- The backend fails at startup if PostgreSQL is unavailable.
- CORS is configured for the frontend origin defined in `CLIENT_URL`.
- Recurring transactions are supported by the backend job flow and API layer.
- Do not commit `.env` files or production secrets to source control.
