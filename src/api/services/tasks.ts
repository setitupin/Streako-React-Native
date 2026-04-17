import { apiRequest } from '../client';
import type { Task, TaskCategory, TaskPriority, TaskStatus } from '../types';

export interface TaskListFilters {
  category?: number;
  date_from?: string;
  date_to?: string;
  ordering?: string;
  priority?: TaskPriority;
  search?: string;
  status?: TaskStatus;
  tag?: number;
}

export const getTasks = (token: string, filters?: TaskListFilters) =>
  apiRequest<Task[]>('/tasks/', {
    token,
    query: filters ? { ...filters } : undefined,
  });

export const getTaskCategories = (token: string, search?: string) =>
  apiRequest<TaskCategory[]>('/tasks/categories/', {
    token,
    query: { search },
  });
