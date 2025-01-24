import React, { useState } from 'react';
import { Plus, X, Check } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function TodoWidget({ widget }) {
  const { dispatch } = useDashboard();
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
    };
    dispatch({
      type: 'UPDATE_WIDGET',
      payload: {
        ...widget,
        content: {
          items: [...widget.content.items, newItem],
        },
      },
    });
    setNewTodo('');
  };

  const toggleTodo = (todoId) => {
    const updatedItems = widget.content.items.map((item) =>
      item.id === todoId ? { ...item, completed: !item.completed } : item
    );
    dispatch({
      type: 'UPDATE_WIDGET',
      payload: { ...widget, content: { items: updatedItems } },
    });
  };

  const removeTodo = (todoId) => {
    const updatedItems = widget.content.items.filter((item) => item.id !== todoId);
    dispatch({
      type: 'UPDATE_WIDGET',
      payload: { ...widget, content: { items: updatedItems } },
    });
  };

  const handleCancel = () => {
    setNewTodo('');
  };

  return (
    <div className="h-full w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white ">Todo List</h3>
        <button
          onClick={() => dispatch({ type: 'REMOVE_WIDGET', payload: widget.id })}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded bg-white dark:bg-gray-600 "
        >
          <X size={16} />
        </button>
      </div>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
          placeholder="Add new todo..."
        />
        <button
          onClick={addTodo}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
        >
          <Plus size={20} />
        </button>
        {/* <button
          onClick={handleCancel}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button> */}
      </div>
      <div className="h-[calc(100%-7rem)] overflow-auto">
        {widget.content.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-2 border-b dark:border-gray-700"
          >
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleTodo(item.id)}
                className={`p-1 rounded ${
                  item.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <Check size={16} />
              </button>
              <span className={item.completed ? 'line-through' : ''}>
                {item.text}
              </span>
            </div>
            <button
              onClick={() => removeTodo(item.id)}
              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
