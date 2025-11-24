import SpecialItemsSection from '../components/SpecialItemsSection';
import { FragileItem } from '../QuoteWizard';

interface HeavyItemsData {
  quoteType: string;
  items: { [key: string]: number };
  additionalNotes: string;
  fragileItems: FragileItem[];
  fragileItemsDetails: string;
  heavyItems: FragileItem[];
  heavyItemsDetails: string;
}

interface HeavyItemsSelectionProps {
  data: HeavyItemsData;
  onUpdate: (data: HeavyItemsData) => void;
}

function HeavyItemsStep({ data, onUpdate }: HeavyItemsSelectionProps) {
  const handleUpdateItems = (items: FragileItem[]) => {
    onUpdate({ ...data, heavyItems: items });
  };

  const handleUpdateDetails = (details: string) => {
    onUpdate({ ...data, heavyItemsDetails: details });
  };

  return (
    <SpecialItemsSection
      title="Heavy Items (+100kg)"
      subtitle="Select items that weigh over 100kg and require special handling"
      tooltipText="Select items that weigh over 100kg. These items require special equipment and handling procedures to ensure safe transport."
      selectedItemsLabel="Selected Items"
      detailsLabel="Additional details regarding heavy items or handling requirements"
      detailsPlaceholder="Example: Grand piano (300kg), Industrial safe (250kg), Large marble table (180kg)..."
      items={data.heavyItems}
      details={data.heavyItemsDetails}
      inventoryItems={data.items}
      borderColor="border-orange-600"
      bgColor="bg-orange-50"
      textColor="text-orange-700"
      onUpdateItems={handleUpdateItems}
      onUpdateDetails={handleUpdateDetails}
    />
  );
}

export default HeavyItemsStep;
