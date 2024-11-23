import React from 'react';
import { useTodoStore } from '../store/todoStore';

export const Progress: React.FC = () => {
  const todos = useTodoStore((state) => state.todos);
  
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="hextech-card rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-blue-100">
          Progress
        </span>
        <span className="text-sm font-medium text-blue-300">
          {percentage}%
        </span>
      </div>
      
      <div className="w-full bg-blue-900/30 rounded-full h-2.5">
        <div
          className="bg-blue-500/50 h-2.5 rounded-full transition-all duration-500 relative overflow-hidden"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-[hextech-flow_2s_linear_infinite]" />
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2 text-sm text-blue-300">
        <span>{completed} completed</span>
        <span>{total - completed} remaining</span>
      </div>
    </div>
  );
};