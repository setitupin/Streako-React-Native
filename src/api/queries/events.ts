import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { getEvents, type EventListFilters } from '../services/events';
import { useAuthStore } from '../../store/useAuthStore';

export const useEventsQuery = (filters?: EventListFilters) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.events.list(filters ? { ...filters } : undefined),
    queryFn: () => getEvents(token as string, filters),
    enabled: Boolean(token),
  });
};
