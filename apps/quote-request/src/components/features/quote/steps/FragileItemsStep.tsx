import SpecialItemsSection from '../components/SpecialItemsSection';
import { FragileItem } from '../QuoteWizard';

interface FragileItemsData {
  quoteType: string;
  items: { [key: string]: number };
  additionalNotes: string;
  fragileItems: FragileItem[];
  fragileItemsDetails: string;
}

interface FragileItemsSelectionProps {
  data: FragileItemsData;
  onUpdate: (data: FragileItemsData) => void;
  onNext: () => void;
  onPrevious: () => void;
}

function FragileItemsStep({ data, onUpdate, onNext, onPrevious }: FragileItemsSelectionProps) {
  const handleUpdateItems = (items: FragileItem[]) => {
    onUpdate({ ...data, fragileItems: items });
  };

  const handleUpdateDetails = (details: string) => {
    onUpdate({ ...data, fragileItemsDetails: details });
  };

  return (
    <SpecialItemsSection
      title="Fragile Items"
      subtitle="Select items that require extra care and protection during the move"
      tooltipText="Select items that require extra care and protection during the move. This helps us prepare appropriate packing materials and handling procedures."
      selectedItemsLabel="Selected Items"
      detailsLabel="Additional details regarding fragile items or protection"
      detailsPlaceholder="Example: Antique grandfather clock, crystal chandelier with 12 arms, vintage porcelain collection..."
      items={data.fragileItems}
      details={data.fragileItemsDetails}
      inventoryItems={data.items}
      borderColor="border-red-600"
      bgColor="bg-red-50"
      textColor="text-red-700"
      iconColor="text-red-600"
      onUpdateItems={handleUpdateItems}
      onUpdateDetails={handleUpdateDetails}
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
}

export default FragileItemsStep;
