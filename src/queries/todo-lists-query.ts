import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import type { TodoListCreatePayload } from '@/types';
import {
  createTodoList,
  deleteTodoList,
  getTodoLists,
} from '@/api/todo-lists-requests';

export const listQueryName = 'todo-list';

/**
 * TODO: add pagination
 */
export function useTodoListsQuery() {
  return useQuery([listQueryName], () => {
    return getTodoLists({ page: 1, pageSize: 100 }).then((r) => r.data);
  });
}

export function useTodoListCreateMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (payload: TodoListCreatePayload) => {
      return createTodoList(payload);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([listQueryName]);
      },
    }
  );
}

export function useTodoListDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation(
    (id: number | string) => {
      return deleteTodoList(id);
    },
    {
      onSuccess: () => {
        return queryClient.invalidateQueries([listQueryName]);
      },
    }
  );
}

// TODO: add update mutation
