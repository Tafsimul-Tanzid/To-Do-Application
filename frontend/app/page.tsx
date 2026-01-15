'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { todosApi } from '@/lib/api/todos';
import { Todo, TodoStatus, CreateTodoDto } from '@/types/todo';
import TodoForm from '@/components/TodoForm';
import TodoList from '@/components/TodoList';

export default function HomePage() {
  const { isAuthenticated, isLoading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TodoStatus | 'ALL'>('ALL');
  const [error, setError] = useState('');

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // Load todos when auth or filter changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchTodos();
    }
  }, [isAuthenticated, filter]);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const status = filter === 'ALL' ? undefined : filter;
      const data = await todosApi.getTodos(status);
      setTodos(data);
      setError('');
    } catch (err) {
      setError('Failed to load todos. Please try again.');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateTodoDto) => {
    try {
      const newTodo = await todosApi.createTodo(data);
      setTodos([newTodo, ...todos]);
      setError('');
    } catch (err) {
      setError('Failed to create todo. Please try again.');
      console.error('Error creating todo:', err);
      throw err;
    }
  };

  const handleUpdate = async (
    id: string,
    data: { status?: TodoStatus; title?: string; description?: string },
  ) => {
    try {
      const updated = await todosApi.updateTodo(id, data);
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
      setError('');
    } catch (err) {
      setError('Failed to update todo. Please try again.');
      console.error('Error updating todo:', err);
      throw err;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await todosApi.deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete todo. Please try again.');
      console.error('Error deleting todo:', err);
      throw err;
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Todos</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as TodoStatus | 'ALL')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">All</option>
            <option value={TodoStatus.PENDING}>Pending</option>
            <option value={TodoStatus.IN_PROGRESS}>In Progress</option>
            <option value={TodoStatus.DONE}>Done</option>
          </select>
        </div>

        <TodoForm onSubmit={handleCreate} />

        <TodoList
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
