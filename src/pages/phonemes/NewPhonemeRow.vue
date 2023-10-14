<script setup lang="ts">
import { ComponentPublicInstance, Ref, defineProps, ref } from 'vue'
import { useLangueageStore } from '../../stores/languages-store'
import { FeatureStop } from 'src/common/commonTypes'
import PhonemeFeature from './PhonemeFeature.vue'
import { QInput } from 'quasar'
const store = useLangueageStore()

const props = defineProps({
  phoneTypeId: String,
})

const emit = defineEmits([
  'new-phoneme',
])

const allIsSet = ref(false)

function allSet () {
  return (
    Object.values(featureStops)
      .filter(x => x === null)
      .length
      === 0
    && ipa.value !== '')
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
  clearSignal.value = true
  ipa.value = ''
  ipaInput.value?.focus()
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

const ipaInput = ref<QInput | null>(null)
const myfeatures = ref<Array<InstanceType<typeof PhonemeFeature> | null>>([])

function enterUp (args: {
    featureCategory: string,
    index: number,
  }) {
  if (args.index < (myfeatures.value?.length ?? 1) - 1) {
    if (!myfeatures.value) return
    const el = myfeatures.value[args.index + 1]
    if (!el) return
    el.$el.focus()
  }
  allIsSet.value = allSet()
  if (allIsSet.value) {
    addSelf()
  }
}

function keyup (e: KeyboardEvent) {
  if (
    e.key === 'Enter'
  ) {
    e.preventDefault()
    allIsSet.value = allSet()
    if (allIsSet.value) {
      addSelf()
    } else {
      const el = myfeatures.value[0]
      if (!el) return
      el.$el.focus()
    }
  }
}

const clearSignal = ref(false)

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
        type="submit"
        :disable="!allIsSet"
        @click="addSelf"
      />
    </q-td>
    <q-td>
      <q-input
        filled
        v-model="ipa"
        ref="ipaInput"
        label=""
        @keyup="keyup"
        dense outlined
        style="width: 3.5rem;"
        bg-color="secondary"
      />
    </q-td>
    <q-td
      v-for="(feature, index) in phoneType()?.features"
      :key="feature.id">
      <PhonemeFeature
        ref="myfeatures"
        :feature-category="feature.id"
        :type-id="phoneType()?.id"
        :clear-signal="clearSignal"
        :index="index"
        @new-stop="newStop"
        @enter-up="enterUp"
      />
    </q-td>
  </q-tr>
</template>

<style scoped>

</style>
