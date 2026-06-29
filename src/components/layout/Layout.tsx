import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUIStore } from '../../store/uiStore';

export const Layout = () => {
  const { toggleSidebar } = useUIStore();

  return (
    <div className='flex h-screen min-h-screen bg-gray-100'>
      <Sidebar />
      <div className='flex-1 flex flex-col min-h-0'>
        <Header toggleSidebar={toggleSidebar} />
        <main className='flex-1 overflow-y-auto p-4 sm:p-6'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
