import React, { useState, useEffect } from 'react';

export default function ChartEditForm({ widget, onClose }) {
  const [title, setTitle] = useState(widget.content.title || '');
  const [type, setType] = useState(widget.content.type || 'line');
  const [data, setData] = useState(widget.content.data || []);
  const [xAxisKey, setXAxisKey] = useState(widget.content.xAxisKey || 'name');
  const [yAxisKey, setYAxisKey] = useState(widget.content.yAxisKey || 'value');
  const [newPoint, setNewPoint] = useState({ [xAxisKey]: '', [yAxisKey]: '' });

  useEffect(() => {
    // Update newPoint when xAxisKey or yAxisKey changes
    setNewPoint({ [xAxisKey]: '', [yAxisKey]: '' });
  }, [xAxisKey, yAxisKey]);

  const handleSave = () => {
    onClose({ title, type, data, xAxisKey, yAxisKey });
  };

  const handleAddPoint = () => {
    if (newPoint[xAxisKey] && newPoint[yAxisKey]) {
      setData([...data, { ...newPoint }]);
      setNewPoint({ [xAxisKey]: '', [yAxisKey]: '' });
    } else {
      alert('Please fill in both X and Y values before adding.');
    }
  };

  const handleRemovePoint = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-700 rounded-lg overflow-auto max-h-full">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Edit Chart</h3>

      {/* Chart Title */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 text-white"
        />
      </div>

      {/* Chart Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Chart Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded dark:bg-gray-700 text-white"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
          <option value="area">Area Chart</option>
        </select>
      </div>

      {/* Axis Keys */}
      <div className="flex gap-4 mb-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-2">X-Axis Key</label>
          <input
            type="text"
            value={xAxisKey}
            onChange={(e) => setXAxisKey(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 text-white"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-2">Y-Axis Key</label>
          <input
            type="text"
            value={yAxisKey}
            onChange={(e) => setYAxisKey(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 text-white"
          />
        </div>
      </div>

      {/* Data Points Display */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Data Points</label>
        <ul className="mb-2 max-h-40 overflow-y-auto">
          {data.map((point, index) => (
            <li key={index} className="flex justify-between items-center mb-1 text-sm">
              <span>
                {xAxisKey}: {point[xAxisKey]}, {yAxisKey}: {point[yAxisKey]}
              </span>
              <button
                onClick={() => handleRemovePoint(index)}
                className="text-red-500 hover:underline dark:bg-gray-700 "
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add New Data Point */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={newPoint[xAxisKey]}
          onChange={(e) => setNewPoint({ ...newPoint, [xAxisKey]: e.target.value })}
          placeholder={`X-Axis (${xAxisKey}) value`}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <input
          type="number"
          value={newPoint[yAxisKey]}
          onChange={(e) => setNewPoint({ ...newPoint, [yAxisKey]: Number(e.target.value) })}
          placeholder={`Y-Axis (${yAxisKey}) value`}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <button
          onClick={handleAddPoint}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="flex justify-end mb-4">
        <button
          className="mr-2 px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300"
          onClick={() => onClose()}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
