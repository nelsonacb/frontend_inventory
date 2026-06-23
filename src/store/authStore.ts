import { create } from 'zustand';
import {
  login as loginApi,
  register as registerApi,
  getMe,
} from '../services/auth';
import type { User } from '../interfaces';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,

  login: async (email, password) => {
    const { access, refresh } = await loginApi(email, password);
    localStorage.setItem('token', access);
    localStorage.setItem('refreshToken', refresh);
    set({ token: access, isAuthenticated: true });
    await get().loadUser();
  },

  register: async (data) => {
    await registerApi(data);
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    set({ user: null, token: null, isAuthenticated: false });
  },

  loadUser: async () => {
    const token = get().token;
    if (!token) return;
    set({ isLoading: true });
    try {
      const user = await getMe();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      set({
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));
