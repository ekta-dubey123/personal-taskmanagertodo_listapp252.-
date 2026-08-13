import React from 'react';

const priorityColor = {
  high: 'danger',
  medium: 'warning',
  low: 'secondary',
};

export const TodoItem = ({ todo, onDelete, toggleDone }) => {
  const badgeColor = priorityColor[todo.priority] || 'secondary';

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-2 p-2 border rounded shadow-sm bg-white">
        <div>
          <input
            type="checkbox"
            className="form-check-input me-2"
            checked={todo.done}
            onChange={() => toggleDone(todo)}
          />
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none', color: todo.done ? 'gray' : 'black' }}>
            <strong>{todo.title}</strong>: {todo.desc}
          </span>
          {todo.priority && (
            <span className={`badge bg-${badgeColor} ms-2`}>{todo.priority}</span>
          )}
        </div>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo)}>
          Delete
        </button>
      </div>
    </>
  );
};

