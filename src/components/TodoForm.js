import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) {
      setShowWarning(true);
      return;
    }
    addTodo(value.trim());
    setValue("");
    setShowWarning(false);
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      {/* Wrap input + warning inside vertical container */}
      <div className="input-container">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (showWarning) setShowWarning(false);
          }}
          className={`todo-input ${showWarning ? "input-warning" : ""}`}
          placeholder="What is the task today?"
          aria-invalid={showWarning}
        />
        {showWarning && (
          <div className="warning-text" role="alert" aria-live="assertive">
            ⚠️ <em>Task can't be empty.</em>
          </div>
        )}
      </div>

      <button type="submit" className="TodoBtn">
        Add Task
      </button>
    </form>
  );
};
