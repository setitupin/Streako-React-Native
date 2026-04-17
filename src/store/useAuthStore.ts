import { create } from 'zustand';
import type { AuthUser } from '../api/types';
import { queryClient } from '../api/queryClient';

interface AuthState {
  token: string | null;
  user: AuthUser | null;
  setSession: (session: { token: string; user: AuthUser }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  setSession: ({ token, user }) => set({ token, user }),
  logout: () => {
    queryClient.clear();
    set({ token: null, user: null });
  },
}));
