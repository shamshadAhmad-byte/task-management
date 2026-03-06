import TaskCard from './TaskCard';
import '../styles/TaskList.css';

function TaskList({ tasks, onDelete, onEdit, onToggleStatus }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  );
}

export default TaskList;
