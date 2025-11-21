import Modal from '../../../ui/overlay/Modal';
import UnifiedCustomItemForm, { UnifiedCustomItemFormData } from './UnifiedCustomItemForm';
import type { Item } from '../../../../data/itemCategories';

export interface CustomItemFormData {
  name: string;
  additionalDetails: string;
  volume: number;
  dimensions?: {
    width: number;
    length: number;
    height: number;
  };
}

interface AddCustomItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'add' | 'edit';
  editItem?: Item | null;
  onAdd: (item: CustomItemFormData) => void;
  onEdit?: (itemId: string, item: CustomItemFormData) => void;
}

function AddCustomItemModal({
  isOpen,
  onClose,
  mode = 'add',
  editItem = null,
  onAdd,
  onEdit,
}: AddCustomItemModalProps) {
  const initialData: UnifiedCustomItemFormData | undefined = editItem
    ? {
        name: editItem.name,
        additionalDetails: editItem.details || '',
        volume: editItem.volume,
        dimensions: editItem.dimensions,
      }
    : undefined;

  const handleSubmit = (data: UnifiedCustomItemFormData) => {
    const itemData: CustomItemFormData = {
      name: data.name,
      additionalDetails: data.additionalDetails,
      volume: data.volume || 0.3,
      dimensions: data.dimensions,
    };

    if (mode === 'edit' && editItem && onEdit) {
      onEdit(editItem.id, itemData);
    } else {
      onAdd(itemData);
    }

    onClose();
  };

  const title = mode === 'edit' ? 'Edit Custom Item' : 'Add Custom Item';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <UnifiedCustomItemForm
        mode={mode}
        initialData={initialData}
        showCheckbox={false}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}

export default AddCustomItemModal;
