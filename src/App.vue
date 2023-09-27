
<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Overview from './Overview.vue';
import SaveLoad from './SaveLoad.vue'
import Phones from './Phones.vue'
import PhoneTypes from './PhoneTypes.vue'
//@ts-expect-error
import {Tabs, Tab} from 'vue3-tabs-component';

const tabsHolder: Ref<Tabs|null> = ref(null)

function changeTab(tabId: string) {
  if (!tabsHolder.value) return
  tabsHolder.value.selectTab(tabId)

}

const versionNumber = "0.1"
const softwareTitle = `'SCA JGantts - v${versionNumber}'`;
</script>

<template>
<tabs ref="tabsHolder" :options="{ useUrlFragment: false }">
  <tab name="Load/Save">
    <SaveLoad v-bind:changeTab="changeTab"/>
  </tab>
  <tab name="Overview">
    <Overview />
  </tab>
  <tab name="Phone Types">
    <PhoneTypes />
  </tab>
  <tab name="Phones">
    <Phones />
  </tab>
</tabs>
</template>

<style>
#app {
  height: 100%;
  width: 100%;
  padding: 0;
}



.tabs-component-tabs {
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.tabs-component-tabs::after {
  margin-top: auto;
  font-size: x-small;
  content: v-bind('softwareTitle');
}

.tabs-component {
  display: flex;
  height: 100%;
  width: 100%;
}

.tabs-component-tabs {
  min-width: 8rem;
  max-width: 15rem;
  width: 20%;
  padding: 1rem;
  height: 100%;
  list-style: none;
}
.tabs-component-panels {
  min-height: 100vh;
  width: 100%;
  padding: 1rem;
  border-left-color: green;
  border-left-width: 0.125rem;
  border-left-style: solid;
}
.is-active {
  color: darkgreen;
}
@media (prefers-color-scheme: dark) {
  .is-active {
    color: greenyellow;
  }
}

</style>
