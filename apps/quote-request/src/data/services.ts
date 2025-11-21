import { Shield, Plug, Package, Gift, Wrench, Droplets, Hammer, Lightbulb, Tv, FileCheck, Sparkles, Recycle } from 'lucide-react';

export interface Service {
  id: string;
  name: string;
  description: string;
  IconComponent: React.ComponentType<{ className?: string }>;
  included?: boolean;
  category: string;
  price?: string;
  priceSubtext?: string;
}

export const services: Service[] = [
  {
    id: 'furniture-protection',
    name: 'Standard Protection of Furniture',
    description: 'Basic protection for your furniture during transport',
    IconComponent: Shield,
    included: true,
    category: 'included',
  },
  {
    id: 'washing-machine',
    name: 'Disconnecting Washing Machine',
    description: 'Professional disconnection of your washing machine',
    IconComponent: Plug,
    included: true,
    category: 'included',
  },
  {
    id: 'moving-boxes',
    name: 'Moving Boxes',
    description: 'High-quality moving boxes in various sizes',
    IconComponent: Package,
    category: 'supplies',
  },
  {
    id: 'packing-materials',
    name: 'Packaging Materials',
    description: 'Bubble wrap, packing tape, and paper',
    IconComponent: Gift,
    category: 'supplies',
  },
  {
    id: 'washing-installation',
    name: 'Washing Machine Installation',
    description: 'Professional installation at your new home',
    IconComponent: Wrench,
    category: 'bathroom',
  },
  {
    id: 'water-outlets',
    name: 'Plugging Bathroom Water Outlets',
    description: 'Connect water outlets for washing machine',
    IconComponent: Droplets,
    category: 'bathroom',
    price: '+25€',
    priceSubtext: 'during move',
  },
  {
    id: 'furniture-assembly',
    name: 'Removal and Assembly of Furniture',
    description: 'Disassemble and reassemble furniture',
    IconComponent: Hammer,
    category: 'other',
  },
  {
    id: 'lamp-installation',
    name: 'Removal and Installation of Lamps',
    description: 'Professional lamp and lighting installation',
    IconComponent: Lightbulb,
    category: 'other',
  },
  {
    id: 'wall-installations',
    name: 'Wall Installations',
    description: 'Mount TVs, shelves, and wall fixtures',
    IconComponent: Tv,
    category: 'other',
  },
  {
    id: 'item-protection',
    name: 'Thorough Item Protection',
    description: 'For extremely fragile or valuable items',
    IconComponent: Shield,
    category: 'protection',
  },
  {
    id: 'floor-protection',
    name: 'Floor Protection',
    description: 'Protective covering for floors during move',
    IconComponent: FileCheck,
    category: 'protection',
  },
  {
    id: 'elevator-protection',
    name: 'Elevator Protection',
    description: 'Mostly for small, expensive elevators',
    IconComponent: Shield,
    category: 'protection',
  },
  {
    id: 'wall-protection',
    name: 'Wall Protection',
    description: 'Recommended for tight stairways inside apartment',
    IconComponent: Shield,
    category: 'protection',
  },
  {
    id: 'packing-service',
    name: 'Packaging Service',
    description: 'Professional packing of your belongings',
    IconComponent: Gift,
    category: 'additional',
  },
  {
    id: 'cleaning',
    name: 'Move-Out Cleaning',
    description: 'Professional cleaning of your old home',
    IconComponent: Sparkles,
    category: 'additional',
  },
  {
    id: 'recycling',
    name: 'Recycling Service',
    description: 'Get rid of old furniture at the same time',
    IconComponent: Recycle,
    category: 'additional',
  },
];
