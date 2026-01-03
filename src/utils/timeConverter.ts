export const MINUTES_IN_HOUR = 60;
export const MINUTES_TO_SECONDS = 60;
export const SECONDS_TO_MS = 1000;

/**
 * Форматирует дату (ms) в виде MM.DD (месяц и день с ведущим нулём).
 * Пример: 03.07
 *
 * @param ms Время в миллисекундах (timestamp)
 * @returns Строка формата MM.DD
 */
export function formatDateMMDD(ms: number): string {
  return (new Date(ms)).toLocaleDateString([], { month: '2-digit', day: '2-digit' })
}

/**
 * Форматирует время в виде h:MM (без ведущего нуля у часов).
 * Пример: 5:32, 12:05.
 *
 * Используйте этот вариант, когда требуется компактное отображение часов
 * без ведущего нуля (например, "5:32" вместо "05:32").
 *
 * @param ms Время в миллисекундах (timestamp или длительность, интерпретируется как локальное время)
 * @returns Строка формата h:MM
 */
export function formatTimehHMM(ms: number): string {
  return (new Date(ms)).toLocaleTimeString([], { hour: 'numeric', minute:'2-digit' })
}

/**
 * Форматирует время в виде HH:MM (с ведущим нулём у часов).
 * Пример: 05:32, 12:05.
 *
 * Используйте этот вариант, когда требуется фиксированная ширина часов
 * с ведущим нулём (например, для таблиц/гридов).
 *
 * @param ms Время в миллисекундах (timestamp или длительность, интерпретируется как локальное время)
 * @returns Строка формата HH:MM
 */
export function formatTimeHHMM(ms: number): string {
  return (new Date(ms)).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
}

export function minutesToMs(minutes: number): number {
  return minutes * MINUTES_TO_SECONDS * SECONDS_TO_MS;
}
