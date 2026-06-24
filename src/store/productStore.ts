import { create } from 'zustand';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products';
import type { Product, ProductFormData } from '../interfaces';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  search: string;
  categoryFilter: number | null;
  fetchProducts: (
    page?: number,
    limit?: number,
    search?: string,
    categoryId?: number,
  ) => Promise<void>;
  addProduct: (data: ProductFormData) => Promise<void>;
  editProduct: (id: number, data: ProductFormData) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
  setSearch: (search: string) => void;
  setCategoryFilter: (categoryId: number | null) => void;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  search: '',
  categoryFilter: null,

  fetchProducts: async (
    page = 1,
    limit = 10,
    search = '',
    categoryId = undefined,
  ) => {
    set({ loading: true, error: null });
    try {
      const response = await getProducts(
        page,
        limit,
        search,
        categoryId || undefined,
      );
      set({
        products: response.data,
        currentPage: response.meta.page,
        totalPages: response.meta.totalPages,
        totalItems: response.meta.total,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addProduct: async (data) => {
    set({ loading: true, error: null });
    try {
      await createProduct(data);
      const { currentPage, search, categoryFilter, fetchProducts } = get();
      await fetchProducts(currentPage, 10, search, categoryFilter || undefined);
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  editProduct: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateProduct(id, data);
      set((state) => ({
        products: state.products.map((p) =>
          p.id === id ? { ...p, ...data } : p,
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  removeProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  setSearch: (search) => set({ search }),
  setCategoryFilter: (categoryId) => set({ categoryFilter: categoryId }),
}));
