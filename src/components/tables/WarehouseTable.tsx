import { useEffect, useState } from 'react';
import { useWarehouseStore } from '../../store/warehouseStore';
import { Modal } from '../ui/Modal';
import { WarehouseForm } from '../forms/WarehouseForm';
import { DataTable } from '../ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { Warehouse } from '../../interfaces';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { useConfirm } from '../../hooks/useConfirm';

export const WarehouseTable = () => {
  const {
    warehouses,
    loading,
    fetchWarehouses,
    addWarehouse,
    editWarehouse,
    removeWarehouse,
  } = useWarehouseStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingWarehouse, setEditingWarehouse] = useState<Warehouse | null>(
    null,
  );
  const { success } = useToast();
  const { confirm } = useConfirm();

  useEffect(() => {
    fetchWarehouses(1, 10);
  }, [fetchWarehouses]);

  const handleEdit = (warehouse: Warehouse) => {
    setEditingWarehouse(warehouse);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = await confirm({
      title: 'Eliminar almacén',
      message: '¿Estás seguro de que quieres eliminar este almacén?',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    });

    if (isConfirmed) {
      await removeWarehouse(id);
      success('Almacén eliminado con éxito');
    }
  };

  const columns: ColumnDef<Warehouse>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'location',
      header: 'Ubicación',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className='flex gap-2'>
          <Button
            size='sm'
            onClick={() => handleEdit(row.original)}
          >
            <FiEdit2 size={16} />
            Editar
          </Button>
          <Button
            size='sm'
            onClick={() => handleDelete(row.original.id)}
          >
            <FiTrash2 size={16} />
            Eliminar
          </Button>
        </div>
      ),
    },
  ];

  const handleSubmitForm = async (data: {
    name: string;
    location?: string;
  }) => {
    if (editingWarehouse) {
      await editWarehouse(editingWarehouse.id, data);
      success('Almacén editado exitosamente');
    } else {
      await addWarehouse(data);
      success('Almacén creado exitosamente');
    }
    setModalOpen(false);
    setEditingWarehouse(null);
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Almacenes</h1>
        <button
          onClick={() => {
            setEditingWarehouse(null);
            setModalOpen(true);
          }}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md'
        >
          Nuevo Almacén
        </button>
      </div>

      <DataTable
        data={warehouses}
        columns={columns}
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingWarehouse(null);
        }}
        title={editingWarehouse ? 'Editar Almacén' : 'Nuevo Almacén'}
      >
        <WarehouseForm
          initialData={editingWarehouse}
          onSubmit={handleSubmitForm}
          onCancel={() => {
            setModalOpen(false);
            setEditingWarehouse(null);
          }}
          isSubmitting={loading}
        />
      </Modal>
    </div>
  );
};
