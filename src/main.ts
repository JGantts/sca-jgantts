import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia';
import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  display: {
    mobileBreakpoint: 'md',
    thresholds: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1904,
    },
  }
})

import Overview from './Overview.vue'
import SaveLoad from './SaveLoad.vue'

const routes = [
  { path: '/', component: Overview },
  { path: '/load-save', component: SaveLoad },
]

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory('/sca-jgantts/'),
  routes,
  
})


const pinia = createPinia()

let app = createApp(App)
    .use(vuetify)
    .use(pinia)
    .use(VNetworkGraph)
    .use(router)
    .mount('#app')
