<template>
  <div class="text-center mt-12 text-3xl">
    {{ $t('logout.title') }}
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth-store';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

onMounted(() => {
  auth.setAuthData(undefined);
  router.push({ name: 'login' });
});
</script>

<style scoped lang="scss"></style>
