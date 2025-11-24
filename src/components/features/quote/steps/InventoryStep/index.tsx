import { useState, useMemo, useEffect, useRef } from 'react';
import { Package } from 'lucide-react';
import Tooltip from '../../../../ui/overlay/Tooltip';
import CategoryNavigation from './CategoryNavigation';
import CategorySection from './CategorySection';
import CustomItemsSection from './CustomItemsSection';
import VolumeSummary from './VolumeSummary';
import MobileBottomSheet from './MobileBottomSheet';
import InfoCard from '../../../../ui/data-display/InfoCard';
import { itemCategories, type Item } from '../../../../../data/itemCategories';
import type { CustomItemFormData } from '../../components/AddCustomItemModal';

const categoryDescriptions: Record<string, string> = {
  'Small Items': 'Essential packing containers and storage items',
  'Items to Sit On': 'Chairs, sofas, benches, and seating furniture',
  'Beds': 'All bed sizes and mattresses',
  'Tables': 'Dining, coffee, and desk tables',
  'Storage': 'Wardrobes, shelves, and storage units',
  'Outdoor': 'Garden and outdoor equipment',
  'Lighting': 'Lamps and light fixtures',
  'Custom Item': 'Is something missing from the list? Add it here.',
};

interface InventoryData {
  quoteType: string;
  items: { [key: string]: number };
  additionalNotes: string;
}

interface InventorySelectionProps {
  data: InventoryData;
  onUpdate: (data: InventoryData) => void;
}

function InventoryStep({ data, onUpdate }: InventorySelectionProps) {
  const [activeCategory, setActiveCategory] = useState('category-small-items');
  const [showMobileSheet, setShowMobileSheet] = useState(true);
  const [customItems, setCustomItems] = useState<Item[]>([]);
  const desktopSummaryRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(() => {
    const standardCategories = Object.keys(itemCategories).map(categoryName => ({
      id: `category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`,
      name: categoryName,
    }));
    return [
      ...standardCategories,
      { id: 'category-custom-item', name: 'Custom Item' },
    ];
  }, []);

  const allItems = useMemo(
    () => [...Object.values(itemCategories).flat(), ...customItems],
    [customItems]
  );

  const totalVolume = useMemo(() => {
    let total = 0;
    Object.entries(data.items).forEach(([itemId, count]) => {
      const item = allItems.find((i) => i.id === itemId);
      if (item) {
        total += item.volume * count;
      }
    });
    return total.toFixed(1);
  }, [data.items, allItems]);

  const selectedItems = useMemo(() => {
    const selected: { name: string; count: number }[] = [];
    Object.entries(data.items).forEach(([itemId, count]) => {
      const item = allItems.find((i) => i.id === itemId);
      if (item) {
        selected.push({ name: item.name, count });
      }
    });
    return selected;
  }, [data.items, allItems]);

  const handleItemChange = (itemId: string, change: number) => {
    const currentCount = data.items[itemId] || 0;
    const newCount = Math.max(0, currentCount + change);

    const newItems = { ...data.items };
    if (newCount === 0) {
      delete newItems[itemId];
    } else {
      newItems[itemId] = newCount;
    }

    onUpdate({ ...data, items: newItems });
  };

  const handleItemCountChange = (itemId: string, newCount: number) => {
    const newItems = { ...data.items };
    if (newCount === 0) {
      delete newItems[itemId];
    } else {
      newItems[itemId] = newCount;
    }

    onUpdate({ ...data, items: newItems });
  };

  const handleAddCustomItem = (itemData: CustomItemFormData) => {
    const newItem: Item = {
      id: `custom-${Date.now()}`,
      name: itemData.name,
      description: itemData.additionalDetails || 'Custom item',
      volume: itemData.volume,
      IconComponent: Package,
      isCustom: true,
      details: itemData.additionalDetails,
      dimensions: itemData.dimensions,
    };

    setCustomItems((prev) => [...prev, newItem]);

    const newItems = { ...data.items, [newItem.id]: 1 };
    onUpdate({ ...data, items: newItems });
  };

  const handleEditCustomItem = (itemId: string, itemData: CustomItemFormData) => {
    setCustomItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              name: itemData.name,
              description: itemData.additionalDetails || 'Custom item',
              volume: itemData.volume,
              details: itemData.additionalDetails,
              dimensions: itemData.dimensions,
            }
          : item
      )
    );
  };

  const handleRemoveCustomItem = (itemId: string) => {
    setCustomItems((prev) => prev.filter((item) => item.id !== itemId));

    const newItems = { ...data.items };
    delete newItems[itemId];
    onUpdate({ ...data, items: newItems });
  };

  const scrollToCategory = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px',
      }
    );

    categories.forEach((category) => {
      const element = document.getElementById(category.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [categories]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowMobileSheet(!entry.isIntersecting);
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px 0px 0px',
      }
    );

    if (desktopSummaryRef.current) {
      observer.observe(desktopSummaryRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        <h2 className="text-3xl font-bold text-gray-900">
          What needs to be moved?
        </h2>
        <Tooltip text="Select all items you're moving. We calculate the total volume to give you an accurate estimate. Don't worry if you're not sure about quantities - you can adjust these later." />
      </div>
      <p className="text-gray-600 mb-6">
        Select items to calculate total volume and plan your move efficiently
      </p>

      <div className="mb-6">
        <InfoCard>
          <p>
            <strong>Note:</strong> To get the most accurate estimate, make sure to add all items which are big enough to affect the total volume. If you cannot find the correct item from the list, you can select one with around same size or add a custom item.
          </p>
        </InfoCard>
      </div>

      <CategoryNavigation
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {Object.entries(itemCategories).map(([categoryName, items]) => {
              const categoryId = `category-${categoryName.toLowerCase().replace(/\s+/g, '-')}`;
              const description = categoryDescriptions[categoryName] || '';

              return (
                <CategorySection
                  key={categoryId}
                  id={categoryId}
                  name={categoryName}
                  description={description}
                  items={items}
                  selectedItems={data.items}
                  onItemIncrement={(itemId) => handleItemChange(itemId, 1)}
                  onItemDecrement={(itemId) => handleItemChange(itemId, -1)}
                  onItemCountChange={handleItemCountChange}
                />
              );
            })}

            <CustomItemsSection
              customItems={customItems}
              selectedItems={data.items}
              onItemIncrement={(itemId) => handleItemChange(itemId, 1)}
              onItemDecrement={(itemId) => handleItemChange(itemId, -1)}
              onItemCountChange={handleItemCountChange}
              onAddCustomItem={handleAddCustomItem}
              onEditCustomItem={handleEditCustomItem}
              onRemoveCustomItem={handleRemoveCustomItem}
            />
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-1">
          <VolumeSummary
            totalVolume={totalVolume}
            selectedItems={selectedItems}
          />
        </div>

        <div
          ref={desktopSummaryRef}
          className="lg:hidden lg:col-span-1"
        >
          <VolumeSummary
            totalVolume={totalVolume}
            selectedItems={selectedItems}
          />
        </div>
      </div>

      {showMobileSheet && (
        <MobileBottomSheet
          totalVolume={totalVolume}
          selectedItems={selectedItems}
        />
      )}
    </div>
  );
}

export default InventoryStep;
