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

// export interface StockMovement {
//   id: number;
//   stockId: number;
//   quantityChange: number;
//   reason: 'purchase' | 'sale' | 'adjustment' | 'return' | 'transfer';
//   notes?: string;
//   date: string;
//   createdBy?: number;
//   user?: User;
//   stock?: {
//     product: Product & { total_stock?: number };
//     warehouse: Warehouse;
//   };
// }

// export interface MovementFormData {
//   productId: number;
//   warehouseId: number;
//   quantityChange: number;
//   reason: string;
//   notes?: string;
//   date: string;
// }

// export interface Stock {
//   id: number;
//   productId: number;
//   warehouseId: number;
//   quantity: number;
// }

export type MovementReason =
  | 'purchase'
  | 'sale'
  | 'adjustment'
  | 'return'
  | 'transfer';

export interface Stock {
  id: number;
  productId: number;
  warehouseId: number;
  quantity: number;
  product: Product;
  warehouse: Warehouse;
}

export interface Movement {
  id: number;
  stockId: number;
  quantityChange: number;
  reason: MovementReason;
  notes: string | null;
  date: string;
  createdBy: number;
  stock: Stock;
  user: User;
}

export interface MovementCreatePayload {
  stockId: number;
  quantityChange: number;
  reason: MovementReason;
  notes?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
