import type { ISession } from '@/entities/session/models/session';
import { baseMoviesById, fixturesWithIncompleteMovies } from './movies';
import { baseCinemasById, fixturesWithIncompleteCinemas } from './cinemas';


export function createSession(overrides?: Partial<ISession>): ISession {
  return {
    id: 1,
    movieId: 1,
    cinemaId: 1,
    startTime: new Date('2024-05-10T10:00:00'),
    ...overrides,
  };
}

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

/**
 * Фикстуры для тестов с неполными данными (отсутствующие фильмы/кинотеатры в словаре)
 */
export const fixturesWithIncompleteData = {
  movies: fixturesWithIncompleteMovies,
  cinemas: fixturesWithIncompleteCinemas,
  sessions: baseSessions, // Все сессии, включая те, что ссылаются на отсутствующие фильмы/кинотеатры
};

/**
 * Фикстуры для тестов с пустыми данными
 */
export const fixturesEmpty = {
  movies: {} as Record<number, typeof baseMoviesById[number]>,
  cinemas: {} as Record<number, typeof baseCinemasById[number]>,
  sessions: [] as ISession[],
};
