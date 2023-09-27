<script setup lang="ts">
import type { Description, FeatureCategory, FeatureStop, Phoneme } from './commonTypes';
import { useLangueageStore } from './store'

const store = useLangueageStore()

function capitalizeFirstLetter(string: string|null): string {
  if (!string) return ""
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function featureStopValueDesc(phoneme: Phoneme, featureCategory: FeatureCategory): Description {
  return featureCategory.type.values.filter(
    x => x.id === phoneme.featureStops.filter(
      y => y.categoryID === featureCategory.id
    )[0]?.id
  )[0]?.desc
}
</script>


<template>
  <div v-for="phoneType in store.languages?.data.phoneTypes">
    <h1>{{ capitalizeFirstLetter(phoneType.desc) }}</h1>
    <table>
      <tr>
        <th>
          IPA
        </th>
        <th v-for="feature in phoneType.features">
          {{ feature.desc }}
        </th>
      </tr>
      <!-- @vue-expect-error -->
      <tr v-for="phoneme in Object.values(store.languages?.data.phonemes).filter(x => x.typeID === phoneType.id)">
        <td>
        {{ phoneme.IPA }}
        </td>
        <td v-for="feature in phoneType.features">
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
</style>
