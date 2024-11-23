import React from 'react';
import { Search } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

export const TodoFilters: React.FC = () => {
  const { filter, setFilter } = useTodoStore();

  return (
    <div className="hextech-card rounded-lg p-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
        <input
          type="text"
          value={filter.search}
          onChange={(e) => setFilter({ search: e.target.value })}
          placeholder="Search tasks..."
          className="w-full pl-10 pr-4 py-2 rounded-lg hextech-input text-blue-100 placeholder-blue-300/50"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <select
          value={filter.status}
          onChange={(e) => setFilter({ status: e.target.value as 'all' | 'completed' | 'pending' })}
          className="px-4 py-2 rounded-lg hextech-input text-blue-100"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select
          value={filter.priority}
          onChange={(e) => setFilter({ priority: e.target.value as 'all' | 'low' | 'medium' | 'high' })}
          className="px-4 py-2 rounded-lg hextech-input text-blue-100"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select
          value={filter.category}
          onChange={(e) => setFilter({ category: e.target.value as 'all' | 'work' | 'personal' | 'shopping' | 'health' | 'other' })}
          className="px-4 py-2 rounded-lg hextech-input text-blue-100"
        >
          <option value="all">All Categories</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  );
};