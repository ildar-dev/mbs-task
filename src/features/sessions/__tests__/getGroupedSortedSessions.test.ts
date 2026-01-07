import { describe, it, expect } from 'vitest'
import {
  groupedSortedSessionsByDateCinema,
  groupedSortedSessionsByDateMovie,
} from '../business/getGroupedSortedSessions'
import {
  baseSessions,
  fixturesWithIncompleteData,
  fixturesEmpty,
  createSession,
} from '@/shared/__tests__/fixtures/sessions'
import {
  baseCinemasById,
  createCinema,
} from '@/shared/__tests__/fixtures/cinemas'
import {
  baseMoviesById,
  createMovie,
} from '@/shared/__tests__/fixtures/movies'
import { startOfDayTs } from '../business/getGroupedSessions'

describe('groupedSortedSessionsByDateCinema', () => {
  describe('базовая функциональность', () => {
    it('группирует сессии по датам и кинотеатрам', () => {
      const result = groupedSortedSessionsByDateCinema(baseSessions, baseCinemasById)

      // Проверяем, что все сессии присутствуют в результате
      const allResultSessions = Object.values(result)
        .flatMap(day => Object.values(day).flat())
      const resultSessionIds = allResultSessions.map(s => s.id).sort()
      const inputSessionIds = baseSessions.map(s => s.id).sort()

      expect(resultSessionIds).toEqual(inputSessionIds)
      expect(Object.keys(result).length).toBeGreaterThan(0)
    })

    it('сортирует дни по возрастанию', () => {
      const result = groupedSortedSessionsByDateCinema(baseSessions, baseCinemasById)

      const dayKeys = Object.keys(result).map(Number)
      const sortedDays = [...dayKeys].sort((a, b) => a - b)
      expect(dayKeys).toEqual(sortedDays)
    })

    it('сортирует кинотеатры по названию внутри каждой даты', () => {
      const result = groupedSortedSessionsByDateCinema(baseSessions, baseCinemasById)

      for (const dayTs of Object.keys(result).map(Number)) {
        const cinemaIds = Object.keys(result[dayTs]).map(Number)
        const sortedCinemaIds = [...cinemaIds].sort((a, b) => {
          const nameA = baseCinemasById[a]?.name ?? ''
          const nameB = baseCinemasById[b]?.name ?? ''
          return nameA.localeCompare(nameB) || a - b
        })
        expect(cinemaIds).toEqual(sortedCinemaIds)
      }
    })

    it('сортирует сессии по времени начала внутри каждой группы', () => {
      const result = groupedSortedSessionsByDateCinema(baseSessions, baseCinemasById)

      for (const dayTs of Object.keys(result).map(Number)) {
        for (const cinemaId of Object.keys(result[dayTs]).map(Number)) {
          const sessionsInGroup = result[dayTs][cinemaId]
          const sortedSessions = [...sessionsInGroup].sort(
            (a, b) => a.startTime.getTime() - b.startTime.getTime()
          )
          expect(sessionsInGroup.map(s => s.id)).toEqual(sortedSessions.map(s => s.id))
        }
      }
    })
  })

  describe('обработка входных данных', () => {
    it('корректно обрабатывает сессии, пришедшие вперемешку', () => {
      const shuffled = [...baseSessions].sort(() => Math.random() - 0.5)
      const result = groupedSortedSessionsByDateCinema(shuffled, baseCinemasById)
      const expected = groupedSortedSessionsByDateCinema(baseSessions, baseCinemasById)

      const resultDays = Object.keys(result).map(Number).sort()
      const expectedDays = Object.keys(expected).map(Number).sort()
      expect(resultDays).toEqual(expectedDays)

      for (const dayTs of resultDays) {
        const resultCinemas = Object.keys(result[dayTs]).map(Number).sort()
        const expectedCinemas = Object.keys(expected[dayTs]).map(Number).sort()
        expect(resultCinemas).toEqual(expectedCinemas)

        for (const cinemaId of resultCinemas) {
          const resultSessionIds = result[dayTs][cinemaId].map(s => s.id).sort()
          const expectedSessionIds = expected[dayTs][cinemaId].map(s => s.id).sort()
          expect(resultSessionIds).toEqual(expectedSessionIds)
        }
      }
    })

    it('обрабатывает пустой массив сессий', () => {
      const result = groupedSortedSessionsByDateCinema(fixturesEmpty.sessions, baseCinemasById)
      expect(Object.keys(result)).toHaveLength(0)
    })

    it('обрабатывает сессии с отсутствующими кинотеатрами в словаре', () => {
      const result = groupedSortedSessionsByDateCinema(
        fixturesWithIncompleteData.sessions,
        fixturesWithIncompleteData.cinemas
      )

      const allSessionIds = Object.values(result)
        .flatMap(day => Object.values(day).flat())
        .map(s => s.id)
        .sort()

      expect(allSessionIds).toEqual(fixturesWithIncompleteData.sessions.map(s => s.id).sort())
    })
  })

  describe('группировка по датам', () => {
    it('группирует сессии по началу дня (игнорирует время)', () => {
      // Создаем тестовые данные с разным временем в один день
      const testDate = new Date('2024-05-10T12:00:00')
      const sessions = [
        createSession({ id: 1, startTime: new Date('2024-05-10T09:00:00') }),
        createSession({ id: 2, startTime: new Date('2024-05-10T15:30:00') }),
        createSession({ id: 3, startTime: new Date('2024-05-10T23:59:59') }),
        createSession({ id: 4, startTime: new Date('2024-05-11T00:00:00') }),
      ]

      const result = groupedSortedSessionsByDateCinema(sessions, baseCinemasById)

      const day10 = startOfDayTs(testDate)
      const day11 = startOfDayTs(new Date('2024-05-11T00:00:00'))

      // Проверяем, что сессии одного дня сгруппированы вместе
      const sessionsDay10 = Object.values(result[day10] ?? {}).flat()
      const sessionsDay11 = Object.values(result[day11] ?? {}).flat()

      expect(sessionsDay10.length).toBe(3)
      expect(sessionsDay11.length).toBe(1)
      expect(sessionsDay10.map(s => s.id).sort()).toEqual([1, 2, 3].sort())
      expect(sessionsDay11.map(s => s.id)).toEqual([4])
    })

    it('разделяет сессии разных дней в разные группы', () => {
      const sessions = [
        createSession({ id: 1, startTime: new Date('2024-05-10T09:00:00') }),
        createSession({ id: 2, startTime: new Date('2024-05-10T12:00:00') }),
        createSession({ id: 3, startTime: new Date('2024-05-11T09:00:00') }),
        createSession({ id: 4, startTime: new Date('2024-05-11T15:00:00') }),
      ]

      const result = groupedSortedSessionsByDateCinema(sessions, baseCinemasById)

      const dayKeys = Object.keys(result).map(Number)
      expect(dayKeys.length).toBe(2)

      // Проверяем, что все сессии присутствуют
      const allSessions = Object.values(result)
        .flatMap(day => Object.values(day).flat())
      expect(allSessions.length).toBe(4)
      expect(allSessions.map(s => s.id).sort()).toEqual([1, 2, 3, 4].sort())
    })
  })

  describe('сортировка с дубликатами', () => {
    it('использует fallback по id, если названия кинотеатров одинаковые', () => {
      const cinemas = {
        ...baseCinemasById,
        20: createCinema({ id: 20, name: 'Cinema Europa' }), // Дубликат названия с id 10
      }
      const sessions = [
        createSession({ id: 1, cinemaId: 10, startTime: new Date('2024-05-10T10:00:00') }),
        createSession({ id: 2, cinemaId: 20, startTime: new Date('2024-05-10T12:00:00') }),
      ]

      const result = groupedSortedSessionsByDateCinema(sessions, cinemas)

      const day10 = startOfDayTs(new Date('2024-05-10T10:00:00'))
      const cinemaIds = Object.keys(result[day10] ?? {}).map(Number)

      // При одинаковых названиях сортировка должна быть по id (меньший id идет первым)
      expect(cinemaIds.length).toBeGreaterThanOrEqual(2)
      const index10 = cinemaIds.indexOf(10)
      const index20 = cinemaIds.indexOf(20)
      expect(index10).toBeGreaterThanOrEqual(0)
      expect(index20).toBeGreaterThanOrEqual(0)
      if (index10 !== -1 && index20 !== -1) {
        expect(index10).toBeLessThan(index20)
      }
    })
  })
})

