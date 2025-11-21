import { Building2, Home, HomeIcon, Warehouse, Package, ArrowUp, User, Ban, Ruler } from 'lucide-react';
import Tooltip from '../../../../ui/overlay/Tooltip';
import SelectableCard from '../../../../ui/data-display/SelectableCard';
import SelectDropdown from '../../../../ui/forms/SelectDropdown';
import TextInput from '../../../../ui/forms/TextInput';
import Checkbox from '../../../../ui/forms/Checkbox';

interface PropertyData {
  propertyType: string;
  squareMeters: string;
  squareMetersNotApplicable: boolean;
  floor: string;
  multipleFloors: boolean;
  elevator: string;
}

interface PropertySectionProps {
  data: PropertyData;
  onChange: (field: string, value: any) => void;
}

const propertyTypes = [
  { value: 'apartment', label: 'Apartment building', IconComponent: Building2 },
  { value: 'detached', label: 'Detached house', IconComponent: Home },
  { value: 'rowhouse', label: 'Rowhouse / Semi-detached', IconComponent: HomeIcon },
  { value: 'warehouse', label: 'Warehouse', IconComponent: Warehouse },
];

const elevatorTypes = [
  { value: 'goods', label: 'Goods elevator', IconComponent: Package },
  { value: 'normal', label: 'Normal elevator', IconComponent: ArrowUp },
  { value: 'small', label: 'Small elevator', IconComponent: User },
  { value: 'none', label: 'No elevator', IconComponent: Ban },
];

const floorOptions = [
  { value: '', label: 'Select floor...' },
  { value: 'ground', label: 'Ground Floor' },
  { value: '1', label: '1st Floor' },
  { value: '2', label: '2nd Floor' },
  { value: '3', label: '3rd Floor' },
  { value: '4', label: '4th Floor' },
  { value: '5+', label: '5th Floor or Higher' },
];

function PropertySection({ data, onChange }: PropertySectionProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Building2 className="w-6 h-6 text-red-600" />
        <h3 className="text-lg font-bold text-gray-900">Property</h3>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <label className="block text-sm font-semibold text-gray-900">
              Property type <span className="text-red-600">*</span>
            </label>
            <Tooltip text="Select the type of property you're moving from. This helps us prepare the right equipment and plan access routes." />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {propertyTypes.map((type) => (
              <SelectableCard
                key={type.value}
                icon={type.IconComponent}
                title={type.label}
                selected={data.propertyType === type.value}
                onClick={() => onChange('propertyType', type.value)}
              />
            ))}
          </div>
        </div>

        {data.propertyType && data.propertyType !== 'warehouse' && (
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={data.multipleFloors}
                onChange={(e) => onChange('multipleFloors', e.target.checked)}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-900 font-medium">
                The apartment has multiple floors
              </span>
              <Tooltip text="Check this if your apartment has stairs inside, like a loft or maisonette." />
            </label>
          </div>
        )}

        {data.propertyType === 'apartment' && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <label className="block text-sm font-semibold text-gray-900">
                Floor <span className="text-red-600">*</span>
              </label>
              <Tooltip text="The floor level affects pricing. Ground floor moves are typically faster and easier." />
            </div>
            <SelectDropdown
              value={data.floor}
              onChange={(value) => onChange('floor', value)}
              options={floorOptions}
              placeholder="Select floor..."
            />
          </div>
        )}

        {data.propertyType === 'apartment' && data.floor && data.floor !== 'ground' && (
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <label className="block text-sm font-semibold text-gray-900">
                Is there an elevator in the building?
              </label>
              <Tooltip text="Elevator type affects how we plan the move. Goods elevators are ideal, but we can work with any type or stairs." />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {elevatorTypes.map((type) => (
                <SelectableCard
                  key={type.value}
                  icon={type.IconComponent}
                  title={type.label}
                  selected={data.elevator === type.value}
                  onClick={() => onChange('elevator', type.value)}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center gap-1.5 mb-3">
            <label className="block text-sm font-semibold text-gray-900">
              Apartment Size
            </label>
            <Tooltip text="Enter the approximate size or select 'Not Applicable' if you're only moving a few items. This helps us estimate the move duration." />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Ruler className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={data.squareMeters}
                  onChange={(e) => {
                    onChange('squareMeters', e.target.value);
                    if (e.target.value && data.squareMetersNotApplicable) {
                      onChange('squareMetersNotApplicable', false);
                    }
                  }}
                  disabled={data.squareMetersNotApplicable}
                  min="0"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter size"
                />
                <span className="absolute right-4 top-3 text-gray-500">m²</span>
              </div>
            </div>

            <span className="text-sm font-medium text-gray-500 self-center">or</span>

            <div className="flex items-start">
              <Checkbox
                checked={data.squareMetersNotApplicable}
                onChange={(checked) => {
                  onChange('squareMetersNotApplicable', checked);
                  if (checked) {
                    onChange('squareMeters', '');
                  }
                }}
                label="Size not applicable"
              />
              <div className="ml-1 mt-0.5">
                <Tooltip text="Check this if you're only moving a few items or a small portion of belongings, where apartment size doesn't accurately describe your move." />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertySection;
