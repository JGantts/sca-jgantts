<script setup lang="ts">

import { ref } from 'vue'
import { useLangueageStore } from '../../stores/languages-store'

import PhonesCategory from './PhonemesCategory.vue'

const store = useLangueageStore()

const tab = ref(Object.values(store.languages?.data.phoneTypes ?? {})[0]?.id ?? '')
</script>

<template>
  <q-tabs
    v-model="tab"
  >
    <q-tab
      v-for="phoneType in store.languages?.data.phoneTypes"
      :key="phoneType.id"
      :name="phoneType.id ?? ''"
      :label="phoneType.desc ?? ''"
      style="height: 2.5rem"
    />
  </q-tabs>
  <q-tab-panels
    v-model="tab"
    animated
    v-for="phoneType in store.languages?.data.phoneTypes"
    :key="phoneType.id"
    :name="phoneType.id"
    style="
      padding: 0;
      height: calc(100%-2.5rem);
    "
  >
    <q-tab-panel
      :name="phoneType.id"
      style="
        padding: 0;
        height: 100%
      "
    >
      <PhonesCategory :phone-type="phoneType" />
    </q-tab-panel>
  </q-tab-panels>
</template>

<style scoped>
.can-rotate {
  transition: transform 0.3s ease-in-out;
}
.rotate {
  transform: rotate(90deg);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, max-height 0.3s, transform 0.3s;
}
.fade-enter {
  opacity: 0;
}
.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: opacity 0.3s, max-height 0.3s, transform 0.3s;
}
.slide-enter {
  transform: translateX(-100%);
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
