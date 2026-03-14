/**
 * Format date to: Sat Mar 14 2026 : 12:46HRS
 */
export function formatDateTime(date: string | Date): string {
  const d = new Date(date);
  
  // Get day name (Sat)
  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
  
  // Get month name (Mar)
  const monthName = d.toLocaleDateString('en-US', { month: 'short' });
  
  // Get day (14)
  const day = d.getDate();
  
  // Get year (2026)
  const year = d.getFullYear();
  
  // Get hours and minutes (12:46)
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${dayName} ${monthName} ${day} ${year} : ${hours}:${minutes}HRS`;
}

/**
 * Format date to: Sat Mar 14 2026 12:00HRS (for email templates - no seconds)
 */
export function formatDateTimeEmail(date: string | Date): string {
  const d = new Date(date);
  
  // Get day name (Sat)
  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
  
  // Get month name (Mar)
  const monthName = d.toLocaleDateString('en-US', { month: 'short' });
  
  // Get day (14)
  const day = d.getDate();
  
  // Get year (2026)
  const year = d.getFullYear();
  
  // Get hours and minutes (12:00)
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  
  return `${dayName} ${monthName} ${day} ${year} ${hours}:${minutes}HRS`;
}

/**
 * Format date to: Sat Mar 14 2026 (date only, no time)
 */
export function formatDateOnly(date: string | Date): string {
  const d = new Date(date);
  
  // Get day name (Sat)
  const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
  
  // Get month name (Mar)
  const monthName = d.toLocaleDateString('en-US', { month: 'short' });
  
  // Get day (14)
  const day = d.getDate();
  
  // Get year (2026)
  const year = d.getFullYear();
  
  return `${dayName} ${monthName} ${day} ${year}`;
}
