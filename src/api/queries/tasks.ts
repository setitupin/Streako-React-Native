import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { getTaskCategories, getTasks, type TaskListFilters } from '../services/tasks';
import { useAuthStore } from '../../store/useAuthStore';

export const useTasksQuery = (filters?: TaskListFilters) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.tasks.list(filters ? { ...filters } : undefined),
    queryFn: () => getTasks(token as string, filters),
    enabled: Boolean(token),
  });
};

export const useTaskCategoriesQuery = (search?: string) => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: [...queryKeys.tasks.categories, search ?? ''],
    queryFn: () => getTaskCategories(token as string, search),
    enabled: Boolean(token),
  });
};
