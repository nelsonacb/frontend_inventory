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
