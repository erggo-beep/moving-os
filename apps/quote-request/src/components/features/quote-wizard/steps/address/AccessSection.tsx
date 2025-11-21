import { Truck, Footprints } from 'lucide-react';
import { Tooltip } from '@moving-company/ui';
import { SelectableCard } from '@moving-company/ui';
import { TextInput } from '@moving-company/ui';
import { TextArea } from '@moving-company/ui';

interface AccessData {
  access: string;
  walkingDistance: string;
  additionalDetails: string;
}

interface AccessSectionProps {
  data: AccessData;
  onChange: (field: string, value: string) => void;
}

const accessTypes = [
  { value: 'direct', label: 'Direct access', IconComponent: Truck },
  { value: 'walking', label: 'Longer walking distance', IconComponent: Footprints },
];

function AccessSection({ data, onChange }: AccessSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Truck className="w-6 h-6 text-red-600" />
        <h3 className="text-lg font-bold text-gray-900">Access</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <label className="block text-sm font-semibold text-gray-900">
              Access <span className="text-red-600">*</span>
            </label>
            <Tooltip text="Tell us about vehicle access. Direct access allows us to park close to the entrance, saving time and cost." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {accessTypes.map((type) => (
              <SelectableCard
                key={type.value}
                icon={type.IconComponent}
                title={type.label}
                selected={data.access === type.value}
                onClick={() => onChange('access', type.value)}
              />
            ))}
          </div>
        </div>

        {data.access === 'walking' && (
          <TextInput
            type="number"
            label="Walking distance to car is approximately"
            value={data.walkingDistance}
            onChange={(value) => onChange('walkingDistance', value)}
            placeholder="0"
            className="pr-20"
          />
        )}

        <TextArea
          label="Additional arrival details"
          value={data.additionalDetails}
          onChange={(value) => onChange('additionalDetails', value)}
          placeholder="e.g., door code, specific instructions for the driver..."
          rows={4}
        />
      </div>
    </div>
  );
}

export default AccessSection;
