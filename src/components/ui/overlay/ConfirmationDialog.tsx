import Modal from './Modal';
import Button from '../buttons/Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
}

function ConfirmationDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'Cancel',
  variant = 'danger',
}: ConfirmationDialogProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div className="space-y-5">
        <p className="text-gray-700">{message}</p>

        <div className="flex gap-3 pt-4">
          <Button onClick={onCancel} variant="secondary" fullWidth>
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            variant={variant}
            fullWidth
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationDialog;
