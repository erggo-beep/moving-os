import { useState } from 'react';
import { Package, X, Plus, LucideIcon } from 'lucide-react';
import { Tooltip, TextArea } from '@moving-company/ui';
import type { FragileItem } from '@moving-company/types';

export interface SpecialItemsFormProps {
  items: FragileItem[];
  details: string;
  onUpdateItems: (items: FragileItem[]) => void;
  onUpdateDetails: (details: string) => void;
  title?: string;
  subtitle?: string;
  tooltipText?: string;
  selectedItemsLabel?: string;
  detailsLabel?: string;
  detailsPlaceholder?: string;
  borderColor?: string;
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
  onAddItem?: () => void;
  getItemIcon?: (item: FragileItem) => LucideIcon;
  className?: string;
}

function SpecialItemsForm({
  items,
  details,
  onUpdateItems,
  onUpdateDetails,
  title = 'Special Items',
  subtitle = 'Select items that require special handling',
  tooltipText = 'Select items that require special handling during the move.',
  selectedItemsLabel = 'Selected Items',
  detailsLabel = 'Additional details',
  detailsPlaceholder = 'Enter any additional details...',
  borderColor = 'border-red-600',
  bgColor = 'bg-red-50',
  textColor = 'text-red-700',
  iconColor = 'text-red-600',
  onAddItem,
  getItemIcon,
  className = '',
}: SpecialItemsFormProps) {
  const handleRemoveItem = (itemId: string) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    onUpdateItems(updatedItems);
  };

  const handleDetailsChange = (value: string) => {
    onUpdateDetails(value);
  };

  const defaultGetItemIcon = (item: FragileItem): LucideIcon => {
    return Package;
  };

  const getIcon = getItemIcon || defaultGetItemIcon;

  return (
    <div className={className}>
      <div className="flex items-center gap-1.5 mb-2">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <Tooltip text={tooltipText} />
      </div>
      <p className="text-gray-600 mb-6">{subtitle}</p>

      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">{selectedItemsLabel}</h4>
        <div className="flex flex-wrap gap-3">
          {items.map((item) => {
            const IconComponent = getIcon(item);
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

          {onAddItem && (
            <button
              type="button"
              onClick={onAddItem}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-gray-300 bg-white text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-all"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">Add</span>
            </button>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          {detailsLabel}
        </label>
        <TextArea
          value={details}
          onChange={handleDetailsChange}
          rows={4}
          placeholder={detailsPlaceholder}
        />
      </div>
    </div>
  );
}

export default SpecialItemsForm;
