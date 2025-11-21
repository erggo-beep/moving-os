import { Plus } from 'lucide-react';

interface AddItemCardProps {
  onClick: () => void;
  addressType?: 'pickup' | 'dropoff';
}

function AddItemCard({ onClick, addressType = 'pickup' }: AddItemCardProps) {
  const buttonText = addressType === 'pickup'
    ? 'Add Another Pickup Address'
    : 'Add Another Drop-off Address';

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-white hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 text-gray-600 hover:text-gray-800"
    >
      <Plus className="w-6 h-6" />
      <span className="text-lg font-semibold">{buttonText}</span>
    </button>
  );
}

export default AddItemCard;
