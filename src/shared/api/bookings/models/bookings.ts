import type { IDtoSeat } from '../../session/models';

export interface IDtoBooking {
    id: string;
    userId: number;
    movieSessionId: number;
    sessionId: number;
    bookedAt: string;
    seats: IDtoSeat[];
    isPaid: boolean;
}
