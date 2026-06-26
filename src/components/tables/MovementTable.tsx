import { useMemo } from 'react';
import { DataTable } from '../ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { Movement } from '../../interfaces';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const reasonMap: Record<string, string> = {
  purchase: 'Compra',
  sale: 'Venta',
  adjustment: 'Ajuste',
  return: 'Devolución',
  transfer: 'Transferencia',
};

const reasonColorMap: Record<string, string> = {
  purchase: 'text-green-600 bg-green-100',
  sale: 'text-red-600 bg-red-100',
  adjustment: 'text-yellow-600 bg-yellow-100',
  return: 'text-blue-600 bg-blue-100',
  transfer: 'text-purple-600 bg-purple-100',
};

interface MovementTableProps {
  movements: Movement[];
  loading?: boolean;
}

export const MovementTable = ({
  movements,
  loading = false,
}: MovementTableProps) => {
  const columns = useMemo<ColumnDef<Movement>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 60,
      },
      {
        accessorKey: 'stock.product.name',
        header: 'Producto',
        cell: ({ row }) => row.original.stock?.product?.name || '—',
      },
      {
        accessorKey: 'stock.warehouse.name',
        header: 'Almacén',
        cell: ({ row }) => row.original.stock?.warehouse?.name || '—',
      },
      {
        accessorKey: 'quantityChange',
        header: 'Cantidad',
        cell: ({ getValue }) => {
          const value = getValue() as number;
          const isPositive = value > 0;
          return (
            <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
              {isPositive ? '+' : ''}
              {value}
            </span>
          );
        },
      },
      {
        accessorKey: 'reason',
        header: 'Tipo',
        cell: ({ getValue }) => {
          const reason = getValue() as string;
          const label = reasonMap[reason] || reason;
          const colorClass =
            reasonColorMap[reason] || 'bg-gray-100 text-gray-600';
          return (
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
            >
              {label}
            </span>
          );
        },
      },
      {
        accessorKey: 'date',
        header: 'Fecha',
        cell: ({ getValue }) => {
          const date = new Date(getValue() as string);
          return format(date, "d 'de' MMMM, yyyy HH:mm", { locale: es });
        },
      },
      {
        accessorKey: 'user.name',
        header: 'Usuario',
        cell: ({ row }) =>
          row.original.user?.name || row.original.user?.email || '—',
      },
      {
        accessorKey: 'notes',
        header: 'Notas',
        cell: ({ getValue }) => {
          const notes = getValue() as string | null;
          return notes || '—';
        },
      },
    ],
    [],
  );

  return (
    <DataTable
      data={movements}
      columns={columns}
      loading={loading}
      pageSize={10}
      showPagination
    />
  );
};
