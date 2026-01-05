import { SECONDS_IN_MINUTE, MS_IN_SECOND } from './consts';

export function minutesToMs(minutes: number): number {
  return minutes * SECONDS_IN_MINUTE * MS_IN_SECOND;
}
