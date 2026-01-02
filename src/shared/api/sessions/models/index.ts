export interface IDtoSession {
  id: number,
  movieId: number,
  cinemaId: number,
  startTime: string
}

export interface IDtoSessionsResponse extends Array<IDtoSession> {}
