# Guestbook Application

A full-stack Guestbook web application where visitors can leave their name and a message. Built with a modern tech stack and a retro-inspired UI.

## Tech Stack

| Layer     | Technology                   |
|-----------|------------------------------|
| Frontend  | React (Vite) + Tailwind CSS  |
| Backend   | NestJS                       |
| Database  | Supabase (PostgreSQL)        |
| Deployment| Vercel                       |

## Project Structure

```
Guesbook/
├── backend/                             NestJS REST API
│   ├── src/
│   │   ├── supabase/
│   │   │   ├── supabase.module.ts       Global Supabase provider module
│   │   │   └── supabase.service.ts      Supabase client initialization
│   │   ├── guestbook/
│   │   │   ├── guestbook.module.ts      Guestbook feature module
│   │   │   ├── guestbook.controller.ts  REST endpoints (GET, POST)
│   │   │   ├── guestbook.service.ts     Database query logic
│   │   │   └── dto/
│   │   │       └── create-entry.dto.ts  Input validation (class-validator)
│   │   ├── app.module.ts               Root application module
│   │   └── main.ts                     Bootstrap, CORS, validation pipe
│   ├── .env                            Supabase credentials (user-configured)
│   └── package.json
│
└── frontend/                            React single-page application
    ├── src/
    │   ├── components/
    │   │   ├── GuestbookForm.jsx        Name and message input form
    │   │   └── GuestbookList.jsx        Message list display
    │   ├── App.jsx                      Main layout and state management
    │   ├── App.css
    │   ├── index.css                    Tailwind CSS entry point
    │   └── main.jsx                     React DOM root
    ├── vite.config.js                   Vite + Tailwind plugin config
    └── package.json
```

## Database Schema

Run this SQL in the Supabase SQL Editor to create the required table:

```sql
CREATE TABLE guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## API Endpoints

| Method | Endpoint     | Description                          | Request Body             |
|--------|-------------|--------------------------------------|--------------------------|
| GET    | /guestbook  | Fetch all entries (newest first)     | None                     |
| POST   | /guestbook  | Create a new guestbook entry         | `{ "name", "message" }`  |

### POST /guestbook - Request Body

```json
{
  "name": "John Doe",
  "message": "Hello from the guestbook!"
}
```

### Validation Rules

- `name` - Required, must be a non-empty string
- `message` - Required, must be a non-empty string

Invalid requests return a 400 status with validation error details.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm
- A Supabase account and project

### 1. Clone and Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables

#### For Local Development:
Edit `backend/.env` with your Supabase credentials.

#### For Vercel Deployment (IMPORTANT):
You must deploy the **Frontend** and **Backend** as **two separate Vercel projects**.

**1. Backend Config (Root Directory: `backend`)**
- `SUPABASE_URL`: Your Supabase Project URL
- `SUPABASE_KEY`: Your Supabase Anon Key
*(Note: CORS is set to allow all origins, so `FRONTEND_URL` is not required)*

**2. Frontend Config (Root Directory: `frontend`)**
- `VITE_API_URL`: The full URL of your deployed backend + `/guestbook`
  - Example: `https://your-backend-project.vercel.app/guestbook`

### 3. Create the Database Table

Navigate to the SQL Editor in your Supabase dashboard and run the SQL schema shown above.

### 4. Start the Backend

```bash
cd backend
npm run start:dev
```

The NestJS server will start on `http://localhost:3000`.

### 5. Start the Frontend

```bash
cd frontend
npm run dev
```

The Vite dev server will start on `http://localhost:5173`.

### 6. Open the Application

Navigate to `http://localhost:5173` in your browser.

## Architecture

### Backend (NestJS)

- **ConfigModule** - Loads environment variables from `.env`
- **SupabaseModule** (Global) - Provides a shared Supabase client instance
- **GuestbookModule** - Contains the controller and service for guestbook operations
- **ValidationPipe** (Global) - Automatically validates incoming request bodies using DTOs
- **CORS** - Configured to allow requests from the Vite dev server (`localhost:5173`)

### Frontend (React)

- **App.jsx** - Root component, manages entry state and fetches data on mount
- **GuestbookForm.jsx** - Controlled form component, submits via fetch POST
- **GuestbookList.jsx** - Renders entries in a table-style list with alternating row colors

### Data Flow

```
Browser (React) --POST /guestbook--> NestJS Controller --> Service --> Supabase DB
Browser (React) --GET /guestbook-->  NestJS Controller --> Service --> Supabase DB
```

## Key Dependencies

### Backend

| Package               | Purpose                          |
|-----------------------|----------------------------------|
| @nestjs/core          | NestJS framework                 |
| @nestjs/config        | Environment variable management  |
| @supabase/supabase-js | Supabase client SDK              |
| class-validator       | DTO validation decorators        |
| class-transformer     | Object transformation            |

### Frontend

| Package          | Purpose                    |
|------------------|----------------------------|
| react            | UI library                 |
| vite             | Build tool and dev server  |
| tailwindcss      | Utility-first CSS          |
| @tailwindcss/vite| Tailwind Vite integration  |

## License

This project is for educational purposes.
