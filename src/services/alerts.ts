import api from './client';

export const getAlerts = async (params?: { isRead?: boolean }) => {
  const { data } = await api.get('/alerts', { params });
  return data;
};
