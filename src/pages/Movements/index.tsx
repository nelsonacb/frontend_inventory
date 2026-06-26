import { useEffect, useState } from 'react';
import { useMovementStore } from '../../store/movementStore';
import { MovementTable } from '../../components/tables/MovementTable';
import { MovementForm } from '../../components/forms/MovementForm';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';

export const MovementsPage = () => {
  const { movements, loading, fetchMovements, addMovement } =
    useMovementStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { success, error: toastError } = useToast();

  useEffect(() => {
    fetchMovements(1, 10);
  }, [fetchMovements]);

  const handleCreateMovement = async (data: any) => {
    try {
      await addMovement(data);
      success('Movimiento registrado correctamente');
      setIsModalOpen(false);
    } catch (err: any) {
      toastError(err.message || 'Error al crear movimiento');
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Movimientos de Stock</h1>
        <Button
          variant='primary'
          onClick={() => setIsModalOpen(true)}
        >
          Nuevo Movimiento
        </Button>
      </div>

      <MovementTable
        movements={movements}
        loading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='Registrar Movimiento'
      >
        <MovementForm
          onSubmit={handleCreateMovement}
          onCancel={() => setIsModalOpen(false)}
          isLoading={loading}
        />
      </Modal>
    </div>
  );
};
