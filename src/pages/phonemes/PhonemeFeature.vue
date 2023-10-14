<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useLangueageStore } from '../../stores/languages-store'
import { FeatureStop } from 'src/common/commonTypes'
const store = useLangueageStore()

const emit = defineEmits([
  'new-stop',
  'enter-up',
])

const props = defineProps({
  typeId: {
    type: String,
    isRequired: false,
  },
  phonemeId: {
    type: String,
    isRequired: false,
  },
  featureCategory: String,
  clearSignal: Boolean,
  index: Number,
})

watch(() => props.clearSignal, (clear) => {
  if (clear) {
    stopId.value = ''
    newValue('')
  }
})

function phoneme () {
  if (!props.phonemeId) return null
  return Object.values(store?.languages?.data?.phonemes ?? {}).filter(x => x.id === props.phonemeId)[0]
}

const stopId = ref(phoneme() ? (featureStop() as FeatureStop)?.stopId : '')

function typeIdFunc () {
  return props.typeId ?? phoneme()?.typeID ?? ''
}

function featureStop () {
  if (!props.phonemeId) {
    return {
      categoryId: props.featureCategory,
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return phoneme()!.featureStops.filter(x => x.categoryId === props.featureCategory)[0]
}

function options () {
  let categoryId: string|undefined
  if (!props.phonemeId) {
    categoryId = props.featureCategory
  } else {
    categoryId = featureStop().categoryId
  }
  return store.languages?.data.phoneTypes[typeIdFunc()].features
    .filter(x => x.id === categoryId)[0].types
    .map(x => x.id)
}

function featureStopName (opt: unknown) {
  return store.languages?.data.phoneTypes[typeIdFunc()].features
    .filter(x => x.id === featureStop().categoryId)[0]
    .types
    .filter(x => x.id === opt)
    .map(x => x.desc)[0] ?? ''
}

function featureCategoryName () {
  return store
    .languages
    ?.data
    .phoneTypes[typeIdFunc()]
    .features
    .filter(x => x.id === featureStop()?.categoryId)[0]
    ?.desc ?? ''
}

function newValue (value: string) {
  if (!props.phonemeId) {
    const stop: FeatureStop = {
      categoryId: props.featureCategory ?? '',
      stopId: value,
    }
    emit('new-stop', stop)
  }
  featureStop().stopId = value
}

function keyup (e: KeyboardEvent) {
  if (
    e.key === 'Enter'
  ) {
    emit('enter-up', {
      featureCategory: props.featureCategory,
      index: props.index,
    })
    e.preventDefault()
  }
}
</script>

<template>
  <q-select filled dense outlined
    v-model="stopId"
    :label="featureCategoryName()"
    :options="options()"
    :option-value="opt => opt"
    :option-label="featureStopName"
    @update:model-value="newValue"
    @keyup="keyup"
    bg-color="secondary"
  />
</template>
