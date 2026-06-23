import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type PaginationState,
} from '@tanstack/react-table';
import { useState } from 'react';
import { Button } from './Button';

interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  loading?: boolean;
  pageSize?: number;
  showPagination?: boolean;
}

export function DataTable<T>({
  data,
  columns,
  loading = false,
  pageSize = 10,
  showPagination = true,
}: DataTableProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (loading) {
    return (
      <div className='flex justify-center py-8'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      <div className='overflow-x-auto shadow rounded-lg border border-gray-200'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className='hover:bg-gray-50 transition-colors'
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className='px-6 py-8 text-center text-gray-500'
                >
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className='flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6'>
          <div className='flex-1 flex justify-between sm:hidden'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
          <div className='hidden sm:flex-1 sm:flex sm:items-center sm:justify-between'>
            <div>
              <p className='text-sm text-gray-700'>
                Mostrando{' '}
                <span className='font-medium'>
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}
                </span>{' '}
                a{' '}
                <span className='font-medium'>
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length,
                  )}
                </span>{' '}
                de{' '}
                <span className='font-medium'>
                  {table.getFilteredRowModel().rows.length}
                </span>{' '}
                resultados
              </p>
            </div>
            <div className='flex gap-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                Primera
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Siguiente
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                Última
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
