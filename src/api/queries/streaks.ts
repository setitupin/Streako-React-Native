import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { getStreaks, type StreakListFilters } from '../services/streaks';
import { useAuthStore } from '../../store/useAuthStore';

export const useStreaksQuery = (filters?: StreakListFilters) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.streaks.list(filters ? { ...filters } : undefined),
    queryFn: () => getStreaks(token as string, filters),
    enabled: Boolean(token),
  });
};
