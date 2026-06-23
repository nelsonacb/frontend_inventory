import { useAuthStore } from '../../store/authStore';
import { FiUser, FiBell } from 'react-icons/fi';
import { useAlertStore } from '../../store/alertStore';

export const Header = () => {
  const { user } = useAuthStore();
  const { unreadCount } = useAlertStore();

  return (
    <header className='bg-white shadow-sm px-6 py-4 flex justify-between items-center border-b'>
      <div className='flex items-center gap-4'>
        <h2 className='text-xl font-semibold text-gray-700'>
          Bienvenido, {user?.name || 'Usuario'}
        </h2>
      </div>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <FiBell className='text-2xl text-gray-600' />
          {unreadCount > 0 && (
            <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5'>
              {unreadCount}
            </span>
          )}
        </div>
        <div className='flex items-center gap-2'>
          <FiUser className='text-2xl text-gray-600' />
          <span className='text-gray-700'>{user?.email}</span>
        </div>
      </div>
    </header>
  );
};
