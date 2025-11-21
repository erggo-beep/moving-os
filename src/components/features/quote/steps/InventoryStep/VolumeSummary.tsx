interface SelectedItem {
  name: string;
  count: number;
}

interface VolumeSummaryProps {
  totalVolume: string;
  selectedItems: SelectedItem[];
}

function VolumeSummary({ totalVolume, selectedItems }: VolumeSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <h3 className="text-sm font-semibold text-gray-600 mb-2">
        Estimated Volume of Selected Items
      </h3>
      <div className="text-5xl font-bold text-red-600 mb-1">
        {totalVolume}
      </div>
      <div className="text-lg text-gray-600 mb-6">m³</div>

      {selectedItems.length > 0 && (
        <>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            SELECTED ITEMS
          </h4>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {selectedItems.map((item, index) => (
              <div
                key={index}
                className="text-sm text-gray-700 flex justify-between"
              >
                <span className="flex-1">{item.count}x {item.name}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default VolumeSummary;
