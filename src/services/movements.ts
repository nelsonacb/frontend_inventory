import api from './client';
import type {
  Movement,
  MovementCreatePayload,
  PaginatedResponse,
} from '../interfaces';

export const getMovements = async (
  page = 1,
  limit = 10,
  filters?: Record<string, any>,
): Promise<PaginatedResponse<Movement>> => {
  const params = { page, limit, ...filters };
  const { data } = await api.get('/movements', { params });
  return data;
};

export const createMovement = async (
  payload: MovementCreatePayload,
): Promise<Movement> => {
  const { data } = await api.post('/movements', payload);
  return data;
};
