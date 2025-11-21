import type { AddressFormData } from '@moving-company/types';
import AddressSection from './AddressSection';
import PropertySection from './PropertySection';
import AccessSection from './AccessSection';

interface AddressEditFormProps {
  data: AddressFormData;
  onChange: (data: AddressFormData) => void;
  className?: string;
}

function AddressEditForm({ data, onChange, className = '' }: AddressEditFormProps) {
  const handleChange = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className={className}>
      <div className="space-y-10">
        <AddressSection data={data} onChange={handleChange} />
        <PropertySection data={data} onChange={handleChange} />
        <AccessSection data={data} onChange={handleChange} />
      </div>
    </div>
  );
}

export default AddressEditForm;
