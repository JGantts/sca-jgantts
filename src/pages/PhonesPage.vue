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
  sortable: boolean,
  align: "left",
}[] {
  const toReturn: {
    name: string,
    field: (row: FeatureCategory) => string,
    sortable: boolean,
    align: "left",
  } [] = []

  toReturn.push({
    name: 'IPA',
    field: (row: FeatureCategory) => row.IPA ?? '[Error]',
    sortable: true,
    align: "left",
  })

  for (const cat of cats) {
    toReturn.push({
      name: cat.desc ?? '[Error]',
      field: (row: FeatureCategory) => featureStopValueDesc(row, cat) ?? '[Error]',
      sortable: true,
      align: "left",
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
        row-key="id"
        separator="none"
      >

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width style="padding: 0.5rem">
            <q-btn
              size="sm" color="accent" round dense
              @click="props.expand = !props.expand"
              icon="chevron_right"
              :class="{ rotate: props.expand }"
              class="can-rotate"
            />
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
        <transition name="fade-expand">
          <q-tr v-if="props.expand" :props="props" style="height: 2.5rem">
            <q-td colspan="100%">
              <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
            </q-td>
          </q-tr>
        </transition>
      </template>

      <template v-slot:top-row>
        <q-tr :props="props">
          <q-td auto-width style="padding: 0.5rem">
            <q-btn size="sm" color="primary" round dense @click="props.expand = !props.expand" icon="add" />
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

.fade-expand-enter-active, .fade-expand-leave-active {
  transition: opacity 0.3s, max-height 0.3s, transform 0.3s;
}
.fade-expand-enter {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-expand-enter-from {
  opacity: 0;
  transform: translateX(-100%);
}
.fade-expand-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
