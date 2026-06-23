import api from '../services/client';
import type { Category, CategoryFormData } from '../interfaces';

export const getCategories = async (page = 1, limit = 10) => {
  const { data } = await api.get('/categories', { params: { page, limit } });
  return data;
};

export const createCategory = async (
  data: CategoryFormData,
): Promise<Category> => {
  const { data: category } = await api.post('/categories', data);
  return category;
};

export const updateCategory = async (
  id: number,
  data: CategoryFormData,
): Promise<Category> => {
  const { data: category } = await api.put(`/categories/${id}`, data);
  return category;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/categories/${id}`);
};
