import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@moving-company/ui';
import { itemCategories, type Item } from '../../../../../data/itemCategories';

interface InventoryItemListViewProps {
  inventoryItems: { [key: string]: number };
  onSave: (selectedItems: { [itemId: string]: number }) => void;
  onCancel: () => void;
}

function InventoryItemListView({ inventoryItems, onSave, onCancel }: InventoryItemListViewProps) {
  const [selectedCounts, setSelectedCounts] = useState<{ [key: string]: number }>({});

  const allItems: (Item & { maxCount: number })[] = [];
  Object.entries(itemCategories).forEach(([_, categoryItems]) => {
    categoryItems.forEach((item) => {
      const inventoryCount = inventoryItems[item.id];
      if (inventoryCount && inventoryCount > 0) {
        allItems.push({
          ...item,
          maxCount: inventoryCount,
        });
      }
    });
  });

  const handleIncrement = (itemId: string, maxCount: number) => {
    setSelectedCounts((prev) => {
      const current = prev[itemId] || 0;
      if (current < maxCount) {
        return { ...prev, [itemId]: current + 1 };
      }
      return prev;
    });
  };

  const handleDecrement = (itemId: string) => {
    setSelectedCounts((prev) => {
      const current = prev[itemId] || 0;
      if (current > 0) {
        const newCount = current - 1;
        if (newCount === 0) {
          const { [itemId]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [itemId]: newCount };
      }
      return prev;
    });
  };

  const handleSave = () => {
    onSave(selectedCounts);
  };

  if (allItems.length === 0) {
    return (
      <div className="space-y-5">
        <div className="text-center py-8">
          <p className="text-gray-500">No items in inventory. Please add items to your inventory first.</p>
        </div>
        <div className="flex gap-3 pt-4">
          <Button onClick={onCancel} variant="secondary" fullWidth>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {allItems.map((item) => {
          const IconComponent = item.IconComponent;
          const selectedCount = selectedCounts[item.id] || 0;
          const hasSelection = selectedCount > 0;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <IconComponent className="w-5 h-5 text-red-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">{item.name}</h4>
                </div>
              </div>

              <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                {hasSelection && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDecrement(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-semibold text-gray-900">
                      {selectedCount}
                    </span>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleIncrement(item.id, item.maxCount)}
                  disabled={selectedCount >= item.maxCount}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onCancel} variant="secondary" fullWidth>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={Object.keys(selectedCounts).length === 0}
          variant="primary"
          fullWidth
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default InventoryItemListView;
