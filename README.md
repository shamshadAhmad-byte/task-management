# Task Management Application

A full-stack Task Management Application built with the MERN Stack (MongoDB, Express.js, React.js, Node.js).


## Project Structure

```
task-management/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── controller/
│   │   ├── authController.js     # Authentication logic
│   │   └── taskController.js     # Task operations
│   ├── middleware/
│   │   └── auth.js               # JWT verification
│   ├── routes/
│   │   ├── auth.js               # Auth routes
│   │   └── task.js               # Task routes
│   ├── server.js                 # Main server file
│   ├── .env                      # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── PrivateRoute.jsx  # Protected routes
│   │   │   ├── TaskForm.jsx      # Task creation/editing
│   │   │   ├── TaskList.jsx      # Task list display
│   │   │   ├── TaskCard.jsx      # Individual task card
│   │   │   ├── TaskFilter.jsx    # Status filtering
│   │   │   └── TaskSearch.jsx    # Search functionality
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   └── Dashboard.jsx     # Main dashboard
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state management
│   │   ├── utils/
│   │   │   └── api.js            # API instance & calls
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── TaskForm.css
│   │   │   ├── TaskCard.css
│   │   │   ├── TaskList.css
│   │   │   ├── TaskFilter.css
│   │   │   └── TaskSearch.css
│   │   ├── App.jsx               # Main App component
│   │   ├── App.css
│   │   ├── index.css             # Global styles
│   │   └── main.jsx              # Entry point
│   ├── .env                      # Environment variables
│   └── package.json
│
├── .env.example                  # Environment template
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp ../.env.example .env
   ```

4. **Configure .env file**
   ```
   MONGODB_URI=mongodb://localhost:27017/task-management
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   ```

5. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

6. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`



## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/task-management
JWT_SECRET=your_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Scripts

### Backend
```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```
## Docker Setup

   step 1: If you have already install docker run command

   step 2: docker-compose up -d --build

