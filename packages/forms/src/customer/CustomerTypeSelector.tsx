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
          title="Private Individual"
          description="Moving to or from a home"
          icon={Home}
          selected={data.customerType === 'private'}
          onClick={() => handleCardClick('private')}
        />
        <SelectableCard
          title="Business"
          description="Office or commercial move"
          icon={Building2}
          selected={data.customerType === 'business'}
          onClick={() => handleCardClick('business')}
        />
      </div>
    </div>
  );
}

export default CustomerTypeSelector;
