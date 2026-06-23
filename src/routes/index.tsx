import { createBrowserRouter } from 'react-router';
import { Layout } from '../components/layout/Layout';
import { Dashboard } from '../pages/Dashboard/index';
import { Products } from '../pages/Products';
import { CategoriesPage } from '../pages/Categories/index';
import { Movements } from '../pages/Movements';
import { Alerts } from '../pages/Alerts/index';
import { Reports } from '../pages/Reports';
import { Scanner } from '../pages/Scanner/index';
import { LoginPage } from '../pages/Auth/login';
import { RegisterPage } from '../pages/Auth/register';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { WarehousePage } from '../pages/Warehouse';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: 'products', element: <Products /> },
          { path: 'categories', element: <CategoriesPage /> },
          { path: 'movements', element: <Movements /> },
          { path: 'alerts', element: <Alerts /> },
          { path: 'reports', element: <Reports /> },
          { path: 'scanner', element: <Scanner /> },
          { path: 'warehouses', element: <WarehousePage /> },
        ],
      },
    ],
  },
]);
