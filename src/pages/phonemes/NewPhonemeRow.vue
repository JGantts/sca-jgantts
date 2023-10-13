<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useLangueageStore } from '../../stores/languages-store'
import { FeatureStop, Phoneme } from 'src/common/commonTypes'
import PhonemeFeature from './PhonemeFeature.vue'
const store = useLangueageStore()

const props = defineProps({
  phoneTypeId: String,
})

const featuresComponents = ref(null)

const allIsSet = ref(false)

function allSet () {
  console.log(featureStops)
  console.log(Object.values(featureStops))
  console.log(Object.values(featureStops).filter(x => x === null))
  console.log(Object.values(featureStops).filter(x => x === null).length === 0)
  return Object.values(featureStops).filter(x => x === null).length === 0
}

function addSelf () {
  if (!store.languages) return
  const featureStopsTemp = Object.values(featureStops)
  if (!allSet()) return
  const featureStopsAsStops = featureStopsTemp as FeatureStop[]
  const newId = crypto.randomUUID()
  console.log(featureStopsAsStops)
  console.log(featuresComponents.value)
  store.languages.data.phonemes[newId] = {
    id: newId,
    typeID: props.phoneTypeId ?? '',
    desc: '',
    syllabic: 'Syllabic',
    IPA: ipa.value,
    featureStops: featureStopsAsStops,
  }
}

function phoneType () {
  return store.languages?.data.phoneTypes[props.phoneTypeId ?? '']
}

const ipa = ref('')

function newStop (newStop: FeatureStop) {
  console.log(featureStops)
  console.log(newStop.categoryId)
  featureStops[newStop.categoryId] = newStop
  allIsSet.value = allSet()
}

const featureStops: { [id: string] : FeatureStop | null } = {}

console.log(props.phoneTypeId)
for (
  const feature
  of
  store.languages
    ?.data.phoneTypes[props.phoneTypeId ?? '']
    .features ?? []
) {
  console.log(feature)
  featureStops[feature.id] = null
}

</script>

<template>
  <q-tr style="height: 1rem;">
    <q-td
      style="
        width:2.5rem;
        height: 1rem;
      "
      class="text-center"
    >
      <q-btn
        size="sm" color="positive" round dense
        icon="add"
        :disable="!allIsSet"
        @click="addSelf"
      />
    </q-td>
    <q-td>
      <q-input filled
        v-model="ipa" label="" dense outlined style="width: 3.5rem;"
      />
    </q-td>
    <q-td
      v-for="feature in phoneType()?.features"
      :key="feature.id">
      <PhonemeFeature
        :feature-category="feature.id"
        :type-id="phoneType()?.id"
        @new-stop="newStop"
      />
    </q-td>
  </q-tr>
</template>

<style scoped>

</style>
