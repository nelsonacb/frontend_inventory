import api from './client';
import type { User } from '../interfaces';

export const login = async (email: string, password: string) => {
  const { data } = await api.post('/auth/token', { email, password });
  return data;
};

export const register = async (userData: any) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get('/auth/me');
  return data;
};

export const refreshToken = async (refresh: string) => {
  const { data } = await api.post('/auth/refresh', { refresh });
  return data;
};
