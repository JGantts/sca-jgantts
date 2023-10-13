<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useLangueageStore } from '../../stores/languages-store'
import { FeatureStop } from 'src/common/commonTypes'
import PhonemeFeature from './PhonemeFeature.vue'
const store = useLangueageStore()

const props = defineProps({
  phoneTypeId: String,
})

const emit = defineEmits([
  'new-phoneme',
])

const allIsSet = ref(false)

function allSet () {
  return Object.values(featureStops).filter(x => x === null).length === 0
}

function addSelf () {
  if (!store.languages) return
  const featureStopsTemp = Object.values(featureStops)
  if (!allSet()) return
  const featureStopsAsStops = featureStopsTemp as FeatureStop[]
  const newId = crypto.randomUUID()
  store.languages.data.phonemes[newId] = {
    id: newId,
    typeID: props.phoneTypeId ?? '',
    desc: '',
    syllabic: 'Syllabic',
    IPA: ipa.value,
    featureStops: featureStopsAsStops,
  }
  emit('new-phoneme')
}

function phoneType () {
  return store.languages?.data.phoneTypes[props.phoneTypeId ?? '']
}

const ipa = ref('')

function newStop (newStop: FeatureStop) {
  featureStops[newStop.categoryId] = newStop
  allIsSet.value = allSet()
}

const featureStops: { [id: string] : FeatureStop | null } = {}

for (
  const feature
  of
  store.languages
    ?.data.phoneTypes[props.phoneTypeId ?? '']
    .features ?? []
) {
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
