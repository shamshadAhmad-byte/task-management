# Task Management Application

A full-stack Task Management Application built with the MERN Stack (MongoDB, Express.js, React.js, Node.js).

## Features

### Core Features
- **User Authentication**
  - User registration with validation
  - User login with JWT token authentication
  - Password hashing using bcrypt
  - Secure token-based authentication system

- **Task Management**
  - Create new tasks
  - View all tasks in a clean dashboard
  - Edit/update existing tasks
  - Delete tasks
  - Mark tasks as completed/incomplete with visual indicators
  - Search tasks by title or description
  - Filter tasks by status (All, Pending, Completed)

- **Task Properties**
  - Title (required)
  - Description (optional)
  - Status (Pending/Completed)
  - Created Date (auto-generated)
  - Due Date (optional)

- **Dashboard Features**
  - Beautiful, intuitive user interface
  - Real-time task updates
  - Task status filtering
  - Search functionality
  - Responsive design for all devices
  - User profile with logout functionality
  - Loading states and error handling

### Bonus Features
- Search tasks by title or description
- Responsive web design (Mobile, Tablet, Desktop)
- Clean code structure with separated concerns
- Proper error handling on both frontend and backend
- Input validation on both sides
- Environment variables for security

## Tech Stack

### Frontend
- **React.js** - UI library with functional components and hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Responsive styling

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing

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
- npm


## API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Task Routes (`/api/tasks`)
- `GET /tasks` - Get all tasks (with optional status filter)
- `GET /tasks/:id` - Get single task
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `GET /tasks/search?query=` - Search tasks

## Usage

### Registration
1. Go to `http://localhost:5173/register`
2. Enter your details (name, email, password)
3. Click "Register"
4. You'll be automatically logged in and redirected to the dashboard

### Login
1. Go to `http://localhost:5173/login`
2. Enter your email and password
3. Click "Login"
4. You'll be redirected to the dashboard

### Creating a Task
1. Click "+ Add New Task" button
2. Fill in the task details:
   - Title (required)
   - Description (optional)
   - Due Date (optional)
3. Click "Create Task"

### Managing Tasks
- **Edit Task**: Click "Edit" button on any task
- **Delete Task**: Click "Delete" button (confirmation required)
- **Toggle Status**: Check the checkbox to mark as completed/pending
- **Filter Tasks**: Use the filter buttons (All, Pending, Completed)
- **Search Tasks**: Use the search bar to find tasks by title or description

## Input Validation

### Frontend Validation
- Email format validation
- Password match validation
- Task title is required
- Form fields validation

### Backend Validation
- Email uniqueness check
- Password hashing
- Task title required check
- User authorization checks

## Security Features

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Private route protection
- **CORS**: Configured to allow only frontend origin
- **Environment Variables**: Secrets stored safely

## Error Handling

- **Backend**: Try-catch blocks with meaningful error messages
- **Frontend**: Error messages displayed to users
- **Loading States**: Loading indicators during API calls
- **Validation Messages**: Clear validation feedback

## Responsive Design

The application is fully responsive and works on:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (320px to 767px)

Tested on Chrome, Firefox, Safari, and Edge browsers.

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://mongo:27017/task-management
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

Run Docker Command 
    step 1: docker-compose down
    
    step 2: docker-compose up -d --build

    frontend-URL: http://localhost:5173


