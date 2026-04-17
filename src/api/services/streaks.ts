import { apiRequest } from '../client';
import type { Streak, StreakEntityType } from '../types';

export interface StreakListFilters {
  entity_type?: StreakEntityType;
}

export const getStreaks = (token: string, filters?: StreakListFilters) =>
  apiRequest<Streak[]>('/streaks/', {
    token,
    query: filters ? { ...filters } : undefined,
  });
