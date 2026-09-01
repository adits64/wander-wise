# WanderWise

WanderWise is a full-stack trip management and travel planning web application that helps users organize trips, manage itineraries, track baggage, collaborate with other travelers, and manage trip-related information from a centralized dashboard.

## 🚀 Features

* User registration and authentication
* JWT-based authentication
* Protected routes
* Trip creation and management
* Trip editing and deletion
* Trip collaboration and invitations
* Accept trip invitations
* Itinerary management
* Baggage management
* Trip details and dashboard
* Role-based access control
* Responsive user interface
* Email functionality for invitations
* Form validation
* RESTful API architecture

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript (ES6+)
* Vite
* Tailwind CSS
* Shadcn/UI
* React Router
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Express Validator
* Nodemailer

### Tools

* Git
* GitHub
* VS Code
* REST Client

## 📁 Project Structure

```text
wander-wise/
│
├── backend/
│   ├── config/
│   ├── errors/
│   ├── handlers/
│   ├── middlewares/
│   ├── models/
│   ├── services/
│   ├── templates/
│   ├── utils/
│   ├── validators/
│   ├── index.js
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── layouts/
    │   ├── pages/
    │   └── utils/
    ├── package.json
    └── vite.config.js
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone git@github.com:adits64/wander-wise.git
cd wander-wise
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder and configure the required environment variables.

Then start the backend:

```bash
npm run dev
```

### 3. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
```

Create a `.env` file based on the provided environment configuration.

Then start the frontend:

```bash
npm run dev
```

## 🔐 Environment Variables

Environment variables are intentionally excluded from this repository for security.

Do not commit credentials, database connection strings, JWT secrets, email credentials, or other sensitive information.

## 📌 Project Purpose

This project was developed to strengthen practical full-stack development skills by implementing authentication, authorization, REST APIs, database relationships, frontend state management, form handling, and real-world application workflows.

## 👨‍💻 Author

**Aditya Pratap Singh**

* GitHub: https://github.com/adits64

## 📄 License

This project is for educational and portfolio purposes.
