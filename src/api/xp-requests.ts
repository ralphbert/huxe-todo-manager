import { httpClient } from '@/api/http-client';

export function getXp() {
  return httpClient.get<number>('xp');
}
