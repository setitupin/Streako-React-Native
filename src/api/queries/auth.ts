import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../queryClient';
import { queryKeys } from '../queryKeys';
import { getCurrentProfile, getHealthCheck, login, register } from '../services/auth';
import { useAuthStore } from '../../store/useAuthStore';

export const useHealthCheckQuery = () =>
  useQuery({
    queryKey: queryKeys.dashboard.health,
    queryFn: getHealthCheck,
    staleTime: 5 * 60 * 1000,
  });

export const useCurrentProfileQuery = () => {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => getCurrentProfile(token as string),
    enabled: Boolean(token),
  });
};

export const useLoginMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: login,
    onSuccess: async ({ token }) => {
      queryClient.clear();
      const user = await getCurrentProfile(token);
      setSession({ token, user });
    },
  });
};

export const useRegisterMutation = () => {
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: register,
    onSuccess: ({ token, user }) => {
      queryClient.clear();
      setSession({ token, user });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
