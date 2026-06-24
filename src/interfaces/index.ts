export interface User {
  id: number;
  email: string;
  name?: string;
  isActive: boolean;
  isStaff: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NavItem {
  path: string;
  label: string;
  icon?: React.ReactNode;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export type CategoryFormData = Omit<Category, 'id'>;

export interface Warehouse {
  id: number;
  name: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Stock {
  id: number;
  productId: number;
  warehouseId: number;
  quantity: number;
  warehouse: Warehouse;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  barcode?: string | null;
  categoryId: number;
  price: number;
  image?: string | null;
  threshold: number;
  description?: string | null;
  qrCode?: string | null;
  createdAt: string;
  updatedAt: string;
  category?: Category;
  stocks?: Stock[];
  total_stock?: number;
}

export interface ProductFormData {
  name: string;
  sku: string;
  barcode?: string;
  categoryId: number;
  price: number;
  image?: string;
  threshold: number;
  description?: string;
  initialStock?: number;
  warehouseId?: number;
}
