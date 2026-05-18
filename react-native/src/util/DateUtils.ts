/**
 * Formats a Date object into a string with the format: DD-MM-YYYY.
 * * @example
 * // returns "08-01-2026"
 * formatDateToDDMMYYYY(new Date());
 * * @param date - The Date object to be formatted.
 * @returns A string representing the date in DD-MM-YYYY format.
 */
export const formatDateToDDMMYYYY = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * Formats a Date object into a string with the format: YYYY-MM-DD.
 * @example
 * // returns "2026-04-12"
 * formatDateToYYYYMMDD(new Date(2026, 3, 12));
 * @param date - The Date object to be formatted.
 * @returns A string representing the date in YYYY-MM-DD format.
 */
export const formatDateToYYYYMMDD = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

/**
 * Converts a string "DD-MM-YYYY" to "YYYY-MM-DD"
 * @example "12-12-2026" -> "2026-12-12"
 */
export const convertDDMMYYYYtoYYYYMMDD = (dateStr: string) => {
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a date to: hh:mm am/pm, DD/MM/YYYY
 * @param {Date | string | number} dateInput
 * @returns {string}
 */
export const formatTimeDate_HHMM_DDMMYYY = (
  dateInput: string | Date | number,
) => {
  const date = new Date(dateInput);

  // Format Time: 09:25 am
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  } as const;
  const timePart = new Intl.DateTimeFormat('en-US', timeOptions)
    .format(date)
    .toLowerCase();

  // Format Date: 05/06/2025
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${timePart}, ${day}/${month}/${year}`;
};

/**
 * Formats a date string into a compact social-media style "time ago" string.
 * Example: "now", "5h", "2d", "1w"
 */
export const formatTimeAgo = (dateInput: string | Date | number): string => {
  const now = new Date().getTime();
  const date = new Date(dateInput).getTime();

  if (isNaN(date)) return '';

  const diffInSeconds = Math.floor((now - date) / 1000);

  // Handle future dates or system clock mismatches
  if (diffInSeconds < 30) return 'now';

  const units = [
    { label: 'w', seconds: 604800 },
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
  ];

  for (const { label, seconds } of units) {
    const interval = Math.floor(diffInSeconds / seconds);
    if (interval >= 1) {
      return `${interval}${label}`;
    }
  }

  return 'now';
};

export const formatPostCreatedTime = (
  dateInput: string | Date | number,
): string => {
  const SEVEN_DAYS_IN_SECONDS = 604800;
  const now = new Date().getTime();
  const date = new Date(dateInput).getTime();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds >= SEVEN_DAYS_IN_SECONDS) {
    return formatTimeDate_HHMM_DDMMYYY(dateInput);
  } else return formatTimeAgo(dateInput);
};

/**
 * Converts a duration object into a human-friendly string.
 * Example: { hr: '1', min: '15' } -> "1 hour 15 minutes"
 */
export const formatDurationToReadable = (duration: {
  hr: string;
  min: string;
}): string => {
  const hours = parseInt(duration.hr || '0', 10);
  const minutes = parseInt(duration.min || '0', 10);
  if (hours === 0 && minutes === 0) return '0 minutes';
  const parts = [];
  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
  }
  if (minutes > 0) {
    parts.push(`${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`);
  }
  return parts.join(' ');
};
