import { LucideIcon } from 'lucide-react';
import SpecialItemsForm from './SpecialItemsForm';
import type { FragileItemsFormData } from '@moving-company/types';

interface FragileItemsFormProps {
  data: FragileItemsFormData;
  onChange: (data: FragileItemsFormData) => void;
  onAddItem?: () => void;
  getItemIcon?: (item: any) => LucideIcon;
  className?: string;
}

function FragileItemsForm({
  data,
  onChange,
  onAddItem,
  getItemIcon,
  className = '',
}: FragileItemsFormProps) {
  const handleUpdateItems = (items: any[]) => {
    onChange({ ...data, fragileItems: items });
  };

  const handleUpdateDetails = (details: string) => {
    onChange({ ...data, fragileItemsDetails: details });
  };

  return (
    <SpecialItemsForm
      items={data.fragileItems}
      details={data.fragileItemsDetails || ''}
      onUpdateItems={handleUpdateItems}
      onUpdateDetails={handleUpdateDetails}
      title="Fragile Items"
      subtitle="Select items that require extra care and protection during the move"
      tooltipText="Select items that require extra care and protection during the move. This helps us prepare appropriate packing materials and handling procedures."
      selectedItemsLabel="Selected Fragile Items"
      detailsLabel="Additional details regarding fragile items or protection"
      detailsPlaceholder="Example: Antique grandfather clock, crystal chandelier with 12 arms, vintage porcelain collection..."
      borderColor="border-red-600"
      bgColor="bg-red-50"
      textColor="text-red-700"
      iconColor="text-red-600"
      onAddItem={onAddItem}
      getItemIcon={getItemIcon}
      className={className}
    />
  );
}

export default FragileItemsForm;
