import { create } from 'zustand';

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  resolve: ((value: boolean) => void) | null;
  openConfirm: (options: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  }) => Promise<boolean>;
  closeConfirm: (result: boolean) => void;
}

export const useConfirmStore = create<ConfirmState>((set) => ({
  isOpen: false,
  title: '',
  message: '',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar',
  resolve: null,

  openConfirm: (options) =>
    new Promise<boolean>((resolve) => {
      set({
        isOpen: true,
        title: options.title,
        message: options.message,
        confirmText: options.confirmText || 'Confirmar',
        cancelText: options.cancelText || 'Cancelar',
        resolve,
      });
    }),

  closeConfirm: (result) => {
    set((state) => {
      if (state.resolve) {
        state.resolve(result);
      }
      return {
        isOpen: false,
        resolve: null,
      };
    });
  },
}));
