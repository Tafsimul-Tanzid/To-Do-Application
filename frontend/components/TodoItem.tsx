'use client';

import { useState } from 'react';
import { Todo, TodoStatus } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, data: { status?: TodoStatus; title?: string; description?: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [isLoading, setIsLoading] = useState(false);

  const getStatusBadgeClass = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case TodoStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800';
      case TodoStatus.DONE:
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const changeStatus = async (newStatus: TodoStatus) => {
    await onUpdate(todo.id, { status: newStatus });
  };

  const deleteTodo = async () => {
    if (confirm('Are you sure you want to delete this todo?')) {
      await onDelete(todo.id);
    }
  };

  const handleEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(true);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!editTitle.trim()) {
      alert('Title is required');
      return;
    }

    setIsLoading(true);
    try {
      await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      {isEditing ? (
        // Edit Mode
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              placeholder="Enter title"
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
              placeholder="Enter description (optional)"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        // View Mode
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{todo.title}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(todo.status)}`}>
                {todo.status}
              </span>
            </div>
            {todo.description && (
              <p className="text-gray-600 mb-3">{todo.description}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleEdit}
                className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-md hover:bg-indigo-200"
              >
                Edit
              </button>
              {todo.status !== TodoStatus.PENDING && (
                <button
                  onClick={() => changeStatus(TodoStatus.PENDING)}
                  className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200"
                >
                  Mark Pending
                </button>
              )}
              {todo.status !== TodoStatus.IN_PROGRESS && (
                <button
                  onClick={() => changeStatus(TodoStatus.IN_PROGRESS)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200"
                >
                  Mark In Progress
                </button>
              )}
              {todo.status !== TodoStatus.DONE && (
                <button
                  onClick={() => changeStatus(TodoStatus.DONE)}
                  className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                >
                  Mark Done
                </button>
              )}
              <button
                onClick={deleteTodo}
                className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded-md hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="mt-2 text-xs text-gray-500 flex gap-4">
        <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
        {todo.updatedAt && new Date(todo.updatedAt).getTime() !== new Date(todo.createdAt).getTime() && (
          <span>Updated: {new Date(todo.updatedAt).toLocaleDateString()}</span>
        )}
      </div>
    </div>
  );
}
