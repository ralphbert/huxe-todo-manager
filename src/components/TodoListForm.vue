<template>
  <div class="p-4 border-t sticky bottom-0 bg-white/50 backdrop-blur-sm">
    <form class="flex gap-4" @submit.prevent="add">
      <div>
        <input class="border px-2 py-1 rounded w-full" v-model="title" />
      </div>

      <button :disabled="isLoading || !title" class="primary">
        {{ $t('todoList.createForm.create.label') }}
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTodoListCreateMutation } from '@/queries/todo-lists-query';

const title = ref('');

const { mutate, isLoading } = useTodoListCreateMutation();

function add() {
  mutate(
    { title: title.value },
    {
      onSuccess: () => {
        title.value = '';
      },
    }
  );
}
</script>

<style scoped lang="scss"></style>
