import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Priority, Category } from '../types/todo';
import { useTodoStore } from '../store/todoStore';

export const TodoForm: React.FC = () => {
  const addTodo = useTodoStore((state) => state.addTodo);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<Category>('personal');
  const [recurring, setRecurring] = useState<'daily' | 'weekly' | 'monthly' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo({
      title,
      description,
      completed: false,
      dueDate: dueDate || new Date().toISOString(),
      priority,
      category,
      ...(recurring && { recurring }),
    });

    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
    setCategory('personal');
    setRecurring('');
  };

  return (
    <form onSubmit={handleSubmit} className="hextech-card p-6 rounded-lg">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full px-4 py-2 rounded-lg hextech-input text-blue-100 placeholder-blue-300/50"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="w-full px-4 py-2 rounded-lg hextech-input text-blue-100"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full px-4 py-2 rounded-lg hextech-input text-blue-100"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-2 rounded-lg hextech-input text-blue-100"
        />
        
        <select
          value={recurring}
          onChange={(e) => setRecurring(e.target.value as 'daily' | 'weekly' | 'monthly' | '')}
          className="w-full px-4 py-2 rounded-lg hextech-input text-blue-100"
        >
          <option value="">Not Recurring</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a description..."
        className="w-full px-4 py-2 rounded-lg hextech-input text-blue-100 placeholder-blue-300/50 mt-4"
        rows={3}
      />

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 hextech-button bg-blue-900/30 text-blue-100 font-semibold py-2 px-4 rounded-lg mt-4"
      >
        <PlusCircle size={20} />
        Add Task
      </button>
    </form>
  );
};