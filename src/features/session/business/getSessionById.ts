import { getSessionById as getSessionByIdApi } from '@/shared/api/session/getSessionById'
import { mapDtoToSessionDetails } from '@/entities/session/mappers/fromDto'
import type { ISessionDetails } from '@/entities/session/models/sessionDetails'

export async function getSessionById(sessionId: number): Promise<ISessionDetails> {
  const dto = await getSessionByIdApi(sessionId)
  return mapDtoToSessionDetails(dto)
}
