# Complete NextAuth Authentication App

## Project Name
Complete NextAuth Authentication App

## Project Overview
This project is a full-stack authentication system built with a Next.js frontend and a Node.js/Express JWT backend. It demonstrates how to implement:

- User registration and login
- Google social login
- JWT-based authentication
- Protected/private pages
- Role-based access flow
- API integration between frontend and backend

## What I Learned
Through this project, I learned how to:

- Configure NextAuth v5 with credentials and Google providers
- Secure routes using authentication callbacks
- Use JWT tokens for backend authorization
- Connect a frontend app with a separate Express API
- Handle protected routes and session management
- Work with environment variables for secure auth configuration
- Build a clean UI using Tailwind CSS and shadcn/ui components

## What I Used
### Frontend
- Next.js
- React
- NextAuth
- Tailwind CSS
- shadcn/ui
- Axios
- React Hook Form + Zod
- Lucide Icons

### Backend
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT
- bcrypt
- dotenv
- CORS

## Features
- Local email/password registration
- Login with email and password
- Google social login
- Protected private page
- Public page access without login
- JWT-based API authorization
- User data fetching from protected backend endpoint

## Project Structure
```bash
complete-nextauth/          # Frontend app
├── src/app/                 # App routes and pages
├── src/auth.ts              # NextAuth configuration
├── src/components/          # UI components
├── src/actions/            # Auth-related server actions
└── public/                 # Static assets

jwt-authentication-server/  # Backend API
├── src/controllers/        # Route controllers
├── src/middleware/         # Auth middleware
├── src/models/             # Mongoose models
├── src/routes/             # API routes
└── src/app.ts              # Express app setup
```

## Setup Instructions
### 1. Frontend setup
```bash
cd complete-nextauth
npm install
```

Create a `.env.local` file with:
```env
AUTH_SECRET=your_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

Run the frontend:
```bash
npm run dev
```

### 2. Backend setup
```bash
cd ../jwt-authentication-server
npm install
```

Create a `.env` file with:
```env
PORT=5000
DATABASE_URI=mongodb://127.0.0.1:27017/jwt-authentication
JWT_SECRET=your_jwt_secret
```

Run the backend:
```bash
npm run dev
```

## Run URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Notes
This project is a practical example of building a modern authentication flow using Next.js on the frontend and Express + JWT on the backend.
