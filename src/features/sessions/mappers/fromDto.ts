import { mapDtoToSession } from '@/entities/session/mappers/fromDto'
import type { ISession } from '@/entities/session/models/session'
import type { IDtoSession } from '@/shared/api/sessions/models'

export function mapDtoToSessions(dto: IDtoSession[]): ISession[] { // guaranteed to be sorted by startTime
  return [...dto.map(mapDtoToSession)].sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
}