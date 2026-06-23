import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '../store/authStore';
import { Loader } from './ui/Loader';

export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, loadUser } = useAuthStore();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loadUser();
    }
  }, []);

  if (isLoading) {
    return <Loader title='Cargando...' />;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate
      to='/login'
      replace
    />
  );
};
