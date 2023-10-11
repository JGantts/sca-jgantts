<script setup lang="ts">
import PhonemeRow from './PhonemeRow.vue'
import { PropType, Ref, ref } from 'vue'
import type { Description, FeatureCategory, PhoneType, Phoneme } from '../../common/commonTypes'

import { useLangueageStore } from '../../stores/languages-store'

const store = useLangueageStore()

const props = defineProps({
  phoneType: {
    type: Object as PropType<PhoneType>,
    required: true,
  },
})

function capitalizeFirstLetter (string: string|null): string {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

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

function isRowLast (row: unknown) {
  const lastRowIndex = (paginations[row.typeID].page - 1) * paginations[row.typeID].rowsPerPage + paginations[row.typeID].rowsPerPage - 1
  const unsortedData = Object.values(store.languages.data.phonemes).filter(x => x.typeID === row.typeID)
  return unsortedData.indexOf(row) === lastRowIndex || unsortedData.indexOf(row) === unsortedData.length - 1
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

const paginations: {
  [id: string] : {
  sortBy: string,
  descending: boolean,
  page: number,
  rowsPerPage: number,
  rowsNumber: number
} }
= {}

const expandedRows: Ref<string[]> = ref([])

function featureStopValueDesc (phoneme: Phoneme, featureCategory: FeatureCategory): Description {
  return featureCategory.types.filter(
    x => x.id === phoneme.featureStops.filter(
      y => y.categoryId === featureCategory.id,
    )[0]?.stopId,
  )[0]?.desc
}
</script>

<template>
      <div class="q-pa-md">
      <q-table
        :title="capitalizeFirstLetter(phoneType.desc)"
        :rows="store.languages ? Object.values(store.languages.data.phonemes).filter(x => x.typeID === phoneType.id) : []"
        :columns="featureCategoryToColumns(phoneType.features)"
        row-key="id"
        separator="none"
        v-model:pagination="paginations[phoneType.id]"
      >

      <template v-slot:header>
        <q-tr>
          <q-td auto-width style="padding: 0.5rem">
            <q-btn size="sm" color="primary" round dense icon="add" />
          </q-td>
          <q-td>
            New IPA
          </q-td>
          <q-td v-for="feature in phoneType.features" :key="feature.id">
            New Value
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top-row>
        <q-tr>
          <q-td />
          <q-td style="border-style: dotted;">
            IPA
          </q-td>
          <q-td v-for="feature in phoneType.features" :key="feature.id">
            {{ feature.desc }}
          </q-td>
        </q-tr>
        <q-tr>
          <q-td colspan="100%" :style="{ height: '1px', padding: '0', 'padding-left': '10px', 'padding-right': '10px', }">
            <hr style="width: 100%;"/>
          </q-td>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <PhonemeRow
          :cols="props.cols"
          :row="props.row"
          :is-row-expanded="isRowExpanded"
          :toggle-row-expansion="toggleRowExpansion"
          :is-row-last="isRowLast"
        />
      </template>

      </q-table>
    </div>
</template>
