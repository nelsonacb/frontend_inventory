import { useEffect, useState } from 'react';
import { useCategoryStore } from '../../store/categoryStore';
import { Modal } from '../ui/Modal';
import { CategoryForm } from '../forms/CategoryForm';
import { DataTable } from '../ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { Category, CategoryFormData } from '../../interfaces';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';
import { useConfirm } from '../../hooks/useConfirm';

export const CategoryTable = () => {
  const {
    categories,
    loading,
    fetchCategories,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategoryStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { success } = useToast();
  const { confirm } = useConfirm();

  useEffect(() => {
    fetchCategories(1, 10);
  }, [fetchCategories]);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = await confirm({
      title: 'Eliminar categoría',
      message: '¿Estás seguro de que quieres eliminar esta categoría?',
      confirmText: 'Eliminar',
      cancelText: 'Cancelar',
    });

    if (isConfirmed) {
      await removeCategory(id);
      success('Categoría eliminada con éxito');
    }
  };

  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'color',
      header: 'Color',
      cell: ({ getValue }) => (
        <div className='flex items-center gap-2'>
          <span
            className='w-6 h-6 rounded-full border'
            style={{ backgroundColor: getValue() as string }}
          />
          <span>{getValue() as string}</span>
        </div>
      ),
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

  const handleSubmitForm = async (data: CategoryFormData) => {
    if (editingCategory) {
      await editCategory(editingCategory.id, data);
      success('Categoría editada exitosamente');
    } else {
      await addCategory(data);
      success('Categoría creada exitosamente');
    }
    setModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Categorías</h1>
        <button
          onClick={() => {
            setEditingCategory(null);
            setModalOpen(true);
          }}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md'
        >
          Nueva Categoría
        </button>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        loading={loading}
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingCategory(null);
        }}
        title={editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
      >
        <CategoryForm
          defaultValues={
            editingCategory
              ? { name: editingCategory.name, color: editingCategory.color }
              : undefined
          }
          onSubmit={handleSubmitForm}
          onCancel={() => {
            setModalOpen(false);
            setEditingCategory(null);
          }}
          isLoading={loading}
        />
      </Modal>
    </div>
  );
};
