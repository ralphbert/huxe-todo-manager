import { defineStore } from 'pinia';
import { useTodoListsQuery } from '@/queries/todo-lists-query';
import { computed, ref } from 'vue';

export const useTodoListStore = defineStore('todo-list', () => {
  // TODO add pagination support
  const { data, isError, isLoading, isFetching } = useTodoListsQuery();
  const listId = ref<number>();
  const lists = computed(() => data.value?.data || []);

  return {
    listId,
    data,
    isError,
    isLoading,
    isFetching,
    lists,
    currentList: computed(() =>
      lists.value.find((list) => list.id === listId.value)
    ),
  };
});
