# Auth-App (MERN Stack)

A full-stack authentication application built using **MongoDB**, **Express.js**, **React**, and **Node.js** with JWT authentication and secure session handling.  
The app allows users to **sign up**, **log in**, and access protected routes. Deployed using **Vercel**.

---

## Live Demo
[Live Website](https://authentication-jwt-ui.vercel.app/)  

---

## Features
- User Registration & Login
- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- MongoDB Database Integration
- Responsive UI with React + Tailwind CSS
- Environment variable support for sensitive data
- Deployment frontend and backend using Vercel

---

## Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for authentication
- bcrypt for password hashing

**Deployment:**
- Vercel (Frontend, Backend)
- MongoDB Atlas (Database)

---

## Environment Variables

**Backend (.env)**
MONGODB_URI= your-mongodb-connection-string
PORT= 5000
JWT_SECRET= your-jwt-secret

**Frontend (.env)**
REACT_APP_API_URL= your backend api url

---

## Local Development

1.**Clone Repository**
- git clone https://github.com/your-username/your-repo.git

2️.**Install Dependencies**
- cd backend && npm install
- cd ../frontend && npm install
  
3️.**Run Backend**
- cd backend
- npm run start
  
4️.**Run Frontend**
- cd frontend
- npm run dev

---
