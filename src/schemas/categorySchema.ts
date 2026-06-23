import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, 'Color inválido (formato #RRGGBB)'),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
