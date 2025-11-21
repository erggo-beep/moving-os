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
          id="detailed"
          title="Detailed Inventory"
          description="I'll provide a detailed list of all items to be moved"
          IconComponent={List}
          isSelected={data.quoteType === 'detailed'}
          onSelect={() => handleCardClick('detailed')}
        />
        <SelectableCard
          id="quick"
          title="Quick Estimate"
          description="I'll provide basic details for a general estimate"
          IconComponent={Zap}
          isSelected={data.quoteType === 'quick'}
          onSelect={() => handleCardClick('quick')}
        />
      </div>
    </div>
  );
}

export default QuoteTypeSelector;
