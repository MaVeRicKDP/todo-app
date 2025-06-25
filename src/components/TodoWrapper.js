import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { Todo } from "./Todo";
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState("all");

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(savedTodos);
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (task) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task,
        status: "incompleted",
        isEditing: false,
      },
    ]);
    setFilter("all"); // show all to reveal new task
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: false } : todo
      )
    );
  };

  const toggleStatus = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          let next =
            todo.status === "incompleted"
              ? "inprogress"
              : todo.status === "inprogress"
              ? "completed"
              : "incompleted";
          return { ...todo, status: next };
        }
        return todo;
      })
    );
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredTodos =
    filter === "all"
      ? todos
      : todos.filter((todo) => todo.status === filter);

  return (
    <div className={`TodoWrapper ${darkMode ? "dark" : ""}`}>
      <button className="dark-toggle" onClick={toggleDarkMode}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      <div className="header">
        <h1>Let's Plan your Day!</h1>
      </div>

      <TodoForm addTodo={addTodo} />

      <div className="filter-buttons">
        {["all", "incompleted", "inprogress", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`${f} ${filter === f ? "active" : ""}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <p style={{ color: "#888", marginTop: "20px" }}>
            No tasks found for "{filter}" status.
          </p>
        ) : (
          filteredTodos.map((todo, index) =>
            todo.isEditing ? (
              <EditTodoForm key={todo.id} task={todo} editTodo={editTask} />
            ) : (
              <Todo
                key={todo.id}
                task={todo}
                index={index} // Pass the index to Todo
                deleteTodo={deleteTodo}
                editTodo={editTodo}
                toggleStatus={toggleStatus}
              />
            )
          )
        )}
      </div>
    </div>
  );
};
