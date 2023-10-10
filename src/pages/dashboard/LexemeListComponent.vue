<template>
  <h2>List of words:</h2>
  <li v-for="lexeme in store.languages?.data.words" :key="lexeme.id" class="roman-medium">{{ lexemeToString(lexeme.entryForm) }}</li>
</template>

<script setup lang="ts">
import { useLangueageStore } from '../../stores/example-store'
import { lexemeToString } from '../../common/lexemeToString'

const store = useLangueageStore()
</script>
