import type { PaginationPayload } from '@/types';

export function getDefaultPagination(): PaginationPayload {
  return {
    page: 1,
    pageSize: 10,
  };
}

export function getPaginationQuery(
  pagination: PaginationPayload
): Record<string, string> {
  return {
    'pagination[page]': `${pagination.page}`,
    'pagination[pageSize]': `${pagination.pageSize}`,
  };
}
