import api from './client';

export interface StatsResponse {
  totalProducts: number;
  totalStockValue: number;
  lowStockCount: number;
  todayMovements: number;
}

export interface SalesDataPoint {
  date: string;
  total: number;
}

export interface CategoryDataPoint {
  category: string;
  value: number;
}

export interface LowStockProduct {
  name: string;
  stock: number;
  threshold: number;
}

export const getStats = async (): Promise<StatsResponse> => {
  const { data } = await api.get('/dashboard/stats');
  return {
    totalProducts: data.total_products ?? 0,
    totalStockValue: data.total_stock_value ?? 0,
    lowStockCount: data.low_stock_count ?? 0,
    todayMovements: data.today_movements ?? 0,
  };
};

export const getSales = async (range?: string): Promise<SalesDataPoint[]> => {
  const params = range ? { range } : {};
  const { data } = await api.get('/dashboard/sales', { params });

  if (data?.chart_data?.labels && Array.isArray(data.chart_data.labels)) {
    return data.chart_data.labels.map((date: string, index: number) => ({
      date,
      total: data.chart_data.values?.[index] ?? 0,
    }));
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
};

export const getStockByCategory = async (): Promise<CategoryDataPoint[]> => {
  const { data } = await api.get('/dashboard/stock-by-category');
  return Array.isArray(data) ? data : [];
};

export const getLowStock = async (): Promise<LowStockProduct[]> => {
  const { data } = await api.get('/dashboard/low-stock');
  return Array.isArray(data) ? data : [];
};
