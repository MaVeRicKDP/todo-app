import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle, faClock } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({ task, deleteTodo, editTodo, toggleStatus, index }) => {
  // icon based on status
  const statusIcon = () => {
    switch (task.status) {
      case "completed":
        return faCheckCircle
      case "inprogress":
        return faClock
      case "incompleted":
      default:
        return faTimesCircle
    }
  }

  return (
    <div className={`Todo ${task.status}`}>
      <FontAwesomeIcon
        icon={statusIcon()}
        className="status-icon"
        title={`Mark as next status`}
        onClick={() => toggleStatus(task.id)}
        style={{ cursor: "pointer", marginRight: "10px" }}
      />
      {/* Show number prefix here */}
      <p>{`Task ${index + 1}: ${task.task}`}</p>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          title="Edit task"
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          title="Delete task"
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  )
}
