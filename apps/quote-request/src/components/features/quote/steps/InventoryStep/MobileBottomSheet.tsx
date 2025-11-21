import { useState } from 'react';
import { BottomSheet } from '@moving-company/ui';

interface MobileBottomSheetProps {
  totalVolume: string;
  selectedItems: Array<{ name: string; count: number }>;
}

function MobileBottomSheet({ totalVolume, selectedItems }: MobileBottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const collapsedContent = (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-600">ESTIMATED VOLUME</p>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-red-600">{totalVolume}</span>
            <span className="text-sm text-gray-600">m³</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs font-semibold text-gray-600">SELECTED ITEMS</p>
          <p className="text-2xl font-bold text-gray-900">{selectedItems.length}</p>
        </div>
      </div>
    </div>
  );

  const expandedContent = (
    <div className="px-4 pb-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600 mb-1">
          Estimated Volume
        </h3>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-red-600">{totalVolume}</span>
          <span className="text-lg text-gray-600">m³</span>
        </div>
      </div>

      {selectedItems.length > 0 ? (
        <>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            SELECTED ITEMS ({selectedItems.length})
          </h4>
          <div className="space-y-2">
            {selectedItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
              >
                <span className="text-sm text-gray-700">{item.name}</span>
                <span className="text-sm font-semibold text-gray-900">
                  {item.count}x
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 text-sm">No items selected yet</p>
        </div>
      )}
    </div>
  );

  return (
    <BottomSheet
      isOpen={true}
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
      collapsedHeight={80}
      maxHeight="70vh"
      collapsedContent={collapsedContent}
    >
      {expandedContent}
    </BottomSheet>
  );
}

export default MobileBottomSheet;
