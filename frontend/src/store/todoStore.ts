import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, Priority, Category } from '../types/todo';

interface TodoState {
  todos: Todo[];
  filter: {
    search: string;
    status: 'all' | 'completed' | 'pending';
    priority: Priority | 'all';
    category: Category | 'all';
  };
  darkMode: boolean;
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, todo: Partial<Todo>) => void;
  setFilter: (filter: Partial<TodoState['filter']>) => void;
  toggleDarkMode: () => void;
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      filter: {
        search: '',
        status: 'all',
        priority: 'all',
        category: 'all',
      },
      darkMode: false,
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      updateTodo: (id, updatedTodo) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTodo } : todo
          ),
        })),
      setFilter: (filter) =>
        set((state) => ({
          filter: { ...state.filter, ...filter },
        })),
      toggleDarkMode: () =>
        set((state) => ({
          darkMode: !state.darkMode,
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
);