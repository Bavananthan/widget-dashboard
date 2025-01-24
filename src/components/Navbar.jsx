import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';

export default function Navbar() {
  const { state, dispatch } = useDashboard();

  return (
    <nav className={`h-16 flex-shrink-0 ${
      state.isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
    } shadow-md z-20`}>
      <div className="h-full flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR' })}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold">Dynamic Dashboard</h1>
        </div>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {state.isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  );
}