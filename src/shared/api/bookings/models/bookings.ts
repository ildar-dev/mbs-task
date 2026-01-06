import type { IDtoSeat } from '@/shared/api/session/models';

export interface IDtoBooking {
    id: string;
    userId: number;
    movieSessionId: number;
    bookedAt: string;
    seats: IDtoSeat[];
    isPaid: boolean;
}
