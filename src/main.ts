import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import {Tabs, Tab} from 'vue3-tabs-component';


createApp(App)
    .component('tabs', Tabs)
    .component('tab', Tab)
    .mount('#app')