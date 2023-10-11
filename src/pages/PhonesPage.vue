<script setup lang="ts">
import type { Description, FeatureCategory, Phoneme } from '../common/commonTypes'
import { useLangueageStore } from '../stores/languages-store'

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
  required?: boolean,
  field: (row: FeatureCategory) => string,
  sortable: true,
}[] {
  const toReturn: {
    name: string,
    required?: boolean,
    field: (row: FeatureCategory) => string,
    sortable: true,
  } [] = []

  toReturn.push({
    name: 'IPA',
    required: true,
    field: (row: FeatureCategory) => row.IPA ?? '[Error]',
    sortable: true,
  })
  for (const cat of cats) {
    toReturn.push({
      name: cat.desc ?? '[Error]',
      required: true,
      field: (row: FeatureCategory) => featureStopValueDesc(row, cat) ?? '[Error]',
      sortable: true,
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
        row-key="name"
      />
    </div>
  </div>
</template>

<style scoped>
table { border-collapse: collapse; }
tr { border-bottom: solid thin; }
tr:last-child { border-bottom: none; }
.phoneTypeConainer {
  display: flex;
  gap: 2rem;
}
th {
  border-right: solid thin;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}
th:last-child { border-right: none; }
td {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
td:first-child {
  padding-left: 0;
}
td:last-child {
  padding-right: 0;
}
</style>
