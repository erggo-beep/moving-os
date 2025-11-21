import { Package, Trash2, Briefcase, Armchair, CircleDot, Bed, Table2, MonitorDown, BookOpen, Shirt, Grid3x3, Tv, Bike, Flower2, Flame, Lamp, Lightbulb, Layers } from 'lucide-react';

export interface Item {
  id: string;
  name: string;
  description: string;
  volume: number;
  IconComponent: React.ComponentType<{ className?: string }>;
  isCustom?: boolean;
  details?: string;
  dimensions?: {
    width: number;
    length: number;
    height: number;
  };
}

export const itemCategories: Record<string, Item[]> = {
  'Small Items': [
    { id: 'moving-box', name: 'Moving Box', description: '60L capacity', volume: 0.08, IconComponent: Package },
    { id: 'trash-bag', name: 'Trash Bag', description: '100L', volume: 0.05, IconComponent: Trash2 },
    { id: 'big-suitcase', name: 'Big Suitcase', description: 'Checked luggage', volume: 0.15, IconComponent: Briefcase },
    { id: 'small-suitcase', name: 'Small Suitcase', description: 'Carry-on', volume: 0.08, IconComponent: Briefcase },
  ],
  'Items to Sit On': [
    { id: 'bench', name: 'Bench', description: 'For 2-3 people', volume: 0.8, IconComponent: Armchair },
    { id: 'chair', name: 'Chair', description: 'Dining or desk', volume: 0.4, IconComponent: Armchair },
    { id: 'office-chair', name: 'Office Chair', description: 'Swivel with armrests', volume: 0.6, IconComponent: CircleDot },
    { id: 'lounger', name: 'Lounger', description: 'Armchair', volume: 1.8, IconComponent: Armchair },
    { id: 'bean-bag', name: 'Bean Bag', description: 'Comfortable seating', volume: 0.5, IconComponent: CircleDot },
    { id: 'sofa-2', name: '2-Seater Sofa', description: 'Loveseat', volume: 2.0, IconComponent: Armchair },
    { id: 'sofa-3', name: '3-Seater Sofa', description: 'Standard sofa', volume: 2.8, IconComponent: Armchair },
    { id: 'divan-sofa', name: 'Divan Sofa', description: 'Sectional', volume: 3.5, IconComponent: Armchair },
  ],
  'Beds': [
    { id: 'single-bed', name: 'Single Bed', description: '90x200 cm', volume: 1.5, IconComponent: Bed },
    { id: 'double-bed', name: 'Double Bed', description: '140x200 cm', volume: 2.0, IconComponent: Bed },
    { id: 'queen-bed', name: 'Queen Bed', description: '160x200 cm', volume: 2.5, IconComponent: Bed },
    { id: 'king-bed', name: 'King Size Bed', description: '180x200 cm', volume: 3.0, IconComponent: Bed },
  ],
  'Tables': [
    { id: 'coffee-table', name: 'Coffee Table', description: 'Living room', volume: 0.6, IconComponent: Table2 },
    { id: 'dining-table', name: 'Dining Table', description: 'For 4-6 people', volume: 1.2, IconComponent: Table2 },
    { id: 'desk', name: 'Desk', description: 'Work or study', volume: 0.8, IconComponent: MonitorDown },
    { id: 'side-table', name: 'Side Table', description: 'Nightstand', volume: 0.3, IconComponent: Table2 },
  ],
  'Storage': [
    { id: 'bookshelf', name: 'Bookshelf', description: '5-6 shelves', volume: 1.5, IconComponent: BookOpen },
    { id: 'wardrobe-small', name: 'Wardrobe Small', description: '2 doors', volume: 2.0, IconComponent: Shirt },
    { id: 'wardrobe-large', name: 'Wardrobe Large', description: '3+ doors', volume: 3.5, IconComponent: Shirt },
    { id: 'chest-drawers', name: 'Chest of Drawers', description: '4-5 drawers', volume: 1.0, IconComponent: Grid3x3 },
    { id: 'tv-stand', name: 'TV Stand', description: 'Media console', volume: 0.7, IconComponent: Tv },
  ],
  'Outdoor': [
    { id: 'bicycle', name: 'Bicycle', description: 'Standard bike', volume: 0.5, IconComponent: Bike },
    { id: 'garden-furniture', name: 'Garden Furniture', description: 'Set of 4', volume: 2.0, IconComponent: Flower2 },
    { id: 'bbq-grill', name: 'BBQ Grill', description: 'Outdoor grill', volume: 0.8, IconComponent: Flame },
  ],
  'Lighting': [
    { id: 'floor-lamp', name: 'Floor Lamp', description: 'Standing lamp', volume: 0.3, IconComponent: Lamp },
    { id: 'table-lamp', name: 'Table Lamp', description: 'Desk lamp', volume: 0.1, IconComponent: Lightbulb },
    { id: 'chandelier', name: 'Chandelier', description: 'Ceiling fixture', volume: 0.4, IconComponent: Layers },
  ],
};
