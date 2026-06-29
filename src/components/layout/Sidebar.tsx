import { NavLink } from 'react-router';
import {
  FiHome,
  FiPackage,
  FiTag,
  FiRefreshCw,
  FiBell,
  FiBarChart2,
  FiCamera,
  FiLogOut,
  FiGrid,
  FiX,
} from 'react-icons/fi';
import { useAuthStore } from '../../store/authStore';
import { useAlertStore } from '../../store/alertStore';
import { useUIStore } from '../../store/uiStore';
import { useEffect } from 'react';

export const Sidebar = () => {
  const { logout } = useAuthStore();
  const { unreadCount, fetchUnreadCount } = useAlertStore();
  const { sidebarOpen, closeSidebar } = useUIStore();

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: <FiHome /> },
    { path: '/products', label: 'Productos', icon: <FiPackage /> },
    { path: '/categories', label: 'Categorías', icon: <FiTag /> },
    { path: '/warehouses', label: 'Almacenes', icon: <FiGrid /> },
    { path: '/movements', label: 'Movimientos', icon: <FiRefreshCw /> },
    { path: '/alerts', label: 'Alertas', icon: <FiBell />, badge: unreadCount },
    { path: '/reports', label: 'Reportes', icon: <FiBarChart2 /> },
    { path: '/scanner', label: 'Escáner QR', icon: <FiCamera /> },
  ];

  return (
    <>
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/50 lg:hidden'
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-gray-800 text-white flex flex-col
          transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Encabezado con botón cerrar en móvil */}
        <div className='flex items-center justify-between p-4 border-b border-gray-700'>
          <div className='text-2xl font-bold'>Inventario</div>
          <button
            className='lg:hidden text-gray-300 hover:text-white'
            onClick={closeSidebar}
            aria-label='Cerrar menú'
          >
            <FiX size={24} />
          </button>
        </div>

        <nav className='flex-1 p-4 space-y-2 overflow-y-auto'>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                // Cerrar sidebar al hacer clic en un enlace (solo en móvil)
                if (window.innerWidth < 1024) closeSidebar();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              <span className='text-xl'>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className='ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className='p-4 border-t border-gray-700'>
          <button
            onClick={logout}
            className='flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded transition-colors'
          >
            <FiLogOut className='text-xl' />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};
