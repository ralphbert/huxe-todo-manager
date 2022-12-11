<template>
  <div v-if="isAuthenticated !== 'pending'">
    <RouterView />
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { sendIsAuthenticationRequest } from '@/queries/auth-query';
import { useAuthStore } from '@/stores/auth-store';

const isAuthenticated = ref<'pending' | 'loggedIn' | 'loggedOut'>('pending');
const authStore = useAuthStore();

onMounted(async () => {
  const authenticated = await sendIsAuthenticationRequest();

  if (authenticated) {
    isAuthenticated.value = 'loggedIn';
  } else {
    isAuthenticated.value = 'loggedOut';
    authStore.setAuthData(undefined);
  }
});
</script>

<style scoped></style>
