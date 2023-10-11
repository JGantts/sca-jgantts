<script setup lang="ts">
import { ref, defineProps } from 'vue'

const props = defineProps({
  phonemeId: String,
  featureCategory: String,
})

const value = ref()
</script>

<template>
  <q-select filled v-model="value" label="" dense outlined />
</template>
