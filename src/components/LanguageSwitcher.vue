<template>
  <div>
    <ul class="flex gap-2 text-sm">
      <li v-for="availableLocale in availableLocales" :key="availableLocale">
        <button
          class="rounded-full secondary"
          :class="{ active: availableLocale === locale }"
          @click="changeLocale(availableLocale)"
        >
          {{ $t('languages.' + availableLocale) }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { availableLocales } from '@/i18n';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

function changeLocale(newLocale: string) {
  console.log('locale', newLocale);
  locale.value = newLocale;
}
</script>

<style scoped lang="scss"></style>
