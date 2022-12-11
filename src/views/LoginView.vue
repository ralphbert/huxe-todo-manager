<template>
  <main class="p-4">
    <div>
      <form @submit.prevent="submit">
        <div v-if="error">{{ error }}</div>

        <div>
          <label>Username</label>
          <input class="border" v-model="formState.username" />
        </div>
        <div>
          <label>Password</label>
          <input class="border" type="password" v-model="formState.password" />
        </div>

        <button>Submit</button>
      </form>
    </div>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useLoginMutation } from '@/queries/auth-query';
import { useAuthStore } from '@/stores/auth-store';
import { useRouter } from 'vue-router';

const router = useRouter();

const { mutate, error } = useLoginMutation();
const authStore = useAuthStore();

const formState = reactive({
  username: '',
  password: '',
});

function submit() {
  mutate(
    { identifier: formState.username, password: formState.password },
    {
      onSuccess: (response) => {
        authStore.setAuthData(response.data);
        router.push({ name: 'dashboard' });
      },
    }
  );
}
</script>
