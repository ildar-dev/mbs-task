import type { ISession } from '@/entities/session/models/session';
import type { IMovie } from '@/entities/movie/models/movie';
import type { ICinema } from '@/entities/cinema/models/cinema';

// Фабрики для создания тестовых данных
export function createMovie(overrides?: Partial<IMovie>): IMovie {
  return {
    id: 1,
    title: 'Test Movie',
    year: 2020,
    rating: 7.5,
    posterUrl: '',
    lengthInMs: 9000000,
    description: 'Test description',
    ...overrides,
  };
}

export function createCinema(overrides?: Partial<ICinema>): ICinema {
  return {
    id: 1,
    name: 'Test Cinema',
    address: 'Test Address',
    ...overrides,
  };
}

export function createSession(overrides?: Partial<ISession>): ISession {
  return {
    id: 1,
    movieId: 1,
    cinemaId: 1,
    startTime: new Date('2024-05-10T10:00:00'),
    ...overrides,
  };
}

// ============================================================================
// Базовые наборы данных
// ============================================================================

export const baseMoviesById: Record<number, IMovie> = {
  1: createMovie({ id: 1, title: 'Avatar', year: 2009, rating: 8 }),
  2: createMovie({ id: 2, title: 'Inception', year: 2010, rating: 9 }),
  3: createMovie({ id: 3, title: 'Braveheart', year: 1995, rating: 8.3 }),
};

export const baseCinemasById: Record<number, ICinema> = {
  10: createCinema({ id: 10, name: 'Cinema Europa' }),
  11: createCinema({ id: 11, name: 'Cinema Star' }),
  12: createCinema({ id: 12, name: 'KinoForum' }),
};

export const baseSessions: ISession[] = [
  createSession({ id: 100, movieId: 2, cinemaId: 11, startTime: new Date('2024-05-11T18:00:00') }),
  createSession({ id: 101, movieId: 1, cinemaId: 10, startTime: new Date('2024-06-10T10:00:00') }),
  createSession({ id: 102, movieId: 2, cinemaId: 10, startTime: new Date('2024-07-11T09:00:00') }),
  createSession({ id: 103, movieId: 3, cinemaId: 12, startTime: new Date('2024-08-10T12:00:00') }),
  createSession({ id: 104, movieId: 1, cinemaId: 10, startTime: new Date('2024-09-12T13:00:00') }),
  createSession({ id: 105, movieId: 3, cinemaId: 11, startTime: new Date('2024-10-10T09:30:00') }),
  createSession({ id: 106, movieId: 2, cinemaId: 12, startTime: new Date('2024-11-12T20:00:00') }),
  createSession({ id: 107, movieId: 1, cinemaId: 12, startTime: new Date('2024-12-11T10:30:00') }),
];

// ============================================================================
// Специфичные наборы данных для различных сценариев
// ============================================================================

/**
 * Фикстуры для тестов сортировки с одинаковыми названиями
 */
export const fixturesWithDuplicateNames = {
  cinemas: {
    ...baseCinemasById,
    20: createCinema({ id: 20, name: 'Cinema Europa' }), // Дубликат названия с id 10
  },
  movies: {
    ...baseMoviesById,
    4: createMovie({ id: 4, title: 'Avatar', year: 2022, rating: 7 }), // Дубликат названия с id 1
  },
  sessions: [
    ...baseSessions,
    createSession({ id: 200, movieId: 4, cinemaId: 20, startTime: new Date('2024-05-10T15:00:00') }),
  ],
};

/**
 * Фикстуры для тестов с неполными данными (отсутствующие фильмы/кинотеатры в словаре)
 */
export const fixturesWithIncompleteData = {
  movies: {
    1: baseMoviesById[1], // Только один фильм
  },
  cinemas: {
    10: baseCinemasById[10], // Только один кинотеатр
  },
  sessions: baseSessions, // Все сессии, включая те, что ссылаются на отсутствующие фильмы/кинотеатры
};

/**
 * Фикстуры для тестов с пустыми данными
 */
export const fixturesEmpty = {
  movies: {} as Record<number, IMovie>,
  cinemas: {} as Record<number, ICinema>,
  sessions: [] as ISession[],
};
