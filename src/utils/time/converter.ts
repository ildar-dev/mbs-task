import { MINUTES_TO_SECONDS, MS_IN_SECOND } from './consts';

export function minutesToMs(minutes: number): number {
  return minutes * MINUTES_TO_SECONDS * MS_IN_SECOND;
}
