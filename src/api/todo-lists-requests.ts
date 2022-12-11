import type {
  ListResponse,
  PatchResponse,
  PaginationPayload,
  TodoAttributes,
  TodoListCreatePayload,
  TodoListItem,
} from '@/types';
import { httpClient } from '@/api/http-client';
import {
  getDefaultPagination,
  getPaginationQuery,
} from '@/utils/pagination-utils';

export function getTodoLists(
  pagination: PaginationPayload = getDefaultPagination()
) {
  return httpClient.get<ListResponse<TodoListItem>>('lists', {
    params: getPaginationQuery(pagination),
  });
}

export function createTodoList(payload: TodoListCreatePayload) {
  return httpClient.post<TodoListItem>('lists', { data: payload });
}

/**
 * TODO make use of this request
 */
export function updateTodoList(
  listId: number | string,
  payload: TodoAttributes
) {
  return httpClient.put<PatchResponse<TodoListItem>>(`lists/${listId}`, {
    data: payload,
  });
}

export function deleteTodoList(listId: number | string) {
  return httpClient.delete<void>(`lists/${listId}`);
}
