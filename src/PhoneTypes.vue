<script setup lang="ts">
import { useLangueageStore } from './store'

const store = useLangueageStore()

function capitalizeFirstLetter(string: string|null): string {
  if (!string) return ""
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>


<template>
  <h1>Phoneme Types</h1>
  <div class="phoneTypeConainer">
    <div v-for="phoneType in store.languages?.phoneTypes">
      <h2>{{ phoneType.desc }}</h2>
      <table>
        <tr>
          <th></th>
        </tr>
        <tr v-for="featureType in phoneType.features">
          <td>{{ featureType.desc }}</td>
          <td>
            <li v-for="thig in featureType.type.values">
              {{ thig.desc }}
            </li>
          </td>
        </tr>
      </table>
      <br />
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
</style>
