import { List, Zap } from 'lucide-react';
import { SelectableCard } from '@moving-company/ui';
import type { QuoteTypeFormData } from '@moving-company/types';

interface QuoteTypeSelectorProps {
  data: QuoteTypeFormData;
  onChange: (data: QuoteTypeFormData) => void;
  onSelect?: () => void;
  compact?: boolean;
  className?: string;
}

function QuoteTypeSelector({
  data,
  onChange,
  onSelect,
  compact = false,
  className = '',
}: QuoteTypeSelectorProps) {
  const handleCardClick = (type: string) => {
    onChange({ quoteType: type });
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div className={className}>
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6`}>
        <SelectableCard
          title="Detailed Inventory"
          description="I'll provide a detailed list of all items to be moved"
          icon={List}
          selected={data.quoteType === 'detailed'}
          onClick={() => handleCardClick('detailed')}
        />
        <SelectableCard
          title="Quick Estimate"
          description="I'll provide basic details for a general estimate"
          icon={Zap}
          selected={data.quoteType === 'quick'}
          onClick={() => handleCardClick('quick')}
        />
      </div>
    </div>
  );
}

export default QuoteTypeSelector;
