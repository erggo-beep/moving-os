import AddressSection from './AddressSection';
import PropertySection from './PropertySection';
import AccessSection from './AccessSection';

interface AddressData {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  squareMeters: string;
  squareMetersNotApplicable: boolean;
  floor: string;
  multipleFloors: boolean;
  elevator: string;
  access: string;
  walkingDistance: string;
  additionalDetails: string;
}

interface AddressEntryProps {
  title: string;
  subtitle: string;
  data: AddressData;
  onUpdate: (data: AddressData) => void;
}

function AddressDetailsStep({
  title,
  subtitle,
  data,
  onUpdate,
}: AddressEntryProps) {
  const handleChange = (field: string, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-8">{subtitle}</p>

      <div className="space-y-10">
        <AddressSection data={data} onChange={handleChange} />
        <PropertySection data={data} onChange={handleChange} />
        <AccessSection data={data} onChange={handleChange} />
      </div>
    </div>
  );
}

export default AddressDetailsStep;
