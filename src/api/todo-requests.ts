import { httpClient } from '@/api/http-client';
import type {
  ListResponse,
  PatchResponse,
  PaginationPayload,
  Todo,
  TodoCreatePayload,
  TodoStatus,
  TodoUpdatePayload,
} from '@/types';
import {
  getDefaultPagination,
  getPaginationQuery,
} from '@/utils/pagination-utils';

export function getTodosByList(
  listId: number | string,
  pagination: PaginationPayload = getDefaultPagination(),
  status: TodoStatus = 'all'
) {
  const params: Record<string, string | number> = {
    ...getPaginationQuery(pagination),
    'filters[list][id][$eq]': listId,
  };

  if (status !== 'all') {
    params['filters[done][$eq]'] = String(status === 'done' ? 1 : 0);
  }

  return httpClient.get<ListResponse<Todo>>('todos', {
    params,
  });
}

export function getTodo(id: number | string) {
  return httpClient.get<Todo>(`todos/${id}`);
}

export function createTodo(todo: TodoCreatePayload) {
  return httpClient.post<Todo>('todos', { data: todo });
}

export function updateTodo(id: number | string, todo: TodoUpdatePayload) {
  return httpClient.put<PatchResponse<Todo>>(`todos/${id}`, { data: todo });
}
