import { createApp } from 'vue';
import { createPinia } from 'pinia';
import './index.css';

import App from './App.vue';
import router from './router';

import './assets/main.css';
import type { VueQueryPluginOptions } from '@tanstack/vue-query';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { MotionPlugin } from '@vueuse/motion';
import { i18n } from '@/i18n';

const app = createApp(App);

app.use(createPinia());
app.use(i18n);
app.use(router);
app.use(VueQueryPlugin, {
  queryClientConfig: { defaultOptions: { queries: { staleTime: 5000 } } },
} as VueQueryPluginOptions);
app.use(MotionPlugin);

app.mount('#app');
