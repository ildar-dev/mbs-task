export const MINUTES_IN_HOUR = 60;
export const MINUTES_TO_SECONDS = 60;
export const SECONDS_TO_MS = 1000;

export function formatTime(ms: number): string {
  return (new Date(ms)).toLocaleTimeString([], { hour: 'numeric', minute:'2-digit' })
}

export function minutesToMs(minutes: number): number {
  return minutes * MINUTES_TO_SECONDS * SECONDS_TO_MS;
}
