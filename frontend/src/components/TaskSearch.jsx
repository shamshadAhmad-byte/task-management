import { useState } from 'react';
import '../styles/TaskSearch.css';

function TaskSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className="task-search">
      <input
        type="text"
        placeholder="Search tasks by title or description..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      {query && (
        <button onClick={handleClear} className="btn-clear">
          Clear
        </button>
      )}
    </div>
  );
}

export default TaskSearch;
