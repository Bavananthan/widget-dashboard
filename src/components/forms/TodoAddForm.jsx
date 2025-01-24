import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

export default function TodoAddForm({ onClose }) {
  const { dispatch } = useDashboard();
  const [newTodo, setNewTodo] = useState('');

  const handleSave = () => {
    if (!newTodo.trim()) return;

    const newWidget = {
      id: Date.now().toString(),
      type: 'todo',
      content: {
        items: [
          { id: Date.now().toString(), text: newTodo, completed: false },
        ],
      },
    };

    dispatch({ type: 'ADD_WIDGET', payload: newWidget });
    setNewTodo(''); // Clear input after saving
    onClose(); // Close the form
  };

  const handleCancel = () => {
    setNewTodo(''); // Clear input
    onClose(); // Close the form
  };

  return (
    <div
      className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box', // Ensures padding fits within dimensions
      }}
    >
      <h3 className="text-lg font-semibold mb-4">Add Todo Widget</h3>

      {/* Input Field */}
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSave()}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 flex-grow"
        placeholder="Enter a todo item"
        style={{
          resize: 'none', // Prevent input resizing
          overflow: 'hidden', // Prevent overflow
        }}
      />

      {/* Buttons */}
      <div className="flex justify-end mt-4 space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          style={{
            flexShrink: 0, // Prevent shrinking in flexbox
          }}
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          style={{
            flexShrink: 0, // Prevent shrinking in flexbox
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
