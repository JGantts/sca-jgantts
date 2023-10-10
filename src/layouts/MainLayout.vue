<script lang="ts">
/// ////////// ///
/// VERSIONING ///
/// ////////// ///
const majorVersion: string = '0'
const minorVersion: string = '1'
const betaVersion: string = '1'
const buildVersion: string = '5'
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ store?.languages?.metadata?.projectName ?? 'SCA JGantts' }}
        </q-toolbar-title>

        <div>{{ softwareTitle }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink, { EssentialLinkProps } from '../components/EssentialLink.vue'
import { useLangueageStore } from '../stores/languages-store'
const store = useLangueageStore()

let versionNumber = majorVersion
if (minorVersion !== '0') {
  versionNumber += '.' + minorVersion
  if (betaVersion !== '0') {
    versionNumber += '.' + betaVersion
    if (buildVersion !== '0') {
      versionNumber += '.' + buildVersion
    }
  }
}

const softwareTitle = `SCA JGantts - v${versionNumber}`

const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Save/Load',
    icon: 'description',
    link: 'save-load',
  },
  {
    title: 'Overview',
    icon: 'draft',
    link: './',
  },
  {
    title: 'Phone Types',
    icon: 'draft',
    link: 'phone-types',
  },
  {
    title: 'Phones',
    icon: 'draft',
    link: 'phones',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
