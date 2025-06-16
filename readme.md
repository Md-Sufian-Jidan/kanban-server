# 🧠 Kanban Task Manager – Server (Backend)

This is the **Express.js** backend for the Kanban Task Management app. It provides a secure REST API for managing tasks and user authentication using JWT and MongoDB.

---

## 🌐 Live Server

📡 API Base URL:  
`https://your-backend-host.onrender.com/api`

---

## 🧰 Tech Stack

- **Node.js** + **Express 5**
- **MongoDB** + **Mongoose**
- **JWT** – Token-based authentication
- **BcryptJS** – Password hashing
- **CORS** – Cross-origin support
- **dotenv** – Secure environment configs

---

git clone https://github.com/your-username/kanban-server.git
cd kanban-server

npm install

PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/kanban
JWT_SECRET=your_super_secret_key

npm run dev

---

## 📁 Folder Structure

kanban-server/
├── models/           # Mongoose models (User, Task)
├── routes/           # Route handlers (auth, tasks)
├── middleware/       # Auth middleware
├── .env              # Environment config
├── index.js         # Entry point
