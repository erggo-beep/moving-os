import { useState, useEffect } from 'react';
import { TextInput } from '@moving-company/ui';
import { Checkbox } from '@moving-company/ui';
import { Button } from '@moving-company/ui';

export interface UnifiedCustomItemFormData {
  name: string;
  additionalDetails: string;
  volume?: number;
  dimensions?: {
    width: number;
    length: number;
    height: number;
  };
  alreadyIncluded?: boolean;
}

interface UnifiedCustomItemFormProps {
  mode: 'add' | 'edit';
  initialData?: UnifiedCustomItemFormData;
  showCheckbox?: boolean;
  onSubmit: (data: UnifiedCustomItemFormData) => void;
  onCancel: () => void;
}

function UnifiedCustomItemForm({
  mode,
  initialData,
  showCheckbox = false,
  onSubmit,
  onCancel,
}: UnifiedCustomItemFormProps) {
  const defaultVolume = 0.3;

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    additionalDetails: initialData?.additionalDetails || '',
    alreadyIncluded: initialData?.alreadyIncluded || false,
  });

  const [showCustomDimensions, setShowCustomDimensions] = useState(false);
  const [volumeMode, setVolumeMode] = useState<'dimensions' | 'direct'>('dimensions');
  const [dimensions, setDimensions] = useState({
    width: '',
    length: '',
    height: '',
  });
  const [directVolume, setDirectVolume] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        additionalDetails: initialData.additionalDetails || '',
        alreadyIncluded: initialData.alreadyIncluded || false,
      });

      if (initialData.dimensions) {
        setShowCustomDimensions(true);
        setVolumeMode('dimensions');
        setDimensions({
          width: initialData.dimensions.width.toString(),
          length: initialData.dimensions.length.toString(),
          height: initialData.dimensions.height.toString(),
        });
      } else if (initialData.volume && initialData.volume !== defaultVolume) {
        setShowCustomDimensions(true);
        setVolumeMode('direct');
        setDirectVolume(initialData.volume.toString());
      }
    }
  }, [initialData]);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDimensionChange = (field: string, value: string) => {
    setDimensions((prev) => ({ ...prev, [field]: value }));
  };

  const calculateVolume = (): number | undefined => {
    if (showCustomDimensions) {
      if (volumeMode === 'direct' && directVolume) {
        return parseFloat(directVolume);
      }
      if (volumeMode === 'dimensions' && dimensions.width && dimensions.length && dimensions.height) {
        return (parseFloat(dimensions.width) * parseFloat(dimensions.length) * parseFloat(dimensions.height)) / 1000000;
      }
    }
    return undefined;
  };

  const getCalculatedVolume = (): number | undefined => {
    return calculateVolume();
  };

  const handleSubmit = () => {
    if (formData.name.trim()) {
      const calculatedVolume = calculateVolume();
      const volume = calculatedVolume !== undefined ? calculatedVolume : defaultVolume;

      const itemData: UnifiedCustomItemFormData = {
        name: formData.name.trim(),
        additionalDetails: formData.additionalDetails.trim(),
        volume,
      };

      if (showCheckbox) {
        itemData.alreadyIncluded = formData.alreadyIncluded;
      }

      if (showCustomDimensions && volumeMode === 'dimensions' && dimensions.width && dimensions.length && dimensions.height) {
        itemData.dimensions = {
          width: parseFloat(dimensions.width),
          length: parseFloat(dimensions.length),
          height: parseFloat(dimensions.height),
        };
      }

      onSubmit(itemData);
    }
  };

  const toggleVolumeMode = () => {
    setVolumeMode(volumeMode === 'dimensions' ? 'direct' : 'dimensions');
    setDimensions({ width: '', length: '', height: '' });
    setDirectVolume('');
  };

  const calculatedVolume = getCalculatedVolume();
  const hasCustomVolume = calculatedVolume !== undefined;

  return (
    <div className="space-y-5">
      <TextInput
        label="Item name"
        value={formData.name}
        onChange={(value) => handleChange('name', value)}
        placeholder="e.g., Antique Cabinet, Guitar Case"
        required
      />

      <TextInput
        label="Additional details"
        value={formData.additionalDetails}
        onChange={(value) => handleChange('additionalDetails', value)}
        placeholder="Optional details about the item..."
      />

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Estimated volume
        </label>

        <div className="flex items-center gap-3 mb-3">
          <span className={`font-medium ${hasCustomVolume ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
            {defaultVolume.toFixed(2)} m³
          </span>
          {hasCustomVolume && (
            <span className="text-gray-900 font-medium">
              {calculatedVolume.toFixed(2)} m³
            </span>
          )}
          {!showCustomDimensions && (
            <Button
              onClick={() => setShowCustomDimensions(true)}
              variant="secondary"
              size="sm"
            >
              +Add custom dimensions
            </Button>
          )}
        </div>

        {showCustomDimensions && (
          <div className="space-y-3">
            {volumeMode === 'dimensions' ? (
              <>
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">Enter dimensions</p>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <TextInput
                        type="number"
                        value={dimensions.width}
                        onChange={(value) => handleDimensionChange('width', value)}
                        placeholder="Width"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">cm</p>
                    </div>
                    <div>
                      <TextInput
                        type="number"
                        value={dimensions.length}
                        onChange={(value) => handleDimensionChange('length', value)}
                        placeholder="Length"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">cm</p>
                    </div>
                    <div>
                      <TextInput
                        type="number"
                        value={dimensions.height}
                        onChange={(value) => handleDimensionChange('height', value)}
                        placeholder="Height"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">cm</p>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={toggleVolumeMode}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Add volume instead
                </button>
              </>
            ) : (
              <>
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-2">Enter volume</p>
                  <TextInput
                    type="number"
                    value={directVolume}
                    onChange={setDirectVolume}
                    placeholder="Volume"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-xs text-gray-500 mt-1">m³</p>
                </div>
                <button
                  type="button"
                  onClick={toggleVolumeMode}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Add dimensions instead
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {showCheckbox && (
        <Checkbox
          id="alreadyIncluded"
          checked={formData.alreadyIncluded}
          onChange={(checked) => handleChange('alreadyIncluded', checked)}
          label="This item was already included in the furniture list or is too small to affect volume calculations"
        />
      )}

      <div className="flex gap-3 pt-4">
        <Button onClick={onCancel} variant="secondary" fullWidth>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!formData.name.trim()}
          variant="primary"
          fullWidth
        >
          {mode === 'edit' ? 'Save Changes' : 'Add Item'}
        </Button>
      </div>
    </div>
  );
}

export default UnifiedCustomItemForm;
