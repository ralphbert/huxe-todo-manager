<template>
  <div class="flex gap-4">
    <button
      class="secondary"
      :class="{ active: todoStore.todoStatus === status }"
      v-for="status in todoStatuses"
      :key="status"
      @click="todoStore.todoStatus = status"
    >
      {{ $t(`todos.status.${status}`) }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { todoStatuses } from '@/types';
import { useTodoStore } from '@/stores/todo-store';

const todoStore = useTodoStore();
</script>

<style scoped lang="scss"></style>
