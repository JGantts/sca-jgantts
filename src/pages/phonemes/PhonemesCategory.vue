<script setup lang="ts">
import PhonemeRow from './PhonemeRow.vue'
import NewPhonemeRow from './NewPhonemeRow.vue'
import { PropType, Ref, ref } from 'vue'
import type { Description, FeatureCategory, PhoneType, Phoneme } from '../../common/commonTypes'
import TopAndBottomRow from './TopAndBottomRows.vue'

import { useLangueageStore } from '../../stores/languages-store'

const store = useLangueageStore()

const props = defineProps({
  phoneType: {
    type: Object as PropType<PhoneType>,
    required: true,
  },
})

function featureCategoryToColumns (cats: FeatureCategory[]): {
  name: string,
  label: string,
  id: string,
  field: (row: Phoneme) => string,
  sortable: boolean,
  align: 'left'|'right',
}[] {
  const toReturn: {
    name: string,
    label: string,
    id: string,
    field: (row: Phoneme) => string,
    sortable: boolean,
    align: 'left'|'right',
  } [] = []

  for (const cat of cats) {
    toReturn.push({
      name: (cat.id ?? '[Error]'),
      label: 'bye |' + (cat.desc ?? '[Error]') + '| hi',
      id: cat.id,
      field: (row: Phoneme) => featureStopValueDesc(row, cat) ?? '[Error]',
      sortable: true,
      align: 'left',
    })
  }

  return toReturn
}
function isRowExpanded (rowId: string) {
  return expandedRows.value.includes(rowId)
}

function toggleRowExpansion (rowId: string) {
  if (isRowExpanded(rowId)) {
    const index = expandedRows.value.indexOf(rowId)
    if (index > -1) {
      expandedRows.value.splice(index, 1)
    }
  } else {
    expandedRows.value.push(rowId)
  }
}

const pagation
= {
  rowsPerPage: 0,
}

const expandedRows: Ref<string[]> = ref([])

function featureStopValueDesc (phoneme: Phoneme, featureCategory: FeatureCategory): Description {
  return featureCategory.types.filter(
    x => x.id === phoneme.featureStops.filter(
      y => y.categoryId === featureCategory.id,
    )[0]?.stopId,
  )[0]?.desc
}

const rows: Ref<Phoneme[]> = ref([])

function updateRows () {
  rows.value = store.languages ? Object.values(store.languages.data.phonemes).filter(x => x.typeID === props.phoneType.id) : []
}

updateRows()

function newPhoneme () {
  updateRows()
}
</script>

<template>
  <div style="padding: 0;">
    <q-table
      class="my-sticky-header-table"
      :rows="rows"
      :columns="featureCategoryToColumns(phoneType.features)"
      row-key="id"
      separator="none"
      hide-header
      hide-bottom
      v-model:pagination="pagation"
    >

      <template v-slot:top-row>
        <TopAndBottomRow
          class="myclass third"
          :phone-type="phoneType"
        />
      </template>

      <template v-slot:body="props">
        <PhonemeRow
          :cols="props.cols"
          :row="props.row"
          :is-row-expanded="isRowExpanded"
          :toggle-row-expansion="toggleRowExpansion"
        />
      </template>

      <template v-slot:bottom-row>
        <NewPhonemeRow
          class="myclass bottom"
          :phone-type-id="phoneType.id"
          @new-phoneme="newPhoneme"
        />
      </template>

    </q-table>
  </div>
</template>

<style>
.my-sticky-header-table {
  /* height or max-height is important */
  height: calc(100dvh - 2.5rem - 3rem - 2*0.3rem);
  /* this is when the loading indicator appears */
  /* prevent scrolling behind sticky top row on focus */ }
  .my-sticky-header-table .q-table__top,
  .my-sticky-header-table .q-table__bottom,
  .my-sticky-header-table thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: var(--q-primary);
  }
  .my-sticky-header-table thead tr th {
    position: sticky;
    z-index: 1; }
  .my-sticky-header-table thead tr:first-child th {
    top: 0; }
  .my-sticky-header-table.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px; }
  .my-sticky-header-table tbody {
    /* height of all previous header rows */
    scroll-margin-top: 48px; }

.myclass {
  position: sticky;
  z-index: 1;
  background-color: var(--q-primary);
}

.third {
  top: 96px;
  background-color: var(--q-primary);
}

.bottom {
  bottom: 0;
  background-color: var(--q-primary);
}

</style>
