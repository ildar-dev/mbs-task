import { BASE_URL } from '../client'

export function getImageUrl(posterPath: string): string {
  return posterPath?.startsWith('http') ? posterPath : `${BASE_URL}${posterPath}`
}
