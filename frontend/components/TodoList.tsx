'use client';

import { Todo, TodoStatus } from '@/types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, data: { status?: TodoStatus; title?: string; description?: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export default function TodoList({ todos, onUpdate, onDelete, isLoading }: TodoListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading todos...</p>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No todos found. Create your first todo!</p>
      </div>
    );
  }

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
