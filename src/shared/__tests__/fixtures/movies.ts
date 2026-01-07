import type { IMovie } from '@/entities/movie/models/movie';

// ============================================================================
// Фабрика для создания тестовых данных
// ============================================================================

export function createMovie(overrides?: Partial<IMovie>): IMovie {
  return {
    id: 1,
    title: 'Чебурашка',
    year: 2020,
    rating: 7.5,
    posterUrl: '',
    lengthInMs: 9000000,
    description: 'Test description',
    ...overrides,
  };
}

// ============================================================================
// Базовые наборы данных
// ============================================================================

export const baseMoviesById: Record<number, IMovie> = {
  1: createMovie({ id: 1, title: 'Побег из Шоушенка', year: 2009, rating: 10 }),
  2: createMovie({ id: 2, title: 'Крёстный отец', year: 2000, rating: 9 }),
  3: createMovie({ id: 3, title: 'Ëлки 534', year: 2053, rating: 0.1 }),
};

// ============================================================================
// Специфичные наборы данных для различных сценариев
// ============================================================================

/**
 * Фикстуры для тестов с неполными данными
 */
export const fixturesWithIncompleteMovies = {
  movies: {
    1: baseMoviesById[1], // Только один фильм
  },
};

/**
 * Фикстуры для тестов с пустыми данными
 */
export const fixturesEmptyMovies = {
  movies: {} as Record<number, IMovie>,
};
