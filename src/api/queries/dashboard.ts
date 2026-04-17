import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { getDashboardSummary } from '../services/dashboard';
import { useAuthStore } from '../../store/useAuthStore';

export const useDashboardSummaryQuery = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.dashboard.summary,
    queryFn: () => getDashboardSummary(token as string),
    enabled: Boolean(token),
  });
};
