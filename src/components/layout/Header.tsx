import { useAuthStore } from '../../store/authStore';
import { FiUser, FiBell, FiMenu } from 'react-icons/fi';
import { useAlertStore } from '../../store/alertStore';
import { useState } from 'react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user } = useAuthStore();
  const { unreadCount } = useAlertStore();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <header className='bg-white shadow-sm px-4 py-3 sm:px-6 sm:py-4 flex justify-between items-center border-b'>
      {/* Izquierda: botón hamburguesa + saludo */}
      <div className='flex items-center gap-3 sm:gap-4 min-w-0'>
        <button
          className='lg:hidden text-gray-600 hover:text-gray-900 shrink-0'
          onClick={toggleSidebar}
          aria-label='Abrir menú'
        >
          <FiMenu size={24} />
        </button>
        <h2 className='text-base sm:text-xl font-semibold text-gray-700 truncate'>
          {user?.name ? `Hola, ${user.name}` : 'Bienvenido'}
        </h2>
      </div>

      {/* Derecha: notificaciones + usuario */}
      <div className='flex items-center gap-3 sm:gap-4 shrink-0'>
        {/* Icono de notificaciones */}
        <div className='relative'>
          <FiBell className='text-xl sm:text-2xl text-gray-600' />
          {unreadCount > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5'>
              {unreadCount}
            </span>
          )}
        </div>

        {/* Icono de usuario con tooltip en móvil */}
        <div
          className='relative flex items-center gap-2 cursor-pointer'
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onTouchStart={() => setShowTooltip(!showTooltip)}
        >
          <FiUser className='text-xl sm:text-2xl text-gray-600 shrink-0' />

          {/* Email visible solo en pantallas grandes */}
          <span className='hidden md:inline text-sm sm:text-base text-gray-700 truncate max-w-30'>
            {user?.email}
          </span>

          {/* Tooltip para móviles (y también para desktop si se hace hover) */}
          {showTooltip && user?.email && (
            <div className='absolute top-full right-0 mt-2 bg-gray-800 text-white text-xs rounded py-1 px-3 whitespace-nowrap z-10 shadow-lg'>
              {user.email}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
