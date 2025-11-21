import { LucideIcon } from 'lucide-react';
import SpecialItemsForm from './SpecialItemsForm';
import type { HeavyItemsFormData } from '@moving-company/types';

interface HeavyItemsFormProps {
  data: HeavyItemsFormData;
  onChange: (data: HeavyItemsFormData) => void;
  onAddItem?: () => void;
  getItemIcon?: (item: any) => LucideIcon;
  className?: string;
}

function HeavyItemsForm({
  data,
  onChange,
  onAddItem,
  getItemIcon,
  className = '',
}: HeavyItemsFormProps) {
  const handleUpdateItems = (items: any[]) => {
    onChange({ ...data, heavyItems: items });
  };

  const handleUpdateDetails = (details: string) => {
    onChange({ ...data, heavyItemsDetails: details });
  };

  return (
    <SpecialItemsForm
      items={data.heavyItems}
      details={data.heavyItemsDetails || ''}
      onUpdateItems={handleUpdateItems}
      onUpdateDetails={handleUpdateDetails}
      title="Heavy Items (+100kg)"
      subtitle="Select items that weigh over 100kg and require special handling"
      tooltipText="Select items that weigh over 100kg. These items require special equipment and handling procedures to ensure safe transport."
      selectedItemsLabel="Selected Heavy Items"
      detailsLabel="Additional details regarding heavy items or handling requirements"
      detailsPlaceholder="Example: Grand piano (300kg), Industrial safe (250kg), Large marble table (180kg)..."
      borderColor="border-orange-600"
      bgColor="bg-orange-50"
      textColor="text-orange-700"
      iconColor="text-orange-600"
      onAddItem={onAddItem}
      getItemIcon={getItemIcon}
      className={className}
    />
  );
}

export default HeavyItemsForm;
