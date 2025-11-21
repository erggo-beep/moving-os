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

export type ItemCategory = Record<string, Item[]>;
