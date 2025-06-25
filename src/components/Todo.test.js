import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Todo } from './Todo';

const mockTask = {
  id: '1',
  task: 'Test task',
  status: 'incompleted',
  isEditing: false,
};

const mockToggleStatus = jest.fn();
const mockDeleteTodo = jest.fn();
const mockEditTodo = jest.fn();

test('renders task text and status icon', () => {
  render(
    <Todo
      task={mockTask}
      toggleStatus={mockToggleStatus}
      deleteTodo={mockDeleteTodo}
      editTodo={mockEditTodo}
    />
  );

  // Check task text visible
  expect(screen.getByText(/Test task/i)).toBeInTheDocument();

  // Check if status icon (button) is in the document
  const icon = screen.getByTitle(/Mark as next status/i);
  expect(icon).toBeInTheDocument();

  // Simulate clicking status icon
  fireEvent.click(icon);
  expect(mockToggleStatus).toHaveBeenCalledWith('1');
});
