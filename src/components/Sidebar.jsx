import React from 'react';
import { BarChart, Type, ListTodo, Image } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Sidebar() {
  const { state, dispatch } = useDashboard();

  const addWidget = (type) => {
    const newWidget = {
      id: Date.now().toString(),
      type,
      content: getDefaultContent(type),
    };
    dispatch({ type: 'ADD_WIDGET', payload: newWidget });
  };

  const getDefaultContent = (type) => {
    switch (type) {
      case 'chart':
        return {
          title: 'Chart Widget',
          type: 'line',
          data: [
            { name: 'Jan', value: 400 },
            { name: 'Feb', value: 300 },
            { name: 'Mar', value: 600 },
            { name: 'Apr', value: 800 },
          ],
          xAxisKey: 'name',
          yAxisKey: 'value',
        };
      case 'text':
        return { text: 'Click to edit this text' };
      case 'todo':
        return { items: [] };
      case 'image':
        return {
          url: 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?w=500&h=300&fit=crop',
          alt: 'Dashboard Image',
        };
      default:
        return {};
    }
  };

  return (
    <aside 
      className={`${state.isSidebarOpen ? 'w-64' : 'w-16'} h-full transition-all duration-300 ease-in-out ${
        state.isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      } shadow-lg`}
    >
      <div className="p-2 h-full overflow-y-auto">
        <div className="space-y-2">
          {/* Add Chart Widget Button */}
          <button
            onClick={() => addWidget('chart')}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Add Chart Widget"
          >
            <BarChart className="text-blue-500" size={20} />
            <span className={`ml-3 ${state.isSidebarOpen ? 'block' : 'hidden'}`}>
              Chart Widget
            </span>
          </button>

          {/* Add Text Widget Button */}
          <button
            onClick={() => addWidget('text')}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Add Text Widget"
          >
            <Type className="text-green-500" size={20} />
            <span className={`ml-3 ${state.isSidebarOpen ? 'block' : 'hidden'}`}>
              Text Widget
            </span>
          </button>

          {/* Add Todo Widget Button */}
          <button
            onClick={() => addWidget('todo')}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Add Todo Widget"
          >
            <ListTodo className="text-purple-500" size={20} />
            <span className={`ml-3 ${state.isSidebarOpen ? 'block' : 'hidden'}`}>
              Todo Widget
            </span>
          </button>

          {/* Add Image Widget Button */}
          <button
            onClick={() => addWidget('image')}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Add Image Widget"
          >
            <Image className="text-red-500" size={20} />
            <span className={`ml-3 ${state.isSidebarOpen ? 'block' : 'hidden'}`}>
              Image Widget
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}
