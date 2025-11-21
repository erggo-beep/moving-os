import { List, Plus } from 'lucide-react';

interface FragileItemSelectionModeProps {
  onSelectFromInventory: () => void;
  onAddNewItem: () => void;
}

function FragileItemSelectionMode({ onSelectFromInventory, onAddNewItem }: FragileItemSelectionModeProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        type="button"
        onClick={onSelectFromInventory}
        className="flex flex-col items-center justify-center p-8 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-md transition-all bg-white min-h-[200px]"
      >
        <List className="w-12 h-12 text-red-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          Choose from item list
        </h3>
      </button>

      <button
        type="button"
        onClick={onAddNewItem}
        className="flex flex-col items-center justify-center p-8 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:shadow-md transition-all bg-white min-h-[200px]"
      >
        <Plus className="w-12 h-12 text-red-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 text-center">
          Add new item
        </h3>
      </button>
    </div>
  );
}

export default FragileItemSelectionMode;
