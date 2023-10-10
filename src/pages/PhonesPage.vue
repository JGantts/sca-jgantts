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
</script>

<template>
  <div
    v-for="phoneType in store.languages?.data.phoneTypes"
    :key="phoneType.id"
  >
    <h1>{{ capitalizeFirstLetter(phoneType.desc) }}</h1>
    <table>
      <tr>
        <th>
          IPA
        </th>
        <th
          v-for="featureCat in phoneType.features"
          :key="featureCat.id"
        >
          {{ featureCat.desc }}
        </th>
      </tr>
      <!-- @vue-expect-error -->
      <tr
        v-for="phoneme in Object.values(store.languages?.data.phonemes).filter(x => x.typeID === phoneType.id)"
        :key="phoneme.id"
      >
        <td>
        {{ phoneme.IPA }}
        </td>
        <td
          v-for="feature in phoneType.features"
          :key="feature.id"
        >
          {{ featureStopValueDesc(phoneme, feature) }}
        </td>
      </tr>
    </table>
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
