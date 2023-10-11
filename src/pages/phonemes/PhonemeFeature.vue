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
  return store.languages?.data.phoneTypes[phoneme().typeID].features[0].types.map(x => x.id)
}

</script>

<template>
  <div v-if="phoneme()">
    <q-select filled dense outlined
      v-model="featureStop().stopId"
      :label="props.featureCategory"
      :options="options()"
    />
  </div>
</template>
