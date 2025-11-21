/**
 * EXAMPLES: DateSelector Component Usage
 *
 * This file demonstrates how to use DateSelector in different scenarios.
 * These are not used in the application, but serve as reference examples
 * for future development.
 */

import { useState } from 'react';
import DateSelector, { type DateStatus } from '../components/features/quote/components/DateSelector';
import { isWeekend, isBeforeToday } from '@moving-company/utils';

/**
 * EXAMPLE 1: Moving Date Selection (Current Implementation)
 *
 * Use case: User selects a moving date
 * Requirements:
 * - Cannot select past dates or dates before 2024-11-20
 * - Weekend dates have +10% surcharge
 */
export function MovingDateExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDateStatus = (dateString: string): DateStatus => {
    // Disable dates before cutoff
    if (isBeforeToday(dateString) || dateString <= '2024-11-20') {
      return { isDisabled: true };
    }

    // Weekend surcharge
    if (isWeekend(dateString)) {
      return { surcharge: '+10%' };
    }

    return {};
  };

  return (
    <DateSelector
      isOpen={isOpen}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      onClose={() => setIsOpen(false)}
      getDateStatus={getDateStatus}
      title="Select Moving Date"
      customLegendItems={[
        { label: 'Available', visual: 'available' },
        { label: 'Not available', visual: 'disabled' },
        { label: 'Weekend surcharge', visual: 'surcharge' },
      ]}
    />
  );
}

/**
 * EXAMPLE 2: Delivery Date Selection (Future Implementation)
 *
 * Use case: User selects a delivery date after pickup
 * Requirements:
 * - Cannot select dates before pickup date
 * - Cannot select past dates
 * - Future: Show availability from backend
 */
export function DeliveryDateExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const pickupDate = '2024-11-25'; // Example pickup date

  const getDateStatus = (dateString: string): DateStatus => {
    // Cannot select before pickup
    if (dateString < pickupDate) {
      return { isDisabled: true };
    }

    // Cannot select past dates
    if (isBeforeToday(dateString)) {
      return { isDisabled: true };
    }

    // TODO: Fetch from Supabase
    // const availability = await fetchDeliveryAvailability(dateString);
    // return { availability };

    return { availability: 'available' };
  };

  return (
    <DateSelector
      isOpen={isOpen}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      onClose={() => setIsOpen(false)}
      getDateStatus={getDateStatus}
      title="Select Delivery Date"
    />
  );
}

/**
 * EXAMPLE 3: Warehouse Booking with Availability (Future Implementation)
 *
 * Use case: Book warehouse space
 * Requirements:
 * - Show real-time availability from backend
 * - Green = available, Yellow = nearly full, Red = full
 * - Dynamic pricing for high-demand dates
 */
export function WarehouseBookingExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDateStatus = (dateString: string): DateStatus => {
    // Cannot book in the past
    if (isBeforeToday(dateString)) {
      return { isDisabled: true };
    }

    // TODO: Fetch from Supabase
    // Example mock data:
    const mockAvailability: Record<string, DateStatus> = {
      '2024-12-01': { availability: 'nearly-full' },
      '2024-12-15': { availability: 'full' },
      '2024-12-25': { availability: 'available', surcharge: '+20€' }, // Christmas premium
      '2024-12-31': { availability: 'full' }, // New Year's full
    };

    return mockAvailability[dateString] || { availability: 'available' };
  };

  return (
    <DateSelector
      isOpen={isOpen}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      onClose={() => setIsOpen(false)}
      getDateStatus={getDateStatus}
      title="Select Warehouse Date"
      customLegendItems={[
        { label: 'Available', visual: 'available' },
        { label: 'Almost full', visual: 'nearly-full' },
        { label: 'Fully booked', visual: 'full' },
        { label: 'Holiday pricing', visual: 'surcharge' },
      ]}
    />
  );
}

/**
 * EXAMPLE 4: Event Calendar (Future Implementation)
 *
 * Use case: Select date for an event
 * Requirements:
 * - Only allow specific dates (e.g., every weekend)
 * - Show event pricing
 */
export function EventCalendarExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDateStatus = (dateString: string): DateStatus => {
    // Past dates disabled
    if (isBeforeToday(dateString)) {
      return { isDisabled: true };
    }

    // Only weekends are available for events
    if (!isWeekend(dateString)) {
      return { isDisabled: true };
    }

    // TODO: Check event availability from backend
    return { availability: 'available' };
  };

  return (
    <DateSelector
      isOpen={isOpen}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      onClose={() => setIsOpen(false)}
      getDateStatus={getDateStatus}
      title="Select Event Date"
      showLegend={false} // Hide legend for simple calendar
    />
  );
}

/**
 * EXAMPLE 5: Simple Date Picker (No special logic)
 *
 * Use case: Generic date selection
 * Requirements:
 * - Only disable past dates
 * - No special styling or surcharges
 */
export function SimpleDatePickerExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const getDateStatus = (dateString: string): DateStatus => {
    if (isBeforeToday(dateString)) {
      return { isDisabled: true };
    }
    return {};
  };

  return (
    <DateSelector
      isOpen={isOpen}
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
      onClose={() => setIsOpen(false)}
      getDateStatus={getDateStatus}
      title="Select Date"
      showLegend={false}
    />
  );
}

/**
 * FUTURE: Integration with Supabase
 *
 * Example of fetching date statuses from backend:
 *
 * async function fetchDateAvailability(dateString: string): Promise<DateStatus> {
 *   const { data, error } = await supabase
 *     .from('date_availability')
 *     .select('availability, surcharge')
 *     .eq('date', dateString)
 *     .maybeSingle();
 *
 *   if (error || !data) {
 *     return { availability: 'available' };
 *   }
 *
 *   return {
 *     availability: data.availability,
 *     surcharge: data.surcharge,
 *   };
 * }
 *
 * Then use in component:
 *
 * const getDateStatus = async (dateString: string): Promise<DateStatus> => {
 *   if (isBeforeToday(dateString)) {
 *     return { isDisabled: true };
 *   }
 *   return await fetchDateAvailability(dateString);
 * };
 */
