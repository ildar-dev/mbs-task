const MINUTES_IN_HOUR = 60;

export function formatTime(minutes: number): string { // 123 -> "2:03"
  const hours = Math.floor(minutes / MINUTES_IN_HOUR);
  const remainingMinutes = minutes % MINUTES_IN_HOUR;
  return `${hours}:${remainingMinutes.toString().padStart(2, '0')}`;
}
