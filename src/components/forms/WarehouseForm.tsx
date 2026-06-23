import { useState, useEffect } from 'react';
import type { Warehouse } from '../../interfaces';

interface WarehouseFormProps {
  initialData?: Warehouse | null;
  onSubmit: (data: { name: string; location?: string }) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const WarehouseForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: WarehouseFormProps) => {
  const [name, setName] = useState(initialData?.name || '');
  const [location, setLocation] = useState(initialData?.location || '');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLocation(initialData.location || '');
    }
  }, [initialData]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onSubmit({ name, location: location || undefined });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-4'
    >
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Nombre *
        </label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Ubicación
        </label>
        <input
          type='text'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          disabled={isSubmitting}
        />
      </div>
      <div className='flex justify-end space-x-2 pt-4'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200'
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          type='submit'
          className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50'
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};
