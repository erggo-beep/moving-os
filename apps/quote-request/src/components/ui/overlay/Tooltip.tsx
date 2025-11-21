import { HelpCircle } from 'lucide-react';
import { useState } from 'react';

interface TooltipProps {
  text: string;
}

function Tooltip({ text }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="text-gray-400 hover:text-red-600 transition-colors focus:outline-none -mb-0.5"
        aria-label="More information"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isVisible && (
        <div className="absolute z-50 w-60 p-2.5 text-sm text-white bg-gray-900 rounded-lg shadow-lg -top-2 left-7 transform">
          <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-3"></div>
          {text}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
