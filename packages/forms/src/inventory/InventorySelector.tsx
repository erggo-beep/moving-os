import { Package, Plus, Minus } from 'lucide-react';
import { TextArea, InfoCard } from '@moving-company/ui';
import type { InventoryFormData, Item, ItemCategory } from '@moving-company/types';

interface InventorySelectorProps {
  data: InventoryFormData;
  onChange: (data: InventoryFormData) => void;
  itemCategories: ItemCategory;
  compact?: boolean;
  className?: string;
}

function InventorySelector({
  data,
  onChange,
  itemCategories,
  compact = false,
  className = '',
}: InventorySelectorProps) {
  const handleItemCountChange = (itemId: string, change: number) => {
    const currentCount = data.items[itemId] || 0;
    const newCount = Math.max(0, currentCount + change);

    const newItems = { ...data.items };
    if (newCount === 0) {
      delete newItems[itemId];
    } else {
      newItems[itemId] = newCount;
    }

    onChange({ ...data, items: newItems });
  };

  const handleNotesChange = (notes: string) => {
    onChange({ ...data, additionalNotes: notes });
  };

  const allItems = Object.values(itemCategories).flat();

  const totalVolume = Object.entries(data.items).reduce((total, [itemId, count]) => {
    const item = allItems.find((i) => i.id === itemId);
    if (item) {
      return total + item.volume * count;
    }
    return total;
  }, 0);

  const selectedItemsCount = Object.values(data.items).reduce((sum, count) => sum + count, 0);

  return (
    <div className={className}>
      <div className="space-y-8">
        {!compact && (
          <InfoCard>
            <p className="font-semibold">Inventory Selection</p>
            <p className="mt-1">Select the items you'll be moving. You can adjust quantities and add custom items.</p>
          </InfoCard>
        )}

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Volume</p>
              <p className="text-2xl font-bold text-gray-900">{totalVolume.toFixed(1)} m³</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-600">Items Selected</p>
              <p className="text-2xl font-bold text-gray-900">{selectedItemsCount}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(itemCategories).map(([categoryName, items]) => (
            <div key={categoryName}>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-gray-900">{categoryName}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item) => {
                  const count = data.items[item.id] || 0;
                  const IconComponent = item.IconComponent;

                  return (
                    <div
                      key={item.id}
                      className={`
                        border-2 rounded-lg p-4 transition-all
                        ${count > 0 ? 'border-red-600 bg-red-50' : 'border-gray-200'}
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-gray-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.description}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.volume} m³</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <button
                          type="button"
                          onClick={() => handleItemCountChange(item.id, -1)}
                          disabled={count === 0}
                          className="w-8 h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>

                        <span className="text-lg font-bold text-gray-900 min-w-[2rem] text-center">
                          {count}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleItemCountChange(item.id, 1)}
                          className="w-8 h-8 rounded-lg border-2 border-red-600 bg-red-600 text-white flex items-center justify-center hover:bg-red-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Notes</h3>
          <TextArea
            value={data.additionalNotes}
            onChange={handleNotesChange}
            placeholder="Any special items or notes about your inventory? (e.g., piano, antiques, special handling requirements)"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
}

export default InventorySelector;
