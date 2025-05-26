# Development Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your local configuration.

5. Set up the database:
```bash
psql -U postgres
CREATE DATABASE companionsquared;
\q
```

6. Run database migrations:
```bash
psql -U postgres -d companionsquared -f sql/schema.sql
psql -U postgres -d companionsquared -f sql/seeds.sql
```

7. Start the development server:
```bash
npm run dev
```

## Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your local configuration.

5. Start the development server:
```bash
npm start
```

## Development Workflow

1. The backend runs on `http://localhost:3001`
2. The frontend runs on `http://localhost:3000`
3. API documentation is available at `http://localhost:3001/api-docs`

## Testing

Run backend tests:
```bash
cd backend
npm test
```

Run frontend tests:
```bash
cd frontend
npm test
```

## Code Style

- Backend uses ESLint with Airbnb config
- Frontend uses ESLint with Create React App config
- Run linters:
```bash
# Backend
cd backend
npm run lint

# Frontend
cd frontend
npm run lint
``` 