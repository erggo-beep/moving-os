import NavigationButtons from '../../components/NavigationButtons';
import { AddItemCard } from '@moving-company/ui';
import { AddressEditForm } from '@moving-company/forms';
import type { AddressFormData } from '@moving-company/types';

interface AddressEntryProps {
  title: string;
  subtitle: string;
  data: AddressFormData;
  onUpdate: (data: AddressFormData) => void;
  onNext: () => void;
  onPrevious?: () => void;
  onAddAnother?: () => void;
  showAddAnother?: boolean;
  addressType?: 'pickup' | 'dropoff';
}

function AddressDetailsStep({
  title,
  subtitle,
  data,
  onUpdate,
  onNext,
  onPrevious,
  onAddAnother,
  showAddAnother,
  addressType,
}: AddressEntryProps) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-8">{subtitle}</p>

      <AddressEditForm data={data} onChange={onUpdate} />

      {showAddAnother && onAddAnother && (
        <AddItemCard onClick={onAddAnother} addressType={addressType} />
      )}

      <NavigationButtons
        onPrevious={onPrevious}
        onNext={onNext}
        isFirstPage={!onPrevious}
      />
    </div>
  );
}

export default AddressDetailsStep;
