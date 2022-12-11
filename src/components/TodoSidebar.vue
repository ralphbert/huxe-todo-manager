<template>
  <div class="relative flex flex-col overflow-auto">
    <div class="">
      <div v-for="(list, i) in lists" :key="list.id">
        <RouterLink
          active-class="bg-gray-200 font-semibold"
          class="block p-4 hover:bg-gray-100 transition-all"
          :class="{ 'border-b': i < lists.length - 1 }"
          :to="{ name: 'list', params: { id: list.id } }"
          >{{ list.attributes.title }}
        </RouterLink>
      </div>
    </div>
  </div>
  <TodoListForm></TodoListForm>
</template>

<script lang="ts" setup>
import { useTodoListStore } from '@/stores/todo-list-store';
import { computed } from 'vue';
import TodoListForm from '@/components/TodoListForm.vue';

const listsStore = useTodoListStore();
const lists = computed(() => listsStore.lists);
</script>

<style scoped lang="scss"></style>
