<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useLangueageStore } from '../store'

import ipa from "../templates/ipa.json"
import type { SaveFile, WorkingFile } from '../file/FileTypes';
import { getSaveFile } from '../phones';

// access the `store` variable anywhere in the component ✨
const store = useLangueageStore()

//assemblePhones()

window.ondragenter = (e) => {
  console.log("hi1")
  e.stopImmediatePropagation()
  e.preventDefault()
  isDragging.value = true
}


const myProps = defineProps<{
  changeTab: (tab: string) => void,
  loadFromFiles: {
    loadFromFiles: ((file: FileList) => void)|null
  }
}>()

type templateName = "ipa"|"blank"

let isDragging = ref(false)

function dragleave(e: DragEvent) {
  console.log("leave")
  e.stopImmediatePropagation()
  e.preventDefault()
  isDragging.value = false
}

function drop(e: DragEvent) {
  console.log("drop")
  e.stopImmediatePropagation()
  e.preventDefault()
  isDragging.value = false

  const dt = e.dataTransfer;
  const files = dt?.files;
  if (files) {
    if (myProps.loadFromFiles.loadFromFiles)
    myProps.loadFromFiles.loadFromFiles(files);
  }
}
</script>

<template>
  <div
    @dragleave="dragleave"
    @drop="drop"
    @dragover="(e) => e.preventDefault()"
    id="dropzone"
    class="dropzone"
    :class="{ makeVisible: isDragging }"
  >
    Drop Project File Here
  </div>
</template>

<style>
.dropzone {
  position: absolute;
  width: 100dvw;
  height: 100dvh;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s, visibility 0.5s;
}

.makeVisible {
  visibility: visible;
  opacity: 100;
}

.overlay {
  position: absolute;
  display: flex;
  top:0;
  left:0;
  opacity: 0;
  transition: opacity 0.3s;
}

.draggingOverlay {
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: radial-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.25));
  border-radius: 1rem;
  color: var(--jg-c-text-highlight);
  pointer-events: none;
}
</style>
