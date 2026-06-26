import { create } from 'zustand';
import {
  getStats,
  getSales,
  getStockByCategory,
  getLowStock,
  type StatsResponse,
  type SalesDataPoint,
  type CategoryDataPoint,
  type LowStockProduct,
} from '../services/dashboard';

interface DashboardState {
  stats: StatsResponse | null;
  salesData: SalesDataPoint[];
  stockByCategory: CategoryDataPoint[];
  lowStock: LowStockProduct[];
  loading: boolean;
  error: string | null;
  fetchAll: () => Promise<void>;
  fetchSales: (range?: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  salesData: [],
  stockByCategory: [],
  lowStock: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const [stats, sales, categories, low] = await Promise.all([
        getStats(),
        getSales(),
        getStockByCategory(),
        getLowStock(),
      ]);
      set({
        stats,
        salesData: sales,
        stockByCategory: categories,
        lowStock: low,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Error al cargar dashboard',
        loading: false,
      });
    }
  },

  fetchSales: async (range?: string) => {
    set({ loading: true, error: null });
    try {
      const sales = await getSales(range);
      set({ salesData: sales, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
