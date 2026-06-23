import { create } from 'zustand';
import * as warehouseApi from '../services/warehouses';
import type { Warehouse } from '../interfaces';

interface WarehouseState {
  warehouses: Warehouse[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  fetchWarehouses: (page?: number, limit?: number) => Promise<void>;
  addWarehouse: (data: { name: string; location?: string }) => Promise<void>;
  editWarehouse: (
    id: number,
    data: { name: string; location?: string },
  ) => Promise<void>;
  removeWarehouse: (id: number) => Promise<void>;
}

export const useWarehouseStore = create<WarehouseState>((set, get) => ({
  warehouses: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  fetchWarehouses: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const response = await warehouseApi.getWarehouses(page, limit);
      set({
        warehouses: response.data,
        currentPage: response.meta.page,
        totalPages: response.meta.totalPages,
        totalItems: response.meta.total,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addWarehouse: async (data: { name: string; location?: string }) => {
    set({ loading: true, error: null });
    try {
      await warehouseApi.createWarehouse(data);
      // Refetch current page to keep consistency
      const { currentPage, fetchWarehouses } = get();
      await fetchWarehouses(currentPage);
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  editWarehouse: async (
    id: number,
    data: { name: string; location?: string },
  ) => {
    set({ loading: true, error: null });
    try {
      const updated = await warehouseApi.updateWarehouse(id, data);
      set((state) => ({
        warehouses: state.warehouses.map((w) =>
          w.id === id ? { ...w, ...updated } : w,
        ),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  removeWarehouse: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await warehouseApi.deleteWarehouse(id);
      set((state) => ({
        warehouses: state.warehouses.filter((w) => w.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
