<template>
  <div class="flex flex-col h-screen max-h-screen">
    <header
      class="flex gap-4 bg-white justify-between items-center p-4 border-b h-[64px] z-10"
    >
      <div class="font-bold text-xl">
        <RouterLink :to="{ name: 'dashboard' }">Todo Manager</RouterLink>
      </div>
      <div class="flex gap-4">
        <div>
          {{ auth?.user?.email }}
        </div>
        <div>{{ xp?.data }} XP</div>
        <div>
          <LanguageSwitcher />
        </div>
        <div>
          <RouterLink :to="{ name: 'logout' }">Logout</RouterLink>
        </div>
      </div>
    </header>
    <div class="flex gap-4 flex-grow min-h-0 h-[calc(100vh - 64px)]">
      <aside class="border-r w-60 h-full flex-initial overflow-auto">
        <TodoSidebar></TodoSidebar>
      </aside>

      <div class="p-4 flex-1">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth-store';
import TodoSidebar from '@/components/TodoSidebar.vue';
import { xpQuery } from '@/queries/xp-query';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';

const auth = useAuthStore();

const { data: xp } = xpQuery();
</script>

<style scoped lang="scss"></style>
