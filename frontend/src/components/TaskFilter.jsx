import '../styles/TaskFilter.css';

function TaskFilter({ status, onStatusChange }) {
  const statuses = ['All', 'Pending', 'Completed'];

  return (
    <div className="task-filter">
      <label>Filter by Status:</label>
      <div className="filter-buttons">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => onStatusChange(s)}
            className={`filter-btn ${status === s ? 'active' : ''}`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilter;
