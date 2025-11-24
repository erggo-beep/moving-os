import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface SelectableCardProps {
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;

  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;

  variant?: 'default' | 'included' | 'bordered';

  bulletPoints?: string[];

  showCounter?: boolean;
  counterValue?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onCounterChange?: (value: number) => void;

  price?: string;
  priceSubtext?: string;

  badge?: string;
  badgeColor?: 'green' | 'red' | 'gray' | 'blue';

  recommendedBadge?: boolean;

  children?: React.ReactNode;
}

function SelectableCard({
  selected,
  onClick,
  disabled = false,
  icon: IconComponent,
  title,
  description,
  variant = 'default',
  bulletPoints,
  showCounter = false,
  counterValue = 0,
  onIncrement,
  onDecrement,
  onCounterChange,
  price,
  priceSubtext,
  badge,
  badgeColor = 'red',
  recommendedBadge = false,
  children,
}: SelectableCardProps) {
  const isIncluded = variant === 'included';
  const isBordered = variant === 'bordered';

  let containerClasses = 'flex items-start p-5 border-2 rounded-lg transition-all ';

  if (isIncluded) {
    containerClasses += 'border-green-200 bg-green-50 ';
  } else if (disabled) {
    containerClasses += 'border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed ';
  } else if (isBordered && selected) {
    containerClasses += 'border-blue-600 bg-blue-50 shadow-sm cursor-pointer ';
  } else if (selected) {
    containerClasses += 'border-red-600 bg-red-50 shadow-sm cursor-pointer ';
  } else {
    containerClasses += 'border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer ';
  }

  const iconColor = isIncluded ? 'text-green-600' : isBordered ? 'text-blue-600' : 'text-red-600';

  const badgeColors = {
    green: 'text-green-700 bg-green-100',
    red: 'text-red-600 bg-red-50',
    gray: 'text-gray-700 bg-gray-100',
    blue: 'text-blue-700 bg-blue-100',
  };

  const handleClick = () => {
    if (!disabled && !isIncluded) {
      onClick();
    }
  };

  const handleCounterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (onCounterChange) {
      onCounterChange(Math.max(0, value));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${containerClasses} relative overflow-visible`}
      disabled={disabled}
    >
      {recommendedBadge && (
        <div className="absolute -top-3 right-4 z-10">
          <span className="inline-block bg-yellow-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
            Recommended
          </span>
        </div>
      )}

      {IconComponent && (
        <IconComponent className={`w-7 h-7 ${iconColor} mr-3 flex-shrink-0`} />
      )}

      <div className="flex-1 text-left">
        <h4 className="font-semibold text-gray-900">{title}</h4>

        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}

        {badge && (
          <span className={`inline-block mt-2 text-xs font-semibold px-3 py-1 rounded-full ${badgeColors[badgeColor]}`}>
            {badge}
          </span>
        )}

        {bulletPoints && bulletPoints.length > 0 && (
          <ul className="mt-3 space-y-2">
            {bulletPoints.map((point, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2.5 mt-1.5 flex-shrink-0"></span>
                <span className="flex-1">{point}</span>
              </li>
            ))}
          </ul>
        )}

        {showCounter && (
          <div className="mt-3 flex items-center justify-between bg-gray-50 rounded-lg p-2" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDecrement?.();
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 text-gray-600" />
            </button>

            <input
              type="number"
              min="0"
              value={counterValue}
              onChange={handleCounterInputChange}
              onClick={(e) => e.stopPropagation()}
              className="w-16 text-center font-semibold text-lg text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onIncrement?.();
              }}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        )}

        {children && (
          <div onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        )}
      </div>

      {price && (
        <div className="ml-4 text-right flex-shrink-0">
          <div className="text-lg font-bold text-red-600">{price}</div>
          {priceSubtext && (
            <div className="text-xs text-gray-600">{priceSubtext}</div>
          )}
        </div>
      )}
    </button>
  );
}

export default SelectableCard;
