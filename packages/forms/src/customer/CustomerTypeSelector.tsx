import { SelectableCard } from '@moving-company/ui';
import { Home, Building2 } from 'lucide-react';
import type { CustomerTypeFormData } from '@moving-company/types';

interface CustomerTypeSelectorProps {
  data: CustomerTypeFormData;
  onChange: (data: CustomerTypeFormData) => void;
  onSelect?: () => void;
  compact?: boolean;
  className?: string;
}

function CustomerTypeSelector({
  data,
  onChange,
  onSelect,
  compact = false,
  className = '',
}: CustomerTypeSelectorProps) {
  const handleCardClick = (type: string) => {
    onChange({ customerType: type });
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div className={className}>
      <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 ${compact ? 'sm:grid-cols-2' : ''}`}>
        <SelectableCard
          id="private"
          title="Private Individual"
          description="Moving to or from a home"
          IconComponent={Home}
          isSelected={data.customerType === 'private'}
          onSelect={() => handleCardClick('private')}
        />
        <SelectableCard
          id="business"
          title="Business"
          description="Office or commercial move"
          IconComponent={Building2}
          isSelected={data.customerType === 'business'}
          onSelect={() => handleCardClick('business')}
        />
      </div>
    </div>
  );
}

export default CustomerTypeSelector;
