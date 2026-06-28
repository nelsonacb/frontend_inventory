import { useConfirmStore } from '../store/confirmStore';

export const useConfirm = () => {
  const openConfirm = useConfirmStore((state) => state.openConfirm);

  const confirm = (options: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  }) => {
    return openConfirm(options);
  };

  return { confirm };
};
