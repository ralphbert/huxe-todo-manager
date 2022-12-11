<template>
  <form class="form" @submit.prevent="submit">
    <div class="form-group">
      <label for="title">{{ $t('todos.createForm.title.label') }}</label>
      <input :disabled="isLoading" id="title" v-model="formState.title" />
    </div>
    <div class="form-group">
      <label for="xp">{{ $t('todos.createForm.xp.label') }}</label>
      <select :disabled="isLoading" id="xp" v-model="formState.xp">
        <option v-for="xp in xpSteps" :key="xp">{{ xp }}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="due">{{ $t('todos.createForm.due.label') }}</label>
      <input
        :disabled="isLoading"
        id="due"
        type="datetime-local"
        v-model="formState.due"
      />
    </div>

    <button class="primary" type="submit" :disabled="isLoading">
      {{ $t('todos.createForm.create.label') }}
    </button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { TodoCreatePayload } from '@/types';
import { useTodoCreateMutation } from '@/queries/todos-query';

interface Props {
  listId: number;
}

const props = defineProps<Props>();

const { isLoading, mutate } = useTodoCreateMutation();

const xpSteps = [5, 10, 20];

const formState = reactive<Omit<TodoCreatePayload, 'list'>>({
  due: undefined,
  title: '',
  xp: xpSteps[0],
});

function submit() {
  if (formState.title) {
    mutate(
      {
        ...formState,
        list: props.listId,
      },
      {
        onSuccess() {
          formState.title = '';
          formState.due = undefined;
          formState.xp = xpSteps[0];
        },
      }
    );
  }
}
</script>

<style scoped lang="scss"></style>
