<template>
  <q-page class="row items-center justify-evenly">

  <div
    style='
      position:relative;
      display: grid;
    '
  >
    <NewLexemeComponent />
    <br />
    <LexemeListComponent />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import LexemeListComponent from './LexemeListComponent.vue'
import NewLexemeComponent from './NewLexemeComponent.vue'
</script>
