import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { AuthResponse } from '@/types';

const authKey = 'auth';

export const useAuthStore = defineStore('auth', () => {
  const storedAuthData = localStorage.getItem(authKey) || undefined;
  const parsed = storedAuthData ? JSON.parse(storedAuthData) : undefined;

  const authData = ref<AuthResponse | undefined>(parsed);

  return {
    setAuthData(response: AuthResponse | undefined) {
      authData.value = response;

      if (response) {
        localStorage.setItem(authKey, JSON.stringify(response));
      } else {
        localStorage.removeItem(authKey);
      }
    },
    token: computed(() => authData.value?.jwt),
    isAuthenticated: computed(() => !!authData.value?.jwt),
    user: computed(() => authData.value?.user),
  };
});
