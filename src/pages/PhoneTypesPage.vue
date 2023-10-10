<script setup lang="ts">
import { useLangueageStore } from '../stores/languages-store'

const store = useLangueageStore()
</script>

<template>
  <h1>Phone Types</h1>
  <div class="phoneTypeConainer">
    <div
      v-for="phoneType in store.languages?.data.phoneTypes"
      :key="phoneType.id"
    >
      <h2>{{ phoneType.desc }}</h2>
      <table>
        <tr>
          <th></th>
        </tr>
        <tr
          v-for="featureType in phoneType.features"
          :key="featureType.id"
        >
          <td>{{ featureType.desc }}</td>
          <td>
            <li
              v-for="type in featureType.types"
              :key="type.id"
            >
              {{ type.desc }}
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
