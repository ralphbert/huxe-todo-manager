<template>
  <div class="border rounded px-2 py-2 flex gap-2" v-if="todo">
    <div>
      <button class="icon" @click="toggleDone" :disabled="isLoading">
        <template v-if="!isLoading">
          <UIIconCheckCircleOutline
            class="opacity-50"
            v-if="!todo.attributes.done"
          />
          <UIIConCheckCircleSolid v-else />
        </template>
        <UIIconArrowPath class="animate-spin opacity-50" v-else />
      </button>
    </div>
    <div class="flex-1">
      <h3>{{ todo.attributes.title }}</h3>
      <div v-if="todo.attributes.due">
        {{ formatDateTime(todo.attributes.due) }}
      </div>
    </div>
    <div>{{ todo.attributes.xp }} XP</div>
  </div>
</template>

<script lang="ts" setup>
import type { Todo } from '@/types';
import { formatDateTime } from '@/utils/date-utils';
import UIIconCheckCircleOutline from '@/components/icons/UIIconCheckCircleOutline.vue';
import UIIConCheckCircleSolid from '@/components/icons/UIIConCheckCircleSolid.vue';
import { useTodoToggleDoneMutation } from '@/queries/todos-query';
import UIIconArrowPath from '@/components/icons/UIIconArrowPath.vue';

interface Props {
  todo?: Todo;
  listId: number;
}

const props = withDefaults(defineProps<Props>(), {
  todo: undefined,
});

const { mutate, isLoading } = useTodoToggleDoneMutation();

function toggleDone() {
  if (props.todo && props.listId != null) {
    mutate({
      todo: props.todo,
      listId: props.listId,
    });
  }
}
</script>

<style scoped lang="scss"></style>
