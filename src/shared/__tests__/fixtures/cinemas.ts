import type { ICinema } from '@/entities/cinema/models/cinema';

// ============================================================================
// Фабрика для создания тестовых данных
// ============================================================================

export function createCinema(overrides?: Partial<ICinema>): ICinema {
  return {
    id: 1,
    name: 'Test Cinema',
    address: 'Test Address',
    ...overrides,
  };
}

// ============================================================================
// Базовые наборы данных
// ============================================================================

export const baseCinemasById: Record<number, ICinema> = {
  10: createCinema({ id: 10, name: 'IMAX' }),
  11: createCinema({ id: 11, name: 'Искра' }),
  12: createCinema({ id: 12, name: 'Березка' }),
};

// ============================================================================
// Специфичные наборы данных для различных сценариев
// ============================================================================


/**
 * Фикстуры для тестов с неполными данными
 */
export const fixturesWithIncompleteCinemas = {
  cinemas: {
    10: baseCinemasById[10], // Только один кинотеатр
  },
};

/**
 * Фикстуры для тестов с пустыми данными
 */
export const fixturesEmptyCinemas = {
  cinemas: {} as Record<number, ICinema>,
};
