import { useEffect, useRef, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onClose?: () => void;
  collapsedHeight?: number;
  maxHeight?: string;
  children: React.ReactNode;
  collapsedContent?: React.ReactNode;
}

function BottomSheet({
  isOpen,
  isExpanded,
  onToggle,
  collapsedHeight = 80,
  maxHeight = '70vh',
  children,
  collapsedContent,
}: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    const isUpSwipe = distance > minSwipeDistance;
    const isDownSwipe = distance < -minSwipeDistance;

    if (isUpSwipe && !isExpanded) {
      onToggle();
    } else if (isDownSwipe && isExpanded) {
      onToggle();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isExpanded]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        onToggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, onToggle]);

  useEffect(() => {
    if (isExpanded && sheetRef.current) {
      const firstFocusable = sheetRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [isExpanded]);

  if (!isOpen) return null;

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden backdrop-enter"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <div
        ref={sheetRef}
        role="dialog"
        aria-modal={isExpanded}
        aria-label="Volume summary"
        aria-expanded={isExpanded}
        className={`
          fixed bottom-0 left-0 right-0 z-50 bg-white
          rounded-t-2xl shadow-2xl bottom-sheet-transition
          lg:hidden safe-area-bottom
        `}
        style={{
          height: isExpanded ? maxHeight : `${collapsedHeight}px`,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex justify-center py-2 cursor-pointer"
          onClick={onToggle}
          role="button"
          tabIndex={0}
          aria-label={isExpanded ? 'Collapse summary' : 'Expand summary'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onToggle();
            }
          }}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full transition-colors hover:bg-gray-400" />
        </div>

        <div
          className="overflow-y-auto"
          style={{ height: 'calc(100% - 24px)' }}
        >
          {isExpanded ? children : collapsedContent}
        </div>

        <button
          onClick={onToggle}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronUp className="w-5 h-5" />
          )}
        </button>
      </div>
    </>
  );
}

export default BottomSheet;
