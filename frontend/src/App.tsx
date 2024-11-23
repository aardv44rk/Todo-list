import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { TodoForm } from './components/TodoForm';
import { TodoFilters } from './components/TodoFilters';
import { TodoList } from './components/TodoList';
import { Progress } from './components/Progress';
import { useTodoStore } from './store/todoStore';

function App() {
  const darkMode = useTodoStore((state) => state.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen hextech-pattern relative">
      <div className="hextech-lines" />
      <div className="hextech-glow absolute top-1/4 left-1/4" />
      <div className="hextech-glow absolute bottom-1/4 right-1/4" />
      <div className="hextech-glow absolute top-1/2 right-1/3" />
      <div className="container mx-auto px-4 py-8 max-w-4xl relative">
        <Header />
        <Progress />
        <div className="space-y-6">
          <TodoForm />
          <TodoFilters />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default App;