import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getStocks } from '../../services/stocks';
import type {
  Stock,
  MovementCreatePayload,
  MovementReason,
} from '../../interfaces';
import { Button } from '../ui/Button';

interface MovementFormProps {
  onSubmit: (data: MovementCreatePayload) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

const reasonOptions: { value: MovementReason; label: string }[] = [
  { value: 'purchase', label: 'Compra' },
  { value: 'sale', label: 'Venta' },
  { value: 'adjustment', label: 'Ajuste' },
  { value: 'return', label: 'Devolución' },
  { value: 'transfer', label: 'Transferencia' },
];

export const MovementForm = ({
  onSubmit,
  onCancel,
  isLoading = false,
}: MovementFormProps) => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loadingStocks, setLoadingStocks] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovementCreatePayload>();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const data = await getStocks();
        setStocks(data);
      } catch (error) {
        console.error('Error cargando stocks:', error);
      } finally {
        setLoadingStocks(false);
      }
    };
    fetchStocks();
  }, []);

  const onSubmitHandler = async (data: MovementCreatePayload) => {
    await onSubmit(data);
  };

  // Construir el texto de cada opción de stock
  const stockLabel = (stock: Stock) =>
    `${stock.product.name} (SKU: ${stock.product.sku}) - ${stock.warehouse.name} [Stock: ${stock.quantity}]`;

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className='space-y-4'
    >
      <div>
        <label
          htmlFor='stockId'
          className='block text-sm font-medium text-gray-700'
        >
          Producto / Almacén *
        </label>
        <select
          id='stockId'
          {...register('stockId', {
            valueAsNumber: true,
            required: 'Selecciona un producto/almacén',
          })}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          disabled={loadingStocks}
        >
          <option value=''>-- Seleccionar --</option>
          {stocks.map((stock) => (
            <option
              key={stock.id}
              value={stock.id}
            >
              {stockLabel(stock)}
            </option>
          ))}
        </select>
        {errors.stockId && (
          <p className='mt-1 text-sm text-red-600'>{errors.stockId.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='quantityChange'
          className='block text-sm font-medium text-gray-700'
        >
          Cantidad *
        </label>
        <input
          type='number'
          id='quantityChange'
          {...register('quantityChange', {
            required: 'La cantidad es obligatoria',
            valueAsNumber: true,
            validate: (value) => value !== 0 || 'La cantidad no puede ser cero',
          })}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
        {errors.quantityChange && (
          <p className='mt-1 text-sm text-red-600'>
            {errors.quantityChange.message}
          </p>
        )}
        <p className='mt-1 text-xs text-gray-500'>
          Usa números positivos para ingresos (compras) y negativos para salidas
          (ventas).
        </p>
      </div>

      <div>
        <label
          htmlFor='reason'
          className='block text-sm font-medium text-gray-700'
        >
          Motivo *
        </label>
        <select
          id='reason'
          {...register('reason', { required: 'Selecciona un motivo' })}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        >
          <option value=''>-- Seleccionar --</option>
          {reasonOptions.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </option>
          ))}
        </select>
        {errors.reason && (
          <p className='mt-1 text-sm text-red-600'>{errors.reason.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='notes'
          className='block text-sm font-medium text-gray-700'
        >
          Notas (opcional)
        </label>
        <textarea
          id='notes'
          rows={3}
          {...register('notes')}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          placeholder='Ej: Venta a cliente, compra a proveedor, etc.'
        />
      </div>

      <div className='flex justify-end gap-2 pt-4'>
        <Button
          type='button'
          variant='outline'
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancelar
        </Button>
        <Button
          type='submit'
          variant='primary'
          disabled={isLoading}
        >
          {isLoading ? 'Guardando...' : 'Crear Movimiento'}
        </Button>
      </div>
    </form>
  );
};
