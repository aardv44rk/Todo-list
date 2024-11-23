export type Priority = 'low' | 'medium' | 'high';
export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'other';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  dueDate: string;
  priority: Priority;
  category: Category;
  recurring?: 'daily' | 'weekly' | 'monthly';
}