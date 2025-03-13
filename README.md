# Gen Blog - A MERN Stack Blog Website

## 📌 Project Overview
Gen Blog is a **MERN stack-based** blogging platform that allows users to create, read, update, and delete (CRUD) blog posts. It features a modern frontend built with **React (Vite + Material UI + CSS)** and a backend powered by **Node.js, Express.js, and MongoDB**.

## 🛠️ Tech Stack
### Frontend:
- React (Vite)
- Material UI
- CSS
- Axios (for API requests)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose for ORM)
- JWT (for authentication)
- Bcrypt (for password hashing)
- gridFs,multer (for image uploads, if applicable)

## 🎯 Features
- **User Authentication** (Signup, Login, JWT-based authentication)
- **CRUD Blog Posts** (Create, Read, Update, Delete blogs)
-
- **Responsive Design** (Mobile & Desktop support)
- 
- **SEO-friendly URLs**

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/rajnish612/MERN-blog-website.git
cd gen-blog
```

### 2️⃣ Backend Setup
```sh
cd backend
npm install
```
#### Configure Environment Variables (`.env` file)
1.Create a `.env` file in the `backend` folder and add:
```
MONGO_URL=your url
JWT_SECRET=your jwt secret
PORT=3000

USER_EMAIL=your email
APP_PASS=your app pass
GOOGLE_CLIENT_ID=your client it
GOOGLE_CLIENT_SECRET=your google client secret
CALLBACK_URL=your callback url
CLIENT_URL=your client ur
```
#### Run Backend Server
```sh
cd server
npm install
nodemon server.js/node server.js
```

### 3️⃣ Frontend Setup
```sh
cd ../frontend
npm install
```
#### Configure Environment Variables (`.env` file)
Create a `.env` file in the `frontend` folder and add:
```

VITE_API_URL=your url

```
#### Run Frontend Server
```sh
npm run dev  # Runs on http://localhost:5173
```

## 🌍 Deployment
- **Frontend:** Vercel / Netlify
- **Backend:** Render / Railway / VPS
- **Database:** MongoDB Atlas



## 🤝 Contributing
Contributions are welcome! Feel free to fork and submit a PR.



---
