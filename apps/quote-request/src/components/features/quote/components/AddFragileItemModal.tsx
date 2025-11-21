import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Modal } from '@moving-company/ui';
import FragileItemSelectionMode from './FragileItemSelectionMode';
import InventoryItemListView from './InventoryItemListView';
import CustomFragileItemForm, { CustomFragileItemData } from './CustomFragileItemForm';

type ViewMode = 'selection' | 'inventory-list' | 'add-new';

export interface FragileItemFromInventory {
  itemId: string;
  count: number;
}

interface AddFragileItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  inventoryItems: { [key: string]: number };
  onAddFromInventory: (selections: { [itemId: string]: number }) => void;
  onAddCustom: (item: CustomFragileItemData) => void;
}

function AddFragileItemModal({
  isOpen,
  onClose,
  inventoryItems,
  onAddFromInventory,
  onAddCustom
}: AddFragileItemModalProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('selection');

  useEffect(() => {
    if (isOpen) {
      setViewMode('selection');
    }
  }, [isOpen]);

  const handleInventorySave = (selectedItems: { [itemId: string]: number }) => {
    onAddFromInventory(selectedItems);
    onClose();
  };

  const handleCustomAdd = (item: CustomFragileItemData) => {
    onAddCustom(item);
    onClose();
  };

  const handleCancel = () => {
    if (viewMode === 'selection') {
      onClose();
    } else {
      setViewMode('selection');
    }
  };

  const getTitle = () => {
    switch (viewMode) {
      case 'inventory-list':
        return 'Choose from item list';
      case 'add-new':
        return 'Add New Fragile Item';
      default:
        return 'Add Fragile Item';
    }
  };

  const showBackButton = viewMode !== 'selection';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()}>
      {showBackButton && (
        <button
          type="button"
          onClick={() => setViewMode('selection')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4 -mt-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
      )}

      {viewMode === 'selection' && (
        <FragileItemSelectionMode
          onSelectFromInventory={() => setViewMode('inventory-list')}
          onAddNewItem={() => setViewMode('add-new')}
        />
      )}

      {viewMode === 'inventory-list' && (
        <InventoryItemListView
          inventoryItems={inventoryItems}
          onSave={handleInventorySave}
          onCancel={handleCancel}
        />
      )}

      {viewMode === 'add-new' && (
        <CustomFragileItemForm
          onAdd={handleCustomAdd}
          onCancel={handleCancel}
        />
      )}
    </Modal>
  );
}

export default AddFragileItemModal;
