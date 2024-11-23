import React from 'react';
import { Check, Trash2, Edit2, Calendar, RefreshCw } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';
import { format } from 'date-fns';

const priorityColors = {
  low: 'bg-green-900/30 text-green-200',
  medium: 'bg-yellow-900/30 text-yellow-200',
  high: 'bg-red-900/30 text-red-200',
};

const categoryColors = {
  work: 'bg-purple-900/30 text-purple-200',
  personal: 'bg-blue-900/30 text-blue-200',
  shopping: 'bg-pink-900/30 text-pink-200',
  health: 'bg-teal-900/30 text-teal-200',
  other: 'bg-gray-900/30 text-gray-200',
};

export const TodoList: React.FC = () => {
  const { todos, toggleTodo, deleteTodo, filter } = useTodoStore();

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(filter.search.toLowerCase()) ||
                         todo.description.toLowerCase().includes(filter.search.toLowerCase());
    const matchesStatus = filter.status === 'all' ? true :
                         filter.status === 'completed' ? todo.completed : !todo.completed;
    const matchesPriority = filter.priority === 'all' || todo.priority === filter.priority;
    const matchesCategory = filter.category === 'all' || todo.category === filter.category;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <div
          key={todo.id}
          className={`hextech-card rounded-lg p-4 ${
            todo.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center hextech-button ${
                  todo.completed
                    ? 'bg-blue-500/50 border-blue-400'
                    : 'border-blue-400/50'
                }`}
              >
                {todo.completed && <Check size={12} className="text-blue-100" />}
              </button>
              
              <div className="flex-1">
                <h3 className={`font-semibold ${
                  todo.completed ? 'line-through text-blue-300/50' : 'text-blue-100'
                }`}>
                  {todo.title}
                </h3>
                
                <p className="text-blue-200/70 text-sm mt-1">
                  {todo.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full hextech-button ${priorityColors[todo.priority]}`}>
                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                  </span>
                  
                  <span className={`text-xs px-2 py-1 rounded-full hextech-button ${categoryColors[todo.category]}`}>
                    {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
                  </span>
                  
                  {todo.recurring && (
                    <span className="text-xs px-2 py-1 rounded-full hextech-button bg-indigo-900/30 text-indigo-200 flex items-center gap-1">
                      <RefreshCw size={12} />
                      {todo.recurring.charAt(0).toUpperCase() + todo.recurring.slice(1)}
                    </span>
                  )}
                  
                  <span className="text-xs px-2 py-1 rounded-full hextech-button bg-gray-900/30 text-gray-200 flex items-center gap-1">
                    <Calendar size={12} />
                    {format(new Date(todo.dueDate), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => {/* Edit functionality */}}
                className="p-1 text-blue-300 hover:text-blue-100 hextech-button rounded"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="p-1 text-red-300 hover:text-red-100 hextech-button rounded"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {filteredTodos.length === 0 && (
        <div className="text-center py-8 text-blue-300">
          No tasks found
        </div>
      )}
    </div>
  );
};