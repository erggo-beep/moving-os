import { useState } from 'react';
import { Package, X, Plus } from 'lucide-react';
import Tooltip from '../../../ui/overlay/Tooltip';
import AddFragileItemModal from './AddFragileItemModal';
import { FragileItem } from '../QuoteWizard';
import { itemCategories } from '../../../../data/itemCategories';
import type { CustomFragileItemData } from './CustomFragileItemForm';

interface SpecialItemsSectionProps {
  title: string;
  subtitle: string;
  tooltipText: string;
  selectedItemsLabel: string;
  detailsLabel: string;
  detailsPlaceholder: string;
  items: FragileItem[];
  details: string;
  inventoryItems: { [key: string]: number };
  borderColor: string;
  bgColor: string;
  textColor: string;
  onUpdateItems: (items: FragileItem[]) => void;
  onUpdateDetails: (details: string) => void;
}

function SpecialItemsSection({
  title,
  subtitle,
  tooltipText,
  selectedItemsLabel,
  detailsLabel,
  detailsPlaceholder,
  items,
  details,
  inventoryItems,
  borderColor,
  bgColor,
  textColor,
  onUpdateItems,
  onUpdateDetails,
}: SpecialItemsSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddFromInventory = (selections: { [itemId: string]: number }) => {
    const newItems: FragileItem[] = [];

    Object.entries(selections).forEach(([itemId, count]) => {
      let itemData = null;
      for (const categoryItems of Object.values(itemCategories)) {
        const found = categoryItems.find((item) => item.id === itemId);
        if (found) {
          itemData = found;
          break;
        }
      }

      if (itemData) {
        for (let i = 0; i < count; i++) {
          const newItem: FragileItem = {
            id: `inventory-${itemId}-${Date.now()}-${i}`,
            name: itemData.name,
            type: 'predefined',
            sourceItemId: itemId,
          };
          newItems.push(newItem);
        }
      }
    });

    onUpdateItems([...items, ...newItems]);
  };

  const handleAddCustomItem = (formData: CustomFragileItemData) => {
    const newItem: FragileItem = {
      id: `custom-${Date.now()}`,
      name: formData.name,
      type: 'custom',
      length: formData.length,
      width: formData.width,
      height: formData.height,
      alreadyIncluded: formData.alreadyIncluded,
      additionalDetails: formData.additionalDetails,
    };

    onUpdateItems([...items, newItem]);
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    onUpdateItems(updatedItems);
  };

  const handleDetailsChange = (value: string) => {
    onUpdateDetails(value);
  };

  const getItemIcon = (item: FragileItem) => {
    if (item.sourceItemId) {
      for (const categoryItems of Object.values(itemCategories)) {
        const found = categoryItems.find((i) => i.id === item.sourceItemId);
        if (found) {
          return found.IconComponent;
        }
      }
    }
    return Package;
  };

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        <Tooltip text={tooltipText} />
      </div>
      <p className="text-gray-600 mb-8">{subtitle}</p>

      <div className="mb-8">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">{selectedItemsLabel}</h3>
        <div className="flex flex-wrap gap-3">
          {items.map((item) => {
            const IconComponent = getItemIcon(item);
            return (
              <div
                key={item.id}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 ${borderColor} ${bgColor} ${textColor} font-medium`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{item.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="ml-1 hover:bg-opacity-20 hover:bg-black rounded-full p-0.5 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-300 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Add</span>
          </button>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {detailsLabel}
        </label>
        <textarea
          value={details}
          onChange={(e) => handleDetailsChange(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          placeholder={detailsPlaceholder}
        />
      </div>

      <AddFragileItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        inventoryItems={inventoryItems}
        onAddFromInventory={handleAddFromInventory}
        onAddCustom={handleAddCustomItem}
      />
    </div>
  );
}

export default SpecialItemsSection;
