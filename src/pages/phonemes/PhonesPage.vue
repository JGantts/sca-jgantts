<script setup lang="ts">
import type { Description, FeatureCategory, Phoneme } from '../../common/commonTypes'
import { useLangueageStore } from '../../stores/languages-store'
import PhonemeRow from './PhonemeRow.vue'

const store = useLangueageStore()

function capitalizeFirstLetter (string: string|null): string {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function featureStopValueDesc (phoneme: Phoneme, featureCategory: FeatureCategory): Description {
  return featureCategory.types.filter(
    x => x.id === phoneme.featureStops.filter(
      y => y.categoryId === featureCategory.id,
    )[0]?.stopId,
  )[0]?.desc
}

function featureCategoryToColumns (cats: FeatureCategory[]): {
  name: string,
  label: string,
  required?: boolean,
  field: (row: FeatureCategory) => string,
  sortable: boolean,
  align: 'left',
}[] {
  const toReturn: {
    name: string,
    label: string,
    field: (row: FeatureCategory) => string,
    sortable: boolean,
    align: 'left',
  } [] = []

  toReturn.push({
    name: 'IPA',
    label: 'IPA Label',
    field: (row: FeatureCategory) => row.IPA ?? '[Error]',
    sortable: true,
    align: 'left',
  })

  for (const cat of cats) {
    toReturn.push({
      name: (cat.desc ?? '[Error]'),
      label: cat.desc ?? '[Error]',
      field: (row: FeatureCategory) => featureStopValueDesc(row, cat) ?? '[Error]',
      sortable: true,
      align: 'left',
    })
  }
  return toReturn
}

</script>

<template>
  <div
    v-for="phoneType in store.languages?.data.phoneTypes"
    :key="phoneType.id"
  >
    <div class="q-pa-md">
      <q-table
        :title="capitalizeFirstLetter(phoneType.desc)"
        :rows="Object.values(store.languages?.data.phonemes).filter(x => x.typeID === phoneType.id)"
        :columns="featureCategoryToColumns(phoneType.features)"
        row-key="x => x.id"
        separator="none"
      >

      <template v-slot:body="props">
        <PhonemeRow
          :cols="props.cols"
          :id="props.row.id"
        />
      </template>

      <template v-slot:top-row>
        <q-tr>
          <q-td auto-width style="padding: 0.5rem">
            <q-btn size="sm" color="primary" round dense icon="add" />
          </q-td>
          <q-td>
            IPA
          </q-td>
          <q-td v-for="feature in phoneType.features" :key="feature.id">
            IPA
          </q-td>
        </q-tr>
      </template>
      </q-table>
    </div>
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
