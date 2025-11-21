import { List, Zap } from 'lucide-react';
import SelectableCard from '../../../ui/data-display/SelectableCard';
import NavigationButtons from '../components/NavigationButtons';

interface QuoteTypeData {
  quoteType: string;
}

interface QuoteTypeSelectionProps {
  data: QuoteTypeData;
  onUpdate: (data: QuoteTypeData) => void;
  onSelect: () => void;
  onPrevious: () => void;
}

function QuoteTypeStep({ data, onUpdate, onSelect, onPrevious }: QuoteTypeSelectionProps) {
  const handleCardClick = (type: string) => {
    onUpdate({ quoteType: type });
    onSelect();
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        How precisely do you want to provide item details?
      </h2>
      <p className="text-gray-600 mb-6">
       We use this information to estimate the time and recommend the most cost-efficient crew. You can update your item details anytime, regardless of which option you choose.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectableCard
          icon={List}
          title="Provide a detailed item list - Accurate quote"
          description="Takes a bit more time but ensures the most precise result."
          selected={data.quoteType === 'accurate'}
          onClick={() => handleCardClick('accurate')}
          recommendedBadge={true}
        />
        <SelectableCard
          icon={Zap}
          title="No item list - Estimated quote"
          description="Duration is calculated based on typical amount of items in similar-sized homes. Works if youre amount of items is typical or you already know what how many movers and what size truck you want"
          selected={data.quoteType === 'estimated'}
          onClick={() => handleCardClick('estimated')}
        />
      </div>

      <NavigationButtons
        onPrevious={onPrevious}
        onNext={onSelect}
        showNext={!!data.quoteType}
      />
    </div>
  );
}

export default QuoteTypeStep;
