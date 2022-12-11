import type { MaybeRef } from '@tanstack/vue-query/build/lib/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed, ref } from 'vue';
import type { PaginationPayload, TodoStatus, TodoTogglePayload } from '@/types';
import {
  createTodo,
  getTodo,
  getTodosByList,
  updateTodo,
} from '@/api/todo-requests';
import { getDefaultPagination } from '@/utils/pagination-utils';
import { xpQueryName } from '@/queries/xp-query';

export const todosQueryName = 'todos';

export function useTodosQuery(
  listId: MaybeRef<number | undefined>,
  pagination: MaybeRef<PaginationPayload> = getDefaultPagination(),
  show: MaybeRef<TodoStatus> = 'all'
) {
  const listIdRef = ref(listId);
  const paginationRef = ref(pagination);
  const showRef = ref(show);

  return useQuery(
    [todosQueryName, listIdRef, paginationRef, show],
    () =>
      getTodosByList(
        listIdRef.value as number,
        paginationRef.value,
        showRef.value
      ).then((d) => d.data),
    {
      enabled: computed(() => listIdRef.value != null),
    }
  );
}

/**
 * TODO make use of this function
 * @param todoId
 */
export function useTodoQuery(todoId: MaybeRef<number>) {
  const todoIdRef = ref(todoId);
  return useQuery(['todo', todoIdRef], () => getTodo(todoIdRef.value));
}

export function useTodoCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onSuccess(data, variables) {
      return queryClient.invalidateQueries({
        queryKey: [todosQueryName, variables.list],
      });
    },
  });
}

export function useTodoToggleDoneMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TodoTogglePayload) =>
      updateTodo(payload.todo.id, {
        ...payload.todo.attributes,
        done: !payload.todo.attributes.done,
      }),
    onSuccess(response, variables) {
      queryClient.invalidateQueries({
        queryKey: [todosQueryName, variables.listId],
      });
      queryClient.invalidateQueries({ queryKey: [xpQueryName] });
    },
  });
}
