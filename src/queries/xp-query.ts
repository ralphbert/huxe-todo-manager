import { useQuery } from '@tanstack/vue-query';
import { getXp } from '@/api/xp-requests';

export const xpQueryName = 'xp';

export function xpQuery() {
  return useQuery([xpQueryName], () => getXp());
}
