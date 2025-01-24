import React from 'react';
import { Edit, X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';

export default function ImageWidget({ widget }) {
  const { dispatch } = useDashboard();

  const handleEdit = () => {
    const newUrl = prompt('Enter new image URL:', widget.content.url);
    if (newUrl) {
      dispatch({
        type: 'UPDATE_WIDGET',
        payload: {
          ...widget,
          content: { ...widget.content, url: newUrl },
        },
      });
    }
  };

  const handleCancel = () => {
    // No changes to the image, so nothing is done
  };

  return (
    <div className="h-full w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Image Widget</h3>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded  bg-white dark:bg-gray-600"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => dispatch({ type: 'REMOVE_WIDGET', payload: widget.id })}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded  bg-white dark:bg-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="h-[calc(100%-3rem)] overflow-hidden">
        <img
          src={widget.content.url}
          alt={widget.content.alt}
          className="w-full h-full object-cover rounded"
        />
      </div>
    </div>
  );
}
