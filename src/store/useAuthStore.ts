import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  signup: (email: string, username: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  login: (username, password) => {
    if (username === 'admin' && password === 'admin') {
      set({ isLoggedIn: true });
      return true;
    }
    return false;
  },
  signup: (email, username, password) => {
    // For dev purpose, just accept the signup and log them in
    if (email && username && password) {
      set({ isLoggedIn: true });
      return true;
    }
    return false;
  },
  logout: () => set({ isLoggedIn: false }),
}));
