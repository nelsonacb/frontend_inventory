import { useEffect, useState } from 'react';
import { useProductStore } from '../../store/productStore';
import { useCategoryStore } from '../../store/categoryStore';
import { Modal } from '../ui/Modal';
import { ProductForm } from '../forms/ProductForm';
import { DataTable } from '../ui/DataTable';
import type { ColumnDef } from '@tanstack/react-table';
import type { Product, ProductFormData } from '../../interfaces';
import { FiEdit2, FiTrash2, FiCode } from 'react-icons/fi';
import { Button } from '../ui/Button';
import { useToast } from '../../hooks/useToast';

export const ProductTable = () => {
  const {
    products,
    loading,
    fetchProducts,
    addProduct,
    editProduct,
    removeProduct,
    search,
    categoryFilter,
    setSearch,
    setCategoryFilter,
  } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { success } = useToast();

  useEffect(() => {
    fetchCategories(1, 100);
    fetchProducts(1, 10, search, categoryFilter || undefined);
  }, []);

  useEffect(() => {
    fetchProducts(1, 10, search, categoryFilter || undefined);
  }, [search, categoryFilter]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('¿Eliminar este producto?')) {
      removeProduct(id);
      success('Producto eliminado con éxito');
    }
  };

  const handleViewQR = (product: Product) => {
    setSelectedProduct(product);
    setQrModalOpen(true);
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Nombre',
    },
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'category.name',
      header: 'Categoría',
    },
    {
      accessorKey: 'price',
      header: 'Precio',
      cell: ({ getValue }) => {
        const value = getValue() as number;
        return `$${value.toFixed(2)}`;
      },
    },
    {
      accessorKey: 'total_stock',
      header: 'Stock',
    },
    {
      accessorKey: 'threshold',
      header: 'Umbral',
    },
    {
      id: 'actions',
      header: 'Acciones',
      cell: ({ row }) => (
        <div className='flex gap-2 flex-wrap'>
          <Button
            variant='primary'
            size='sm'
            onClick={() => handleEdit(row.original)}
          >
            <FiEdit2 size={16} />
            Editar
          </Button>
          <Button
            variant='danger'
            size='sm'
            onClick={() => handleDelete(row.original.id)}
          >
            <FiTrash2 size={16} />
            Eliminar
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => handleViewQR(row.original)}
          >
            <FiCode size={16} />
            QR
          </Button>
        </div>
      ),
    },
  ];

  const handleSubmitForm = async (data: ProductFormData) => {
    if (editingProduct) {
      await editProduct(editingProduct.id, data);
      success('Producto editado exitosamente');
    } else {
      await addProduct(data);
      success('Producto creado exitosamente');
    }
    setModalOpen(false);
    setEditingProduct(null);
  };

  // Búsqueda y filtros
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value ? Number(e.target.value) : null;
    setCategoryFilter(value);
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-4 flex-wrap gap-2'>
        <h1 className='text-2xl font-bold'>Productos</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            setModalOpen(true);
          }}
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md'
        >
          Nuevo Producto
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className='flex gap-4 mb-4 flex-wrap'>
        <input
          type='text'
          placeholder='Buscar por nombre, SKU...'
          value={search}
          onChange={handleSearchChange}
          className='px-3 py-2 border rounded-md flex-1 min-w-50'
        />
        <select
          value={categoryFilter || ''}
          onChange={handleCategoryChange}
          className='px-3 py-2 border rounded-md'
        >
          <option value=''>Todas las categorías</option>
          {categories.map((cat) => (
            <option
              key={cat.id}
              value={cat.id}
            >
              {cat.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setSearch('');
            setCategoryFilter(null);
          }}
          className='px-3 py-2 border rounded-md hover:bg-gray-100'
        >
          Limpiar filtros
        </button>
      </div>

      <DataTable
        data={products}
        columns={columns}
        loading={loading}
      />

      {/* Modal para crear/editar producto */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
        }}
        title={editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
      >
        <ProductForm
          initialData={editingProduct}
          onSubmit={handleSubmitForm}
          onCancel={() => {
            setModalOpen(false);
            setEditingProduct(null);
          }}
          isSubmitting={loading}
        />
      </Modal>

      {/* Modal para mostrar QR */}
      <Modal
        isOpen={qrModalOpen}
        onClose={() => {
          setQrModalOpen(false);
          setSelectedProduct(null);
        }}
        title='Código QR del Producto'
      >
        {selectedProduct?.qrCode && (
          <div className='flex flex-col items-center'>
            <img
              src={`${selectedProduct.qrCode}`}
              alt={`QR de ${selectedProduct.name}`}
              className='w-48 h-48 object-contain'
            />
            <p className='mt-2 text-sm text-gray-600'>
              {selectedProduct.name} - {selectedProduct.sku}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};
