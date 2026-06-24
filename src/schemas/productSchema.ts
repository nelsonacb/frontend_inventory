import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  sku: z.string().min(1, 'El SKU es requerido'),
  barcode: z.string().optional(),
  categoryId: z.number().min(1, 'Selecciona una categoría'),
  price: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
  threshold: z.number().min(0, 'El umbral debe ser mayor o igual a 0'),
  description: z.string().optional(),
  image: z.string().url('URL inválida').optional().or(z.literal('')),
  initialStock: z.number().min(0).optional(),
  warehouseId: z.number().min(1, 'Selecciona un almacén').optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;
