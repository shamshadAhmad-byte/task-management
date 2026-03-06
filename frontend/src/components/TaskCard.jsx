import '../styles/TaskCard.css';

function TaskCard({ task, onDelete, onEdit, onToggleStatus }) {
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status === 'Pending';

  return (
    <div className={`task-card ${task.status.toLowerCase()} ${isOverdue ? 'overdue' : ''}`}>
      <div className="task-header">
        <div className="task-title-section">
          <input
            type="checkbox"
            checked={task.status === 'Completed'}
            onChange={() => onToggleStatus(task)}
            className="task-checkbox"
          />
          <h3 className="task-title">{task.title}</h3>
        </div>
        <span className={`task-status ${task.status.toLowerCase()}`}>
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <div className="meta-item">
          <span className="label">Created:</span>
          <span className="value">{formatDate(task.createdAt)}</span>
        </div>
        {task.dueDate && (
          <div className="meta-item">
            <span className="label">Due:</span>
            <span className={`value ${isOverdue ? 'overdue-text' : ''}`}>
              {formatDate(task.dueDate)} {isOverdue && '(Overdue)'}
            </span>
          </div>
        )}
      </div>

      <div className="task-actions">
        <button
          onClick={() => onEdit(task)}
          className="btn-edit"
          title="Edit task"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="btn-delete"
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
