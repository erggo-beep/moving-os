import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateStatus {
  isDisabled?: boolean;
  isFull?: boolean; // Deprecated: use availability instead
  availability?: 'available' | 'nearly-full' | 'full';
  surcharge?: string;
}

interface LegendItem {
  label: string;
  visual: 'available' | 'disabled' | 'nearly-full' | 'full' | 'surcharge';
}

interface DateSelectorProps {
  isOpen: boolean;
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
  onClose: () => void;
  getDateStatus: (date: string) => DateStatus;
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
  customLegendItems?: LegendItem[];
}

interface CalendarDay {
  date: Date;
  dateString: string;
  isCurrentMonth: boolean;
  isToday: boolean;
}

function DateSelector({
  isOpen,
  selectedDate,
  onDateSelect,
  onClose,
  getDateStatus,
  title = 'Select Date',
  subtitle = 'Choose a date that works for you',
  showLegend = false,
  customLegendItems
}: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) {
      return new Date(selectedDate);
    }
    return new Date();
  });

  if (!isOpen) return null;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  // Convert JavaScript day (0=Sunday) to ISO day (0=Monday, 6=Sunday)
  let firstDayOfWeek = firstDayOfMonth.getDay();
  firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays: CalendarDay[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Add days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i);
    calendarDays.push({
      date,
      dateString: formatDateISO(date),
      isCurrentMonth: false,
      isToday: false,
    });
  }

  // Add days from current month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const isToday = date.getTime() === today.getTime();
    calendarDays.push({
      date,
      dateString: formatDateISO(date),
      isCurrentMonth: true,
      isToday,
    });
  }

  // Add days from next month
  const remainingDays = 42 - calendarDays.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    calendarDays.push({
      date,
      dateString: formatDateISO(date),
      isCurrentMonth: false,
      isToday: false,
    });
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return;

    const status = getDateStatus(day.dateString);
    if (status.isDisabled || status.isFull) return;

    onDateSelect(day.dateString);
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto animate-scaleIn">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Calendar Header */}
        <div className="px-6 py-4 flex items-center justify-between">
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 hover:bg-gray-100 rounded-lg font-semibold text-gray-700 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-xl font-bold text-gray-900">
            {monthNames[month]} {year}
          </div>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 hover:bg-gray-100 rounded-lg font-semibold text-gray-700 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar with unified grid */}
        <div className="px-4 sm:px-6 pb-6">
          {/* Instruction text */}
          <p className="text-sm text-gray-600 mb-4 text-center">
            {subtitle}
          </p>

          {/* Single unified grid for both header and days */}
          <div className="grid grid-cols-7 gap-2 sm:gap-3">
            {/* Week day headers */}
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-600 pb-2">
                {day}
              </div>
            ))}

            {/* Day cells */}
            {calendarDays.map((day, index) => {
              const status = day.isCurrentMonth ? getDateStatus(day.dateString) : { isDisabled: true };
              const isSelected = selectedDate === day.dateString;

              return (
                <DayCell
                  key={index}
                  day={day}
                  status={status}
                  isSelected={isSelected}
                  onClick={() => handleDayClick(day)}
                />
              );
            })}
          </div>
        </div>

        {/* Footer */}
        {showLegend && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <Legend customItems={customLegendItems} />
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {!showLegend && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 flex justify-center sm:justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface DayCellProps {
  day: CalendarDay;
  status: DateStatus;
  isSelected: boolean;
  onClick: () => void;
}

function DayCell({ day, status, isSelected, onClick }: DayCellProps) {
  const dayNumber = day.date.getDate();

  if (!day.isCurrentMonth) {
    return (
      <div className="aspect-square w-full flex flex-col items-center justify-center rounded-lg bg-transparent">
        <span className="text-gray-300 text-xs sm:text-sm">{dayNumber}</span>
      </div>
    );
  }

  // Normalize status: support both old isFull and new availability
  const availability = status.isFull ? 'full' : (status.availability || 'available');

  let cellClasses = 'relative aspect-square w-full flex flex-col items-center justify-center rounded-lg transition-all duration-200 ';
  let textClasses = 'text-sm sm:text-base lg:text-lg ';

  if (isSelected) {
    cellClasses += 'bg-green-500 border-2 border-green-600 shadow-lg cursor-pointer hover:scale-105 ';
    textClasses += 'text-white font-bold';
  } else if (status.isDisabled) {
    cellClasses += 'bg-gray-50 border-2 border-gray-100 opacity-60 cursor-not-allowed ';
    textClasses += 'text-gray-300 font-medium';
  } else if (availability === 'full') {
    cellClasses += 'bg-white border-2 border-red-500 cursor-not-allowed ';
    textClasses += 'text-red-600 font-semibold';
  } else if (availability === 'nearly-full') {
    cellClasses += 'bg-yellow-50 border-2 border-yellow-400 cursor-pointer hover:border-yellow-500 hover:bg-yellow-100 ';
    textClasses += 'text-gray-900 font-semibold';
  } else {
    cellClasses += 'bg-white border-2 border-gray-200 cursor-pointer hover:border-green-400 hover:bg-green-50 ';
    textClasses += 'text-gray-900 font-semibold';
  }

  if (day.isToday && !isSelected) {
    cellClasses += 'ring-2 ring-blue-400 ring-offset-2 ';
  }

  const canClick = !status.isDisabled && availability !== 'full';

  return (
    <button
      type="button"
      onClick={canClick ? onClick : undefined}
      className={cellClasses}
      disabled={!canClick}
      aria-label={`${day.date.toLocaleDateString()}`}
      aria-selected={isSelected}
      aria-disabled={!canClick}
    >
      <span className={textClasses}>{dayNumber}</span>
      {availability === 'full' && (
        <span className="absolute bottom-0 left-0 right-0 text-[10px] sm:text-xs bg-red-500 text-white px-1 py-0.5 text-center rounded-b-lg">
          Full
        </span>
      )}
      {availability === 'nearly-full' && (
        <span className="absolute bottom-0 left-0 right-0 text-[10px] sm:text-xs bg-yellow-500 text-white px-1 py-0.5 text-center rounded-b-lg">
          Almost Full
        </span>
      )}
      {status.surcharge && availability !== 'full' && !status.isDisabled && (
        <span className="absolute bottom-0 left-0 right-0 text-[10px] sm:text-xs bg-yellow-400 text-gray-900 px-1 py-0.5 font-semibold text-center rounded-b-lg">
          {status.surcharge}
        </span>
      )}
    </button>
  );
}

interface LegendProps {
  customItems?: LegendItem[];
}

function Legend({ customItems }: LegendProps) {
  const defaultItems: LegendItem[] = [
    { label: 'Available', visual: 'available' },
    { label: 'Not available', visual: 'disabled' },
    { label: 'Almost full', visual: 'nearly-full' },
    { label: 'Full', visual: 'full' },
    { label: 'Surcharge', visual: 'surcharge' },
  ];

  const items = customItems || defaultItems;

  return (
    <div className="flex items-center gap-4 text-sm flex-wrap">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.visual === 'available' && (
            <div className="w-4 h-4 border-2 border-gray-200 rounded bg-white"></div>
          )}
          {item.visual === 'disabled' && (
            <div className="w-4 h-4 bg-gray-50 border-2 border-gray-100 rounded opacity-60"></div>
          )}
          {item.visual === 'nearly-full' && (
            <div className="w-4 h-4 bg-yellow-50 border-2 border-yellow-400 rounded"></div>
          )}
          {item.visual === 'full' && (
            <div className="w-4 h-4 border-2 border-red-500 rounded bg-white"></div>
          )}
          {item.visual === 'surcharge' && (
            <div className="px-2 py-0.5 bg-yellow-400 text-gray-900 rounded-full text-xs font-semibold">+10%</div>
          )}
          <span className="text-gray-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

function formatDateISO(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default DateSelector;
export type { DateStatus, LegendItem };
