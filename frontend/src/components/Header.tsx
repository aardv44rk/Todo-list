import React from 'react';
import { Moon, Sun, CheckSquare } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

export const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTodoStore();
  
  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <CheckSquare size={32} className="text-blue-400" />
        <h1 className="text-2xl font-bold text-blue-100">TaskMaster</h1>
      </div>
      
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-lg hextech-button text-blue-300 hover:text-blue-100"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
};