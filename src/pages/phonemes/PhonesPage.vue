<script setup lang="ts">

import { useLangueageStore } from '../../stores/languages-store'

import PhonesCategory from './PhonemesCategory.vue'

const store = useLangueageStore()
</script>

<template>
  <div
    v-for="phoneType in store.languages?.data.phoneTypes"
    :key="phoneType.id"
  >
    <PhonesCategory :phone-type="phoneType" />
  </div>
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
