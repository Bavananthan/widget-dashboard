import React, { useState } from 'react';

export default function TextAddForm({ onClose, onSave, initialText = '' }) {
  const [text, setText] = useState(initialText);

  const handleSave = () => {
    if (!text.trim()) return; // Prevent saving empty text
    onSave(text); // Pass the updated text to the parent
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
        boxSizing: 'border-box',
      }}
    >
      {/* Textarea */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 flex-grow text-white"
        placeholder="Enter text for the widget"
        style={{
          resize: 'none',
          overflow: 'auto',
        }}
      />

      {/* Buttons */}
      <div className="flex space-x-2 mt-4 mb-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
