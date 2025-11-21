/**
 * Date utility functions for reuse across the application
 */

/**
 * Check if a date string represents a weekend (Saturday or Sunday)
 */
export const isWeekend = (dateString: string): boolean => {
  const date = new Date(dateString);
  const day = date.getDay();
  return day === 0 || day === 6;
};

/**
 * Check if a date is before today
 */
export const isBeforeToday = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Check if a date is before or equal to a cutoff date
 */
export const isBeforeOrEqual = (dateString: string, cutoffDateString: string): boolean => {
  const date = new Date(dateString);
  const cutoff = new Date(cutoffDateString);
  date.setHours(0, 0, 0, 0);
  cutoff.setHours(0, 0, 0, 0);
  return date <= cutoff;
};

/**
 * Format a Date object to ISO string (YYYY-MM-DD)
 */
export const formatDateISO = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Format a date string for display
 */
export const formatDateDisplay = (dateString: string, locale = 'en-US'): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get the day name from a date string
 */
export const getDayName = (dateString: string, locale = 'en-US'): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, { weekday: 'long' });
};

/**
 * Add days to a date string
 */
export const addDays = (dateString: string, days: number): string => {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return formatDateISO(date);
};

/**
 * Get today's date as ISO string
 */
export const getTodayISO = (): string => {
  return formatDateISO(new Date());
};
