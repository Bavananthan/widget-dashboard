// ImageAddForm.js
import React, { useState } from 'react';
import { useDashboard } from '../../context/DashboardContext';

export default function ImageAddForm({ onClose }) {
  const { dispatch } = useDashboard();
  const [imageUrl, setImageUrl] = useState('');
  const [altText, setAltText] = useState('');

  const handleSave = () => {
    if (!imageUrl.trim() || !altText.trim()) return;

    const newWidget = {
      id: Date.now().toString(),
      type: 'image',
      content: { url: imageUrl, alt: altText },
    };

    dispatch({ type: 'ADD_WIDGET', payload: newWidget });
    setImageUrl(''); // Clear the input fields
    setAltText('');
    onClose(); // Close the form
  };

  const handleCancel = () => {
    setImageUrl(''); // Clear the input fields
    setAltText('');
    onClose(); // Close the form
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Add Image Widget</h3>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 mb-4"
        placeholder="Enter Image URL"
      />
      <input
        type="text"
        value={altText}
        onChange={(e) => setAltText(e.target.value)}
        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 mb-4"
        placeholder="Enter Alt Text"
      />
      <div className="flex space-x-4">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
