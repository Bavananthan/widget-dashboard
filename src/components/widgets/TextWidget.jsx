import React, { useState } from 'react';
import { Edit, X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import TextAddForm from '../forms/TextAddForm'; // Import the form

export default function TextWidget({ widget }) {
  const { dispatch } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedText) => {
    dispatch({
      type: 'UPDATE_WIDGET',
      payload: { ...widget, content: { text: updatedText } },
    });
    setIsEditing(false);
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_WIDGET', payload: widget.id });
  };

  return (
    <div className="h-full w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Text Widget</h3>
        <div className="flex space-x-2">
          {/* Edit Button */}
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded  bg-white dark:bg-gray-600"
          >
            <Edit size={16} />
          </button>
          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded bg-white dark:bg-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content or Editing Form */}
      {isEditing ? (
        <TextAddForm
          onClose={() => setIsEditing(false)} // Close form when canceled
          initialText={widget.content.text} // Pass the current text as the initial value
          onSave={handleSave} // Save updated text
        />
      ) : (
        <div className="h-[calc(100%-3rem)] overflow-auto text-white">{widget.content.text}</div>
      )}
    </div>
  );
}
