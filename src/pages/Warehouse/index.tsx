import { useEffect } from 'react';
import { WarehouseTable } from '../../components/tables/WarehouseTable';
import { useWarehouseStore } from '../../store/warehouseStore';

export const WarehousePage = () => {
  const { fetchWarehouses } = useWarehouseStore();

  useEffect(() => {
    fetchWarehouses(1, 10);
  }, [fetchWarehouses]);

  return (
    <div className='p-6'>
      <WarehouseTable />
    </div>
  );
};
