import { useEffect, useState } from 'react';
import { useDashboardStore } from '../../store/dashboardStore';
import { CategoryChart } from '../../components/charts/CategoryChart';
import { SalesChart } from '../../components/charts/SalesChart';
import { LowStockChart } from '../../components/charts/LowStockChart';
import { Button } from '../../components/ui/Button';

export const Dashboard = () => {
  const {
    stats,
    salesData,
    stockByCategory,
    lowStock,
    loading,
    fetchAll,
    fetchSales,
  } = useDashboardStore();
  const [salesRange, setSalesRange] = useState('30d');

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleRangeChange = (range: string) => {
    setSalesRange(range);
    fetchSales(range);
  };

  // Valores por defecto para stats mientras carga
  const totalProducts = stats?.totalProducts ?? 0;
  const totalStockValue = stats?.totalStockValue ?? 0;
  const lowStockCount = stats?.lowStockCount ?? 0;
  const todayMovements = stats?.todayMovements ?? 0;

  return (
    <div className='p-6 space-y-6'>
      {/* KPIs */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='bg-white p-4 rounded-lg shadow'>
          <div className='text-sm text-gray-500'>Total Productos</div>
          <div className='text-2xl font-bold'>{totalProducts}</div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow'>
          <div className='text-sm text-gray-500'>Valor del Stock</div>
          <div className='text-2xl font-bold'>
            ${totalStockValue.toFixed(2)}
          </div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow'>
          <div className='text-sm text-gray-500'>Productos con Bajo Stock</div>
          <div className='text-2xl font-bold text-red-600'>{lowStockCount}</div>
        </div>
        <div className='bg-white p-4 rounded-lg shadow'>
          <div className='text-sm text-gray-500'>Movimientos Hoy</div>
          <div className='text-2xl font-bold'>{todayMovements}</div>
        </div>
      </div>

      {/* Gráficas principales: Ventas y Categorías */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 bg-white p-4 rounded-lg shadow'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-semibold'>Ventas en el Tiempo</h2>
            <div className='flex gap-2'>
              <Button
                variant={salesRange === '7d' ? 'primary' : 'outline'}
                size='sm'
                onClick={() => handleRangeChange('7d')}
              >
                7d
              </Button>
              <Button
                variant={salesRange === '30d' ? 'primary' : 'outline'}
                size='sm'
                onClick={() => handleRangeChange('30d')}
              >
                30d
              </Button>
              <Button
                variant={salesRange === '90d' ? 'primary' : 'outline'}
                size='sm'
                onClick={() => handleRangeChange('90d')}
              >
                90d
              </Button>
            </div>
          </div>
          <SalesChart
            data={salesData}
            loading={loading}
          />
        </div>

        <div className='bg-white p-4 rounded-lg shadow'>
          <h2 className='text-lg font-semibold mb-4'>
            Distribución por Categoría
          </h2>
          <CategoryChart
            data={stockByCategory}
            loading={loading}
          />
        </div>
      </div>

      {/* Bajo Stock */}
      <div className='bg-white p-4 rounded-lg shadow'>
        <h2 className='text-lg font-semibold mb-4'>
          Top 5 Productos con Bajo Stock
        </h2>
        <LowStockChart
          data={lowStock}
          loading={loading}
        />
      </div>
    </div>
  );
};
