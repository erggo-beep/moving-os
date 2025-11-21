import { MapPin } from 'lucide-react';
import { TextInput } from '@moving-company/ui';
import type { AddressFormData } from '@moving-company/types';

interface AddressSectionProps {
  data: Pick<AddressFormData, 'streetAddress' | 'city' | 'zipCode'>;
  onChange: (field: string, value: string) => void;
}

function AddressSection({ data, onChange }: AddressSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-6 h-6 text-red-600" />
        <h3 className="text-lg font-bold text-gray-900">Address</h3>
      </div>

      <div className="space-y-4">
        <TextInput
          label="Street address"
          value={data.streetAddress}
          onChange={(value) => onChange('streetAddress', value)}
          placeholder="Enter street address"
          icon={MapPin}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            label="Postal code"
            value={data.zipCode}
            onChange={(value) => onChange('zipCode', value)}
            placeholder="Enter postal code"
            required
          />

          <TextInput
            label="City"
            value={data.city}
            onChange={(value) => onChange('city', value)}
            placeholder="Enter city"
            required
          />
        </div>
      </div>
    </div>
  );
}

export default AddressSection;
