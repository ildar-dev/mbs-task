export interface IDtoTheater {
  rows: number;
  seatsPerRow: number;
}

export interface IDtoSeat {
  rowNumber: number;
  seatNumber: number;
}

export interface IDtoSessionDetails {
    id: number,
    movieId: number,
    cinemaId: number,
    startTime: string,
    seats: IDtoTheater,
    bookedSeats: IDtoSeat[]
}
