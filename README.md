# Keel

Keel is a personal finance application for tracking accounts, transactions, budgets, categories, tags, and recurring transactions. It uses a React frontend, an Express API, and PostgreSQL for persistence.

## Features

- Email/password authentication with protected application routes
- Optional Google OAuth authentication
- Multiple account types, currencies, and opening balances
- Income, expense, and account-transfer transactions
- Hierarchical transaction categories
- Budgets with weekly, monthly, and yearly periods
- Tags for organizing transactions
- Recurring transactions with pause, resume, and due-transaction processing
- Dashboard, reports, net worth, and recent/upcoming transaction views

## Project Structure

```text
backend/    Express API, PostgreSQL access, authentication, and recurring-transaction jobs
frontend/   React/Vite single-page application
docker-compose.yml
```

## Prerequisites

- Node.js 18 or newer
- PostgreSQL 14 or newer
- npm
- Docker and Docker Compose, if you want to run the app containers

## Local Setup

1. Create the database and apply the schema:

	```bash
	createdb keel
	psql -d keel -f backend/src/db/schema.sql
	```

2. Create `backend/.env`:

	```dotenv
	PORT=5000
	CLIENT_URL=http://localhost:3000

	DB_HOST=localhost
	DB_PORT=5432
	DB_NAME=keel
	DB_USER=postgres
	DB_PASSWORD=your-postgres-password

	JWT_SECRET=replace-with-a-long-random-secret

	# Required only for Google OAuth
	GOOGLE_CLIENT_ID=your-google-client-id
	GOOGLE_CLIENT_SECRET=your-google-client-secret
	GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
	```

3. Install dependencies:

	```bash
	cd backend
	npm install
	cd ../frontend
	npm install
	```

4. Optionally create `frontend/.env` when the API is not running at its default URL:

	```dotenv
	VITE_API_BASE_URL=http://localhost:5000/api
	```

5. Start the backend and frontend in separate terminals:

	```bash
	# Terminal 1
	cd backend
	npx nodemon src/index.js
	```

	```bash
	# Terminal 2
	cd frontend
	npm run dev
	```

	Open [http://localhost:3000](http://localhost:3000) in a browser.

## Docker Compose

The Compose file builds and exposes the frontend on port `3000` and the backend on port `5000`. It does not provision PostgreSQL, so configure an accessible PostgreSQL instance and provide the backend environment variables through your container environment.

```bash
docker compose up --build
```

## API Overview

The API is served under `/api`:

| Resource | Base path |
| --- | --- |
| Authentication | `/api/auth` |
| Accounts | `/api/accounts` |
| Categories | `/api/categories` |
| Transactions | `/api/transactions` |
| Tags | `/api/tags` |
| Budgets | `/api/budgets` |
| Recurring transactions | `/api/recurringTransactions` |

Most resource endpoints require authentication. The frontend stores the bearer token in local storage and sends it with API requests; cookies are also enabled for authentication flows.

## Available Commands

### Frontend

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
```

### Backend

From `backend/`:

```bash
node src/index.js                 # Start the API
npx nodemon src/index.js          # Start the API with automatic reloads
```

The backend package scripts currently reference `index.js` at the package root, while the application entry point is `src/index.js`; the commands above use the actual entry point.

## Development Notes

- The backend exits during startup if PostgreSQL is unreachable.
- CORS is restricted to the origin configured by `CLIENT_URL`.
- Recurring transactions can be processed through the recurring-transaction API and the backend recurring-transaction job.
- Never commit `.env` files or production credentials.
