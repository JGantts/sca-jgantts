<script setup lang="ts">

///////////////
//VERSIONING///
///////////////
const majorVersion: string = "0"
const minorVersion: string = "1"
const betaVersion: string = "1"
const buildVersion: string = "4"


import { ref, type Ref } from 'vue';
import Overview from './Overview.vue';
import SaveLoad from './SaveLoad.vue'
import AppOverlay from './app overlay/AppOverlay.vue'
import Phones from './Phones.vue'
import PhoneTypes from './PhoneTypes.vue'
import FamilyGraph from './graph/FamilyGraph.vue'
//@ts-expect-error
import {Tabs, Tab} from 'vue3-tabs-component';

const tabsHolder: Ref<Tabs|null> = ref(null)

function changeTab(tabId: string) {
  if (!tabsHolder.value) return
  tabsHolder.value.selectTab(tabId)
}
//[major].[minor].[beta ].[build]
let versionNumber = majorVersion
if (minorVersion != "0") {
  versionNumber += "." + minorVersion
  if (betaVersion != "0") {
    versionNumber += "." + betaVersion
    if (buildVersion != "0") {
      versionNumber += "." + buildVersion
    }
  }
}

const softwareTitle = `'SCA JGantts - v${versionNumber}'`;

const loadFromFiles: {
  loadFromFiles: ((file: FileList) => void)|null
} = {
  loadFromFiles: null
}
</script>

<template>
<div id="app-container">
  <AppOverlay
    v-bind:changeTab="changeTab"
    v-bind:load-from-files="loadFromFiles"
  />
  <div id="tabs-container">
    <tabs ref="tabsHolder" :options="{ useUrlFragment: false }" >
      <tab id="loadsave" name="Load/Save">
        <SaveLoad
          v-bind:changeTab="changeTab"
          v-bind:load-from-files="loadFromFiles"
        />
      </tab>
      <tab id="overview" name="Overview">
        <Overview />
      </tab>
      <tab id="phonetypes" name="Phone Types">
        <PhoneTypes />
      </tab>
      <tab id="phones" name="Phones">
        <Phones />
      </tab>
      <tab id="familygraph" name="Family Graph">
        <FamilyGraph />
      </tab>
    </tabs>
  </div>
</div>
</template>

<style>
#app {
  height: 100%;
  width: 100%;
  padding: 0;
}

.tabs-component-tabs {
  height: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.tabs-component-tabs::after {
  margin-top: auto;
  font-size: x-small;
  color: var(--jg-c-text-highlight);
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
  min-height: 100dvh;
  width: 100%;
  padding: 1rem;
  border-left-color: var(--jg-c-border);
  border-left-width: 0.125rem;
  border-left-style: solid;
}

a {
  color: var(--jg-c-text);
}
a:hover {
  color: var(--jg-c-low-contrast-text-highlight);
}
.is-active,
.is-active a:hover {
  color: var(--jg-c-text-highlight);
}

</style>
