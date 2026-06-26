import { create } from 'zustand';
import { getMovements, createMovement } from '../services/movements';
import type {
  Movement,
  MovementCreatePayload,
  PaginatedResponse,
} from '../interfaces';

interface MovementState {
  movements: Movement[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  fetchMovements: (page?: number, limit?: number) => Promise<void>;
  addMovement: (data: MovementCreatePayload) => Promise<Movement>;
}

export const useMovementStore = create<MovementState>((set, get) => ({
  movements: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,

  fetchMovements: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });
    try {
      const response: PaginatedResponse<Movement> = await getMovements(
        page,
        limit,
      );
      set({
        movements: response.data,
        currentPage: response.meta.page,
        totalPages: response.meta.totalPages,
        totalItems: response.meta.total,
        loading: false,
      });
    } catch (error: any) {
      set({
        error: error.message || 'Error al cargar movimientos',
        loading: false,
      });
    }
  },

  addMovement: async (data: MovementCreatePayload) => {
    set({ loading: true, error: null });
    try {
      const newMovement = await createMovement(data);
      const { currentPage, fetchMovements } = get();
      await fetchMovements(currentPage);
      return newMovement;
    } catch (error: any) {
      set({
        error: error.message || 'Error al crear movimiento',
        loading: false,
      });
      throw error;
    }
  },
}));
