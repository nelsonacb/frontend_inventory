import api from './client';

export interface WarehousePayload {
  name: string;
  location?: string;
}

export const getWarehouses = async (page = 1, limit = 10) => {
  const { data } = await api.get('/warehouses', { params: { page, limit } });
  return data;
};

export const createWarehouse = async (payload: WarehousePayload) => {
  const { data } = await api.post('/warehouses', payload);
  return data;
};

export const updateWarehouse = async (
  id: number,
  payload: WarehousePayload,
) => {
  const { data } = await api.put(`/warehouses/${id}`, payload);
  return data;
};

export const deleteWarehouse = async (id: number) => {
  const { data } = await api.delete(`/warehouses/${id}`);
  return data;
};
