import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './alert-dialog';
import { useConfirmStore } from '../../store/confirmStore';

export const ConfirmDialog = () => {
  const { isOpen, title, message, confirmText, cancelText, closeConfirm } =
    useConfirmStore();

  const handleConfirm = () => closeConfirm(true);
  const handleCancel = () => closeConfirm(false);

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={(open) => !open && closeConfirm(false)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
