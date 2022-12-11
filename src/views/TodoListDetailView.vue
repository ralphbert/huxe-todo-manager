<template>
  <div>
    <div class="flex mb-6">
      <h1 class="text-xl font-semibold flex-auto items-center">
        {{ listStore.currentList?.attributes?.title }}
      </h1>
      <button class="danger" @click="deleteList">
        {{ $t('todoList.delete') }}
      </button>
    </div>

    <TodoCreateForm class="mb-8" :list-id="listId" />

    <TodoStatusFilter />

    <section class="py-4">
      <div v-if="todoStore.isLoading" class="text-center">Loading...</div>
      <div v-if="todoStore.isError" class="text-center">
        {{ $t('todoList.errors.loadingList') }}
      </div>
      <div v-if="todos.length <= 0" class="text-center">
        {{ $t('todoList.errors.emptyList') }}
      </div>
      <div v-else>
        <div v-for="data in todos" :key="data.id" class="mb-4">
          <TodoItem :todo="data" :list-id="listId"></TodoItem>
        </div>

        <TodoPagination :pagination="todoStore.pagination" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { useTodoListDeleteMutation } from '@/queries/todo-lists-query';
import { useRoute, useRouter } from 'vue-router';
import { computed, watchEffect } from 'vue';
import TodoItem from '@/components/TodoItem.vue';
import TodoCreateForm from '@/components/TodoCreateForm.vue';
import TodoPagination from '@/components/TodoPagination.vue';
import { useTodoStore } from '@/stores/todo-store';
import TodoStatusFilter from '@/components/TodoStatusFilter.vue';
import { useTodoListStore } from '@/stores/todo-list-store';

const listStore = useTodoListStore();
const todoStore = useTodoStore();

const route = useRoute();
const router = useRouter();
const { mutate } = useTodoListDeleteMutation();

const listId = computed(() => +route.params.id);
const todos = computed(() => todoStore.todos || []);

watchEffect(() => {
  todoStore.listId = listId.value;
  listStore.listId = listId.value;
});

function deleteList() {
  mutate(listId.value, {
    onSuccess() {
      const list = listStore.lists?.[0];

      console.log('list', list);

      if (list && list.id !== listId.value) {
        router.push({
          name: 'list',
          params: { id: list.id },
        });
      } else {
        router.push({ name: 'dashboard' });
      }
    },
  });
}
</script>

<style scoped lang="scss"></style>
