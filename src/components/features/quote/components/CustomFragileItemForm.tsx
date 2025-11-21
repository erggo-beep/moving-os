import UnifiedCustomItemForm, { UnifiedCustomItemFormData } from './UnifiedCustomItemForm';

export interface CustomFragileItemData {
  name: string;
  additionalDetails: string;
  length: string;
  width: string;
  height: string;
  alreadyIncluded: boolean;
}

interface CustomFragileItemFormProps {
  onAdd: (item: CustomFragileItemData) => void;
  onCancel: () => void;
}

function CustomFragileItemForm({ onAdd, onCancel }: CustomFragileItemFormProps) {
  const handleSubmit = (data: UnifiedCustomItemFormData) => {
    const dimensions = data.dimensions;
    const fragileItemData: CustomFragileItemData = {
      name: data.name,
      additionalDetails: data.additionalDetails,
      length: dimensions?.length.toString() || '',
      width: dimensions?.width.toString() || '',
      height: dimensions?.height.toString() || '',
      alreadyIncluded: data.alreadyIncluded || false,
    };

    onAdd(fragileItemData);
  };

  return (
    <UnifiedCustomItemForm
      mode="add"
      showCheckbox={true}
      onSubmit={handleSubmit}
      onCancel={onCancel}
    />
  );
}

export default CustomFragileItemForm;