describe('groupedSortedSessionsByDateMovie', () => {
  describe('базовая функциональность', () => {
    it('группирует сессии по датам и фильмам', () => {
      const result = groupedSortedSessionsByDateMovie(baseSessions, baseMoviesById)

      // Проверяем, что все сессии присутствуют в результате
      const allResultSessions = Object.values(result)
        .flatMap(day => Object.values(day).flat())
      const resultSessionIds = allResultSessions.map(s => s.id).sort()
      const inputSessionIds = baseSessions.map(s => s.id).sort()

      expect(resultSessionIds).toEqual(inputSessionIds)
      expect(Object.keys(result).length).toBeGreaterThan(0)
    })

    it('сортирует дни по возрастанию', () => {
      const result = groupedSortedSessionsByDateMovie(baseSessions, baseMoviesById)

      const dayKeys = Object.keys(result).map(Number)
      const sortedDays = [...dayKeys].sort((a, b) => a - b)
      expect(dayKeys).toEqual(sortedDays)
    })

    it('сортирует фильмы по названию внутри каждой даты', () => {
      const result = groupedSortedSessionsByDateMovie(baseSessions, baseMoviesById)

      for (const dayTs of Object.keys(result).map(Number)) {
        const movieIds = Object.keys(result[dayTs]).map(Number)
        const sortedMovieIds = [...movieIds].sort((a, b) => {
          const titleA = baseMoviesById[a]?.title ?? ''
          const titleB = baseMoviesById[b]?.title ?? ''
          return titleA.localeCompare(titleB) || a - b
        })
        expect(movieIds).toEqual(sortedMovieIds)
      }
    })

    it('сортирует сессии по времени начала внутри каждой группы', () => {
      const result = groupedSortedSessionsByDateMovie(baseSessions, baseMoviesById)

      for (const dayTs of Object.keys(result).map(Number)) {
        for (const movieId of Object.keys(result[dayTs]).map(Number)) {
          const sessionsInGroup = result[dayTs][movieId]
          const sortedSessions = [...sessionsInGroup].sort(
            (a, b) => a.startTime.getTime() - b.startTime.getTime()
          )
          expect(sessionsInGroup.map(s => s.id)).toEqual(sortedSessions.map(s => s.id))
        }
      }
    })
  })

  describe('обработка входных данных', () => {
    it('корректно обрабатывает сессии, пришедшие вперемешку', () => {
      const shuffled = [...baseSessions].sort(() => Math.random() - 0.5)
      const result = groupedSortedSessionsByDateMovie(shuffled, baseMoviesById)
      const expected = groupedSortedSessionsByDateMovie(baseSessions, baseMoviesById)

      const resultDays = Object.keys(result).map(Number).sort()
      const expectedDays = Object.keys(expected).map(Number).sort()
      expect(resultDays).toEqual(expectedDays)

      for (const dayTs of resultDays) {
        const resultMovies = Object.keys(result[dayTs]).map(Number).sort()
        const expectedMovies = Object.keys(expected[dayTs]).map(Number).sort()
        expect(resultMovies).toEqual(expectedMovies)

        for (const movieId of resultMovies) {
          const resultSessionIds = result[dayTs][movieId].map(s => s.id).sort()
          const expectedSessionIds = expected[dayTs][movieId].map(s => s.id).sort()
          expect(resultSessionIds).toEqual(expectedSessionIds)
        }
      }
    })

    it('обрабатывает пустой массив сессий', () => {
      const result = groupedSortedSessionsByDateMovie(fixturesEmpty.sessions, baseMoviesById)
      expect(Object.keys(result)).toHaveLength(0)
    })

    it('обрабатывает сессии с отсутствующими фильмами в словаре', () => {
      const result = groupedSortedSessionsByDateMovie(
        fixturesWithIncompleteData.sessions,
        fixturesWithIncompleteData.movies
      )

      const allSessionIds = Object.values(result)
        .flatMap(day => Object.values(day).flat())
        .map(s => s.id)
        .sort()

      expect(allSessionIds).toEqual(fixturesWithIncompleteData.sessions.map(s => s.id).sort())
    })
  })

  describe('группировка по датам', () => {
    it('группирует сессии по началу дня (игнорирует время)', () => {
      // Создаем тестовые данные с разным временем в один день
      const testDate = new Date('2024-05-10T12:00:00')
      const sessions = [
        createSession({ id: 1, startTime: new Date('2024-05-10T09:00:00') }),
        createSession({ id: 2, startTime: new Date('2024-05-10T15:30:00') }),
        createSession({ id: 3, startTime: new Date('2024-05-10T23:59:59') }),
        createSession({ id: 4, startTime: new Date('2024-05-11T00:00:00') }),
      ]

      const result = groupedSortedSessionsByDateMovie(sessions, baseMoviesById)

      const day10 = startOfDayTs(testDate)
      const day11 = startOfDayTs(new Date('2024-05-11T00:00:00'))

      // Проверяем, что сессии одного дня сгруппированы вместе
      const sessionsDay10 = Object.values(result[day10] ?? {}).flat()
      const sessionsDay11 = Object.values(result[day11] ?? {}).flat()

      expect(sessionsDay10.length).toBe(3)
      expect(sessionsDay11.length).toBe(1)
      expect(sessionsDay10.map(s => s.id).sort()).toEqual([1, 2, 3].sort())
      expect(sessionsDay11.map(s => s.id)).toEqual([4])
    })

    it('разделяет сессии разных дней в разные группы', () => {
      const sessions = [
        createSession({ id: 1, startTime: new Date('2024-05-10T09:00:00') }),
        createSession({ id: 2, startTime: new Date('2024-05-10T12:00:00') }),
        createSession({ id: 3, startTime: new Date('2024-05-11T09:00:00') }),
        createSession({ id: 4, startTime: new Date('2024-05-11T15:00:00') }),
      ]

      const result = groupedSortedSessionsByDateMovie(sessions, baseMoviesById)

      const dayKeys = Object.keys(result).map(Number)
      expect(dayKeys.length).toBe(2)

      // Проверяем, что все сессии присутствуют
      const allSessions = Object.values(result)
        .flatMap(day => Object.values(day).flat())
      expect(allSessions.length).toBe(4)
      expect(allSessions.map(s => s.id).sort()).toEqual([1, 2, 3, 4].sort())
    })
  })

  describe('сортировка с дубликатами', () => {
    it('использует fallback по id, если названия фильмов одинаковые', () => {
      const movies = {
        ...baseMoviesById,
        4: createMovie({ id: 4, title: 'Avatar', year: 2022, rating: 7 }), // Дубликат названия с id 1
      }
      const sessions = [
        createSession({ id: 1, movieId: 1, startTime: new Date('2024-05-10T10:00:00') }),
        createSession({ id: 2, movieId: 4, startTime: new Date('2024-05-10T12:00:00') }),
      ]

      const result = groupedSortedSessionsByDateMovie(sessions, movies)

      const day10 = startOfDayTs(new Date('2024-05-10T10:00:00'))
      const movieIds = Object.keys(result[day10] ?? {}).map(Number)

      // При одинаковых названиях сортировка должна быть по id (меньший id идет первым)
      expect(movieIds.length).toBeGreaterThanOrEqual(2)
      const index1 = movieIds.indexOf(1)
      const index4 = movieIds.indexOf(4)
      expect(index1).toBeGreaterThanOrEqual(0)
      expect(index4).toBeGreaterThanOrEqual(0)
      if (index1 !== -1 && index4 !== -1) {
        expect(index1).toBeLessThan(index4)
      }
    })
  })
})
