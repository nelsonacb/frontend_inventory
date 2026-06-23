import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CategoryFormData } from '../../interfaces';
import { categorySchema } from '../../schemas/categorySchema';

interface CategoryFormProps {
  defaultValues?: CategoryFormData;
  onSubmit: (data: CategoryFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const CategoryForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isLoading,
}: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues || { name: '', color: '#007bff' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>
          Nombre
        </label>
        <input
          {...register('name')}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        />
        {errors.name && (
          <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>
        )}
      </div>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700'>Color</label>
        <div className='flex items-center gap-2'>
          <input
            {...register('color')}
            type='color'
            className='w-10 h-10 p-1 border border-gray-300 rounded'
          />
          <input
            {...register('color')}
            type='text'
            className='flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          />
        </div>
        {errors.color && (
          <p className='text-red-500 text-xs mt-1'>{errors.color.message}</p>
        )}
      </div>
      <div className='flex justify-end gap-2'>
        <button
          type='button'
          onClick={onCancel}
          className='px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md'
        >
          Cancelar
        </button>
        <button
          type='submit'
          disabled={isLoading}
          className='px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50'
        >
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
};
