export interface IDtoMovie {
  id: number;
  title: string;
  description: string;
  year: number;
  lengthMinutes: number;
  posterImage: string;
  rating: number;
}

export interface IDtoMoviesResponse extends Array<IDtoMovie> {}
