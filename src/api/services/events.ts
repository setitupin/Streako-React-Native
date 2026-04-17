import { apiRequest } from '../client';
import type { Event, EventKind } from '../types';

export interface EventListFilters {
  date_from?: string;
  date_to?: string;
  kind?: EventKind;
}

export const getEvents = (token: string, filters?: EventListFilters) =>
  apiRequest<Event[]>('/events/', {
    token,
    query: filters ? { ...filters } : undefined,
  });
