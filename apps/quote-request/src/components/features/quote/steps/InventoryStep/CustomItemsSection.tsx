import { useState } from 'react';
import { Pencil, Package, Plus } from 'lucide-react';
import { SelectableCard } from '@moving-company/ui';
import AddCustomItemModal, { CustomItemFormData } from '../../components/AddCustomItemModal';
import { ConfirmationDialog } from '@moving-company/ui';
import type { Item } from '../../../../../data/itemCategories';

interface CustomItemsSectionProps {
  customItems: Item[];
  selectedItems: { [key: string]: number };
  onItemIncrement: (itemId: string) => void;
  onItemDecrement: (itemId: string) => void;
  onItemCountChange: (itemId: string, count: number) => void;
  onAddCustomItem: (item: CustomItemFormData) => void;
  onEditCustomItem: (itemId: string, item: CustomItemFormData) => void;
  onRemoveCustomItem: (itemId: string) => void;
}

function CustomItemsSection({
  customItems,
  selectedItems,
  onItemIncrement,
  onItemDecrement,
  onItemCountChange,
  onAddCustomItem,
  onEditCustomItem,
  onRemoveCustomItem,
}: CustomItemsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleEditClick = (item: Item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleAddClick = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleDecrement = (itemId: string) => {
    const currentCount = selectedItems[itemId] || 0;
    if (currentCount === 1) {
      setItemToDelete(itemId);
      setShowDeleteConfirm(true);
    } else {
      onItemDecrement(itemId);
    }
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onRemoveCustomItem(itemToDelete);
      setShowDeleteConfirm(false);
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setItemToDelete(null);
  };

  return (
    <section
      id="category-custom-item"
      className="scroll-mt-24"
      data-category="category-custom-item"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">Custom Item</h3>
        <p className="text-sm text-gray-600">Is something missing from the list? Add it here.</p>
      </div>

      {customItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {customItems.map((item) => (
            <div key={item.id} className="relative">
              <SelectableCard
                icon={Package}
                title={item.name}
                description={item.details || item.description}
                badge={`${item.volume.toFixed(2)} m³`}
                badgeColor="red"
                selected={false}
                onClick={() => {}}
                showCounter={true}
                counterValue={selectedItems[item.id] || 0}
                onIncrement={() => onItemIncrement(item.id)}
                onDecrement={() => handleDecrement(item.id)}
                onCounterChange={(value) => onItemCountChange(item.id, value)}
              />
              <button
                type="button"
                onClick={() => handleEditClick(item)}
                className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-blue-50 hover:text-blue-600 text-gray-500 transition-colors z-10"
                title="Edit custom item"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={handleAddClick}
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-300 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-all"
      >
        <Plus className="w-5 h-5" />
        <span className="font-medium">Add</span>
      </button>

      <AddCustomItemModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        mode={editingItem ? 'edit' : 'add'}
        editItem={editingItem}
        onAdd={onAddCustomItem}
        onEdit={onEditCustomItem}
      />

      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        title="Delete Custom Item"
        message="Are you sure you want to delete this item?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Yes"
        cancelText="Cancel"
        variant="danger"
      />
    </section>
  );
}

export default CustomItemsSection;
