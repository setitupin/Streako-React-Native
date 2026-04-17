import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { getHabits, type HabitListFilters } from '../services/habits';
import { useAuthStore } from '../../store/useAuthStore';

export const useHabitsQuery = (filters?: HabitListFilters) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.habits.list(filters ? { ...filters } : undefined),
    queryFn: () => getHabits(token as string, filters),
    enabled: Boolean(token),
  });
};
