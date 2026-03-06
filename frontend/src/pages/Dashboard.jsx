import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { taskAPI } from '../utils/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';
import TaskSearch from '../components/TaskSearch';
import '../styles/Dashboard.css';

const TASKS_PER_PAGE = 5;

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [status, setStatus] = useState('All');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + TASKS_PER_PAGE);

  // Load tasks
  useEffect(() => {
    loadTasks();
  }, [status]);

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await taskAPI.getTasks(status);
      setTasks(response.data.tasks);
      setFilteredTasks(response.data.tasks);
      setCurrentPage(1);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredTasks(tasks);
      setCurrentPage(1);
      return;
    }

    try {
      const response = await taskAPI.searchTasks(query);
      setFilteredTasks(response.data.tasks);
      setCurrentPage(1);
    } catch (err) {
      setError('Search failed');
    }
  };

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleAddTask = async (taskData) => {
    try {
      if (editingTask) {
        await taskAPI.updateTask(editingTask._id, taskData);
      } else {
        await taskAPI.createTask(taskData);
      }
      setShowForm(false);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskAPI.deleteTask(id);
        loadTasks();
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleToggleStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    try {
      await taskAPI.updateTask(task._id, { status: newStatus });
      loadTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Task Management Dashboard</h1>
          <div className="user-info">
            {user && <span>Welcome, {user.name}!</span>}
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-container">
          <div className="controls">
            <button
              onClick={() => {
                setEditingTask(null);
                setShowForm(!showForm);
              }}
              className="btn-primary"
            >
              {showForm ? 'Cancel' : '+ Add New Task'}
            </button>
          </div>

          {error && <div className="error-message">{error}</div>}

          {showForm && (
            <TaskForm
              onSubmit={handleAddTask}
              task={editingTask}
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }}
            />
          )}

          <TaskSearch onSearch={handleSearch} />
          <TaskFilter status={status} onStatusChange={setStatus} />

          {loading ? (
            <div className="loading">Loading tasks...</div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks found. {!searchQuery && 'Create one to get started!'}</p>
            </div>
          ) : (
            <>
              <TaskList
                tasks={paginatedTasks}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
                onToggleStatus={handleToggleStatus}
              />

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="btn-page"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  <div className="page-numbers">
                    {Array.from({ length: totalPages }, (_, index) => {
                      const page = index + 1;
                      return (
                        <button
                          key={page}
                          className={`btn-page-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    className="btn-page"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
