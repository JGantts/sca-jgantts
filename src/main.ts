import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
//@ts-expect-error
import {Tabs, Tab} from 'vue3-tabs-component';
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
})

const pinia = createPinia()

let app = createApp(App)
    .component('tabs', Tabs)
    .component('tab', Tab)
    .use(vuetify)
    .use(pinia)
    .use(VNetworkGraph)
    .mount('#app')
