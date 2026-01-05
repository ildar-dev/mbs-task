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
 * Без ведущего нуля у часов (например, "5:32" вместо "05:32").
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
 * @param ms Время в миллисекундах (timestamp или длительность, интерпретируется как локальное время)
 * @returns Строка формата HH:MM
 */
export function formatTimeHHMM(ms: number): string {
  return (new Date(ms)).toLocaleTimeString([], { hour: '2-digit', minute:'2-digit' })
}

/*
 * Форматирует время в виде MM:SS (с ведущим нулём у минут).
 * Пример: 32:05, 05:32.
 *
 * @param ms Время в миллисекундах
 * @returns Строка формата MM:SS
 */
export function formatTimeMMSS(ms: number): string {
  return (new Date(ms)).toLocaleTimeString([], { minute: '2-digit', second: '2-digit' })
}
