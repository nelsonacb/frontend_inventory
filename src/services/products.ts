import api from './client';
import type { ProductFormData } from '../interfaces';

export const getProducts = async (
  page = 1,
  limit = 10,
  search = '',
  categoryId?: number,
) => {
  const { data } = await api.get('/products', {
    params: { page, limit, search, category: categoryId },
  });
  return data;
};

export const createProduct = async (payload: ProductFormData) => {
  const { data } = await api.post('/products', payload);
  return data;
};

export const updateProduct = async (id: number, payload: ProductFormData) => {
  const { data } = await api.put(`/products/${id}`, payload);
  return data;
};

export const deleteProduct = async (id: number) => {
  await api.delete(`/products/${id}`);
};

export const getProductById = async (id: number) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const lookupProductByBarcode = async (barcode: string) => {
  const { data } = await api.get('/products/lookup/by-barcode', {
    params: { barcode },
  });
  return data;
};
