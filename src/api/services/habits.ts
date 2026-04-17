import { apiRequest } from '../client';
import type { Habit } from '../types';

export interface HabitListFilters {
  is_active?: boolean;
}

export const getHabits = (token: string, filters?: HabitListFilters) =>
  apiRequest<Habit[]>('/habits/', {
    token,
    query: filters ? { ...filters } : undefined,
  });
