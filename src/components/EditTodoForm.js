import React, { useState } from "react";

export const EditTodoForm = ({ editTodo, task }) => {
  const [value, setValue] = useState(task.task);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      editTodo(value.trim(), task.id);
      setError("");
    } else {
      setError("Task cannot be blank.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm" noValidate>
  <input
    type="text"
    value={value}
    onChange={(e) => {
      setValue(e.target.value);
      if (error) setError("");
    }}
    className={`todo-input ${error ? "input-warning" : ""}`}
    placeholder="Update task"
  />

  {error && (
    <p className="warning-text">
      <span role="img" aria-label="warning" className="warning-icon">
        ⚠️
      </span>
      {error}
    </p>
  )}

  <button type="submit" className="TodoBtn">
    Update Task
  </button>
</form>

  );
};
