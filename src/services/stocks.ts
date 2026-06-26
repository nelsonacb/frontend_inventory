import api from './client';
import type { Stock } from '../interfaces';

export const getStocks = async (): Promise<Stock[]> => {
  const { data } = await api.get('/stocks');
  return data;
};
