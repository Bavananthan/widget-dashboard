import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts'; // Added AreaChart and BarChart imports
import { Edit, X } from 'lucide-react';
import { useDashboard } from '../../context/DashboardContext';
import ChartEditForm from '../forms/ChartEditForm'; // Import the ChartEditForm

export default function ChartWidget({ widget }) {
  const { dispatch } = useDashboard();
  const [isEditing, setIsEditing] = useState(false);

  // Handle widget removal
  const handleRemove = () => {
    dispatch({ type: 'REMOVE_WIDGET', payload: widget.id });
  };

  // Handle closing the edit form
  const handleEditClose = (updatedContent) => {
    if (updatedContent) {
      // Update widget with new content from the edit form
      dispatch({
        type: 'UPDATE_WIDGET',
        payload: { ...widget, content: { ...widget.content, ...updatedContent } },
      });
    }
    setIsEditing(false); // Close edit form
  };

  // Render chart based on its type
  const renderChart = () => {
    switch (widget.content.type) {
      case 'bar':
        return (
          <BarChart data={widget.content.data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={widget.content.xAxisKey || 'name'} />
            <YAxis dataKey={widget.content.yAxisKey || 'value'} />
            <Tooltip />
            <Bar dataKey={widget.content.yAxisKey || 'value'} fill="#8884d8" />
          </BarChart>
        );
      case 'area':
        return (
          <AreaChart data={widget.content.data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={widget.content.xAxisKey || 'name'} />
            <YAxis dataKey={widget.content.yAxisKey || 'value'} />
            <Tooltip />
            <Area type="monotone" dataKey={widget.content.yAxisKey || 'value'} fill="#8884d8" />
          </AreaChart>
        );
      default:
        return (
          <LineChart data={widget.content.data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={widget.content.xAxisKey || 'name'} />
            <YAxis dataKey={widget.content.yAxisKey || 'value'} />
            <Tooltip />
            <Line type="monotone" dataKey={widget.content.yAxisKey || 'value'} stroke="#8884d8" />
          </LineChart>
        );
    }
  };

  return (
    <div className="h-full w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow widget-container">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {widget.content.title || 'Chart Widget'}
        </h3>
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
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded  bg-white dark:bg-gray-600 "
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      {isEditing ? (
        <ChartEditForm widget={widget} onClose={handleEditClose} />
      ) : (
        <div className="h-[calc(100%-3rem)]">
          {/* Render the chart based on the type */}
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
