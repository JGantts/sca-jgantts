<template>
  <router-view />
</template>

<script setup lang="ts">
/* import route from './router/index'

window.history.pushState(null, '', null)

let backButtonPresses = 0
window.addEventListener('popstate', function (_event: PopStateEvent) {
  backButtonPresses += 1
  if (backButtonPresses <= 1) {
    const router = route()
    router.push({ path: '/save-load' })
  } else if (backButtonPresses <= 2) {
    alert('Unsaved data!')
    window.history.pushState(null, '', null)
  }
}) */

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
