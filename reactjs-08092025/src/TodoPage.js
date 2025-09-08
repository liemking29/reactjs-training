import React, { useState, useEffect } from 'react';

function Todo({ todo, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex items-center justify-between mb-2 bg-white p-2 rounded shadow">
      {isEditing ? (
        <input
          className="border px-2 py-1 rounded mr-2"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
        />
      ) : (
        <span>{todo.text}</span>
      )}
      <div>
        <button
          className="bg-yellow-300 px-2 py-1 rounded mr-2"
          onClick={handleEdit}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button
          className="bg-red-300 px-2 py-1 rounded"
          onClick={() => onDelete(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function TodoList({ todos, onEdit, onDelete }) {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

function TodoPage() {
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem('todos');
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput('');
  };

  const handleEdit = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-2xl font-bold text-blue-800 mb-4">Todo List</h1>
        <div className="flex mb-4">
          <input
            className="border px-2 py-1 rounded flex-1 mr-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add new todo"
          />
          <button
            className="bg-blue-500 text-white px-4 py-1 rounded"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
        <TodoList todos={todos} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default TodoPage;