import React, { useState } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { EditTodoForm } from "./EditTodoForm";
import { v4 as uuidv4 } from "uuid";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        status: "incompleted", // default status
        isEditing: false,
      },
    ]);
  };

  const deleteTodo = (id) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isEditing: !todo.isEditing }
          : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, task, isEditing: false }
          : todo
      )
    );
  };

  // Toggle status: incompleted -> inprogress -> completed -> incompleted
  const toggleStatus = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          let nextStatus =
            todo.status === "incompleted"
              ? "inprogress"
              : todo.status === "inprogress"
              ? "completed"
              : "incompleted";
          return { ...todo, status: nextStatus };
        }
        return todo;
      })
    );
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`TodoWrapper ${darkMode ? "dark" : ""}`}>
      <div className="header">
        <h1>Let's Plan your Day!</h1>
        <button className="dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <TodoForm addTodo={addTodo} />

      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm
            key={todo.id}
            editTodo={editTask}
            task={todo}
          />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleStatus={toggleStatus}
          />
        )
      )}
    </div>
  );
};
