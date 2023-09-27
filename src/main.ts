import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
//@ts-expect-error
import {Tabs, Tab} from 'vue3-tabs-component';
import { createPinia } from 'pinia';

const pinia = createPinia()

let app = createApp(App)
    .component('tabs', Tabs)
    .component('tab', Tab)
    .use(pinia)
    .mount('#app')
