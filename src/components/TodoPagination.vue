<template>
  <div v-if="pagination" class="flex gap-4 items-center mx-auto">
    <button
      class="primary"
      :disabled="!store.hasPrevPage"
      @click="store.goToPrevPage()"
    >
      {{ $t('pagination.back') }}
    </button>

    <div>{{ pagination.page }} / {{ pagination.pageCount }}</div>

    <button
      class="primary"
      :disabled="!store.hasNextPage"
      @click="store.goToNextPage()"
    >
      {{ $t('pagination.next') }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useTodoStore } from '@/stores/todo-store';
import { computed } from 'vue';

const store = useTodoStore();
const pagination = computed(() => store.pagination);
</script>

<style scoped lang="scss"></style>
