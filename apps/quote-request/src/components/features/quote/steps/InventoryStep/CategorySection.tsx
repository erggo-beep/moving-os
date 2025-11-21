import { SelectableCard } from '@moving-company/ui';
import type { Item } from '../../../../../data/itemCategories';

interface CategorySectionProps {
  id: string;
  name: string;
  description: string;
  items: Item[];
  selectedItems: { [key: string]: number };
  onItemIncrement: (itemId: string) => void;
  onItemDecrement: (itemId: string) => void;
  onItemCountChange: (itemId: string, count: number) => void;
}

function CategorySection({
  id,
  name,
  description,
  items,
  selectedItems,
  onItemIncrement,
  onItemDecrement,
  onItemCountChange,
}: CategorySectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-24"
      data-category={id}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <SelectableCard
            key={item.id}
            icon={item.IconComponent}
            title={item.name}
            description={item.description}
            badge={`${item.volume} m³`}
            badgeColor="red"
            selected={false}
            onClick={() => {}}
            showCounter={true}
            counterValue={selectedItems[item.id] || 0}
            onIncrement={() => onItemIncrement(item.id)}
            onDecrement={() => onItemDecrement(item.id)}
            onCounterChange={(value) => onItemCountChange(item.id, value)}
          />
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
