import { apiClient } from './client';
import { Todo, TodoStatus, CreateTodoDto, UpdateTodoDto } from '@/types/todo';

export const todosApi = {
  getTodos: async (status?: TodoStatus): Promise<Todo[]> => {
    const params = status ? { status } : {};
    const response = await apiClient.get<Todo[]>('/todos', { params });
    return response.data;
  },

  getTodoById: async (id: string): Promise<Todo> => {
    const response = await apiClient.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  createTodo: async (data: CreateTodoDto): Promise<Todo> => {
    const response = await apiClient.post<Todo>('/todos', data);
    return response.data;
  },

  updateTodo: async (id: string, data: UpdateTodoDto): Promise<Todo> => {
    const response = await apiClient.put<Todo>(`/todos/${id}`, data);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },
};
