<script setup lang="ts">
import { defineProps } from 'vue'
import { useLangueageStore } from '../../stores/languages-store'
const store = useLangueageStore()

const props = defineProps({
  phonemeId: String,
  featureCategory: String,
})

console.log(props.phonemeId)

function phoneme () {
  return Object.values(store?.languages?.data?.phonemes ?? {}).filter(x => x.id === props.phonemeId)[0]
}

function featureStop () {
  return phoneme().featureStops.filter(x => x.categoryId === props.featureCategory)[0]
}

function options () {
  return store.languages?.data.phoneTypes[phoneme().typeID].features
    .filter(x => x.id === featureStop().categoryId)[0].types
    .map(x => x.id)
}

function featureStopName (opt: unknown) {
  return store.languages?.data.phoneTypes[phoneme().typeID].features
    .filter(x => x.id === featureStop().categoryId)[0]
    .types
    .filter(x => x.id === opt)
    .map(x => x.desc)[0] ?? ''
}

function featureCategoryName () {
  return store.languages?.data.phoneTypes[phoneme().typeID].features
    .filter(x => x.id === featureStop().categoryId)[0].desc ?? ''
}
</script>

<template>
  <div v-if="phoneme()">
    <q-select filled dense outlined
      v-model="featureStop().stopId"
      :label="featureCategoryName()"
      :options="options()"
      :option-value="opt => opt"
      :option-label="featureStopName"
    />
  </div>
</template>
