import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategoryStore } from '../../store/categoryStore';
import { useWarehouseStore } from '../../store/warehouseStore';
import type { Product, ProductFormData } from '../../interfaces';
import {
  productSchema,
  type ProductFormValues,
} from '../../schemas/productSchema';

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ProductForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProductFormProps) => {
  const { categories, fetchCategories } = useCategoryStore();
  const { warehouses, fetchWarehouses } = useWarehouseStore();

  useEffect(() => {
    fetchCategories(1, 100);
    fetchWarehouses(1, 100);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || '',
      sku: initialData?.sku || '',
      barcode: initialData?.barcode || '',
      categoryId: initialData?.categoryId || 0,
      price: initialData?.price || 0,
      threshold: initialData?.threshold || 5,
      description: initialData?.description || '',
      image: initialData?.image || '',
      initialStock: initialData?.total_stock || 0,
      warehouseId: initialData?.stocks?.[0]?.warehouseId || 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        sku: initialData.sku,
        barcode: initialData.barcode || '',
        categoryId: initialData.categoryId,
        price: initialData.price,
        threshold: initialData.threshold,
        description: initialData.description || '',
        image: initialData.image || '',
        initialStock: initialData.total_stock || 0,
        warehouseId: initialData.stocks?.[0]?.warehouseId || 0,
      });
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: ProductFormValues) => {
    onSubmit(data as ProductFormData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className='space-y-4'
    >
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Nombre *
        </label>
        <input
          {...register('name')}
          className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className='text-red-500 text-sm'>{errors.name.message}</p>
        )}
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            SKU *
          </label>
          <input
            {...register('sku')}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            disabled={isSubmitting}
          />
          {errors.sku && (
            <p className='text-red-500 text-sm'>{errors.sku.message}</p>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Código de barras
          </label>
          <input
            {...register('barcode')}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Categoría *
          </label>
          <select
            {...register('categoryId', { valueAsNumber: true })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            disabled={isSubmitting}
          >
            <option value={0}>Selecciona...</option>
            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className='text-red-500 text-sm'>{errors.categoryId.message}</p>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Precio *
          </label>
          <input
            type='number'
            step='0.01'
            {...register('price', { valueAsNumber: true })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            disabled={isSubmitting}
          />
          {errors.price && (
            <p className='text-red-500 text-sm'>{errors.price.message}</p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Umbral mínimo *
          </label>
          <input
            type='number'
            {...register('threshold', { valueAsNumber: true })}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            disabled={isSubmitting}
          />
          {errors.threshold && (
            <p className='text-red-500 text-sm'>{errors.threshold.message}</p>
          )}
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Imagen (URL)
          </label>
          <input
            {...register('image')}
            className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Campos solo para creación (stock inicial) */}
      {!initialData && (
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Stock inicial
            </label>
            <input
              type='number'
              {...register('initialStock', { valueAsNumber: true })}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Almacén
            </label>
            <select
              {...register('warehouseId', { valueAsNumber: true })}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              disabled={isSubmitting}
            >
              <option value={0}>Selecciona...</option>
              {warehouses.map((wh) => (
                <option
                  key={wh.id}
                  value={wh.id}
                >
                  {wh.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Descripción
        </label>
        <textarea
          {...register('description')}
          rows={3}
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
