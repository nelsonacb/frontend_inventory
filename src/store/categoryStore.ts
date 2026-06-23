import { create } from 'zustand';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/categories';
import type { Category, CategoryFormData } from '../interfaces';

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  fetchCategories: (page?: number, limit?: number) => Promise<void>;
  addCategory: (data: CategoryFormData) => Promise<void>;
  editCategory: (id: number, data: CategoryFormData) => Promise<void>;
  removeCategory: (id: number) => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  fetchCategories: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await getCategories(page, limit);
      set({
        categories: response.data,
        currentPage: response.meta.page,
        totalPages: response.meta.totalPages,
        totalItems: response.meta.total,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addCategory: async (data: CategoryFormData) => {
    set({ loading: true, error: null });
    try {
      await createCategory(data);
      const { currentPage, fetchCategories } = get();
      await fetchCategories(currentPage);
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  editCategory: async (id: number, data: CategoryFormData) => {
    set({ loading: true, error: null });
    try {
      const updated = await updateCategory(id, data);
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? updated : cat,
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  removeCategory: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await deleteCategory(id);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
