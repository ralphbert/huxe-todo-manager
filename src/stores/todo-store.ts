import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useTodosQuery } from '@/queries/todos-query';
import type { PaginationPayload, TodoStatus } from '@/types';
import { getDefaultPagination } from '@/utils/pagination-utils';
import { todoStatuses } from '@/types';

export const useTodoStore = defineStore('todo-store', () => {
  const listId = ref<number>();
  const pagination = ref<PaginationPayload>(getDefaultPagination());
  const filterTodoStatus = ref<TodoStatus>('all');

  const { data, isLoading, isFetching, isError } = useTodosQuery(
    listId,
    pagination,
    filterTodoStatus
  );

  function goToPage(
    page: number,
    pageSize: number = getDefaultPagination().pageSize
  ) {
    pagination.value.page = Math.max(page, getDefaultPagination().page);
    pagination.value = {
      page: Math.max(page, getDefaultPagination().page),
      pageSize: Math.min(Math.max(pageSize, 1), 100),
    };
  }

  const paginationResponse = computed(() => data.value?.meta?.pagination);
  const hasNextPage = computed(
    () =>
      paginationResponse.value &&
      paginationResponse.value.page < paginationResponse.value.pageCount
  );
  const hasPrevPage = computed(
    () => paginationResponse.value && paginationResponse.value.page > 1
  );

  return {
    listId,
    todos: computed(() => data.value?.data),
    pagination: computed(() => data.value?.meta.pagination),
    isLoading,
    isFetching,
    isError,
    hasNextPage,
    hasPrevPage,
    goToNextPage: () =>
      paginationResponse.value && goToPage(paginationResponse.value.page + 1),
    goToPrevPage: () =>
      paginationResponse.value && goToPage(paginationResponse.value.page - 1),
    todoStatus: filterTodoStatus,
    todoStatuses: todoStatuses,
  };
});
