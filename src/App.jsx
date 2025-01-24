import React from 'react';
import { DashboardProvider } from './context/DashboardContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <DashboardProvider>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Dashboard />
        </div>
      </div>
    </DashboardProvider>
  );
}

export default App;