<template>
  <router-view />
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'

const $q = useQuasar()

const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

if (userPrefersDark) {
  $q.dark.set(true)
} else {
  $q.dark.set(false)
}

const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
darkModeMediaQuery.addEventListener('change', e => {
  const darkModeOn = (e as MediaQueryListEvent).matches
  $q.dark.set(darkModeOn)
})
</script>
