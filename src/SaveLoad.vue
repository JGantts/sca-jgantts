<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Overview from './Overview.vue';
import SaveLoad from './SaveLoad.vue'
import { useLangueageStore } from './store'

import ipa from "./templates/ipa.json"
import type { SaveFile, WorkingFile } from './file/FileTypes';
import { getSaveFile } from './phones';

// access the `store` variable anywhere in the component ✨
const store = useLangueageStore()

//assemblePhones()

const myProps = defineProps<{
  changeTab: (tab: string) => void,
}>()

type templateName = "ipa"|"blank"

function loadTemplate(templateName: templateName) {
  switch (templateName) {
    case "ipa":
      load("ipa", JSON.stringify(ipa))
    break

    case "blank":
      load("blank", "")
    break
  }
}

function newFileSelected(e: Event) {
  if (!e) return
  let files = (e?.target as HTMLInputElement)?.files
  if (!files) return
  loadFromFiles(files)
}

function loadFromFiles(files: FileList) {
  const selectedFile = files[0]
  if (!selectedFile) return
  if (selectedFile.type !== "application/json") return
  const reader = new FileReader()
  reader.onload = (e) => {
    let result = e.target?.result
    if (!result) return
    if (result instanceof ArrayBuffer) return
    load(selectedFile.name, result)
  }
  reader.readAsText(selectedFile)
}

function saveToFile() {
  if (!store.languages) return
  let toSave = save(store.languages)
  download("mylang.json", toSave)
}


function load(filename: string, language: string) {
  fileContents = language
  fileSelected.value = true
  let overlay = document.getElementById('selectedFileOverlayOverlay')
  if (overlay) {
    overlay.classList.add('selectedFileOverlayOverlay_initialStart')
    overlay.classList.remove('selectedFileOverlayOverlay_initialStart')
  }
  let selectedFileTitle = document.getElementById('selectedFileOverlayTitle')
  if (!selectedFileTitle) return
  selectedFileTitle.innerText = filename
  let selectedFileBody = document.getElementById('selectedFileOverlayBody')
  if (!selectedFileBody) return
  selectedFileBody.innerText = language
}

function unload() {
  fileContents = ""
  fileSelected.value = false
  let selectedFileTitle = document.getElementById('selectedFileOverlayTitle')
  if (!selectedFileTitle) return
  selectedFileTitle.innerText = ""
  let selectedFileBody = document.getElementById('selectedFileOverlayBody')
  if (!selectedFileBody) return
  selectedFileBody.innerText = ""
}

function loadFromFile() {
  let file
  try {
    file = JSON.parse(fileContents)
  } catch (err) {}
  let save: SaveFile = file
  store.loadSaveFile(save ?? null)
  myProps.changeTab("#overview");
  unload()
}

function save(workingFile: WorkingFile): string {
  let toSave = getSaveFile(workingFile)
  return JSON.stringify(toSave)
}

function download(filename: string, text: string) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

let isDragging = ref(false)
let fileSelected = ref(false)

let fileContents = ""

function dragover(e: DragEvent) {
  e.stopImmediatePropagation()
  e.preventDefault()
  isDragging.value = true
}

function dragleave(e: DragEvent) {
  e.stopImmediatePropagation()
  e.preventDefault()
  isDragging.value = false
}

function drop(e: DragEvent) {
  e.stopImmediatePropagation()
  e.preventDefault()
  isDragging.value = false

  const dt = e.dataTransfer;
  const files = dt?.files;
  if (files) {
    loadFromFiles(files);
  }
}

function closeSelectedFile() {
  unload()
}
</script>

<template>
  <div
    id="drag-container1"
    style="position:relative;"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="drop"
  >
    <div
    id="drag-container2"
      class="container"
    >
      <h3>Load</h3>
      <div>
        <button @click="loadTemplate('ipa')">
          Load IPA template
        </button>
        &nbsp;
        <button @click="loadTemplate('blank')">
          Load blank template
        </button>
      </div>
      <br />
      <div>
        <input 
          type="file"
          id="fileToLoad"
          accept=".json"
          @change="newFileSelected"
        />
      </div>
    </div>
    <div
    class="overlay draggingOverlay"
    :class="{ makeVisible: isDragging }"
    id="drag-container3"
    >
      Drop Project File Here
    </div>
    <div
    id="selectedFileOverlay"
    class="overlay selectedFileOverlay"
    :class="{ makeVisible: fileSelected, makeClickable: fileSelected }"
    >
      <div id="selectedFileOverlayTitleBar">
        <div id="selectedFileOverlayTitle" />
        <button id="selectedFileOverlayClose" @click="closeSelectedFile" />
      </div>
      <div id="selectedFileOverlayBodyContainer">
        <div id="selectedFileOverlayBackground" />
        <div id="selectedFileOverlayBody" />
        <button
          id="selectedFileOverlayOverlay"
          @click="loadFromFile()"
        >
          <div v-if="store.languages!==null" class="unsaved-changes-warning">
            Unsaved changes will be lost!
          </div>
          Load this file
          <div v-if="store.languages!==null" class="unsaved-changes-warning">
            Unsaved changes will be lost!
          </div>
        </button>
      </div>
    </div>
  </div>
  <br />
  <div class="container">
    <h3>Save</h3>
    <div>
      <button @click="saveToFile()">
        Save to .json file
      </button>
    </div>
  </div>
  <br />
  <div>
    <div>
      TODO: load from/save to csv
    </div>
  </div>
</template>

<style>
.container {
  padding: 0.5rem;
  border: 0.1rem;
  border-color: var(--jg-c-border);
  border-style: solid;
  border-radius: 1rem;
}

.container > h3 {
  padding-bottom: 0.75rem;
}

.overlay {
  position: absolute;
  display: flex;
  top:0;
  left:0;
  opacity: 0;
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

.selectedFileOverlay {
  user-select: none;
  pointer-events: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  margin: 0.1rem;
  height: calc(100% - 2*0.1rem);
  width: calc(100% - 2*0.1rem);
  color: var(--jg-c-low-contrast-text);
  border-radius: calc(1rem - 0.1rem);
  overflow-y: hidden;
  overflow-x: scroll;

  font-size: x-small;
  display: flex;
  flex-direction: column;
}

#selectedFileOverlayTitleBar {
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  flex-basis: 1.5rem;
  background-color: var(--jg-c-element-background);
  display: flex;
  flex-grow: 1;
  font-size: small;
}

#selectedFileOverlayTitle {
  flex-grow: 1;
  background-color: var(--jg-c-element-background);
  color: var(--jg-c-text-highlight);
  padding-left: calc((1rem - 0.1rem)/2);
}

#selectedFileOverlayClose {
  pointer-events: auto;
  border-radius: 100%;
  margin-right: calc((1rem - 0.1rem)/4);
  margin-top: calc((1rem - 0.1rem)/8);
  margin-bottom: calc((1rem - 0.1rem)/8);
}


#selectedFileOverlayClose {
    position: relative;
    height: 1rem; /* this can be anything */
    width: 1rem;  /* ...but maintain 1:1 aspect ratio */
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--jg-c-critical-app-background);
    cursor: pointer;
}

#selectedFileOverlayClose::before,
#selectedFileOverlayClose::after {
    position: absolute;
    content: '';
    width: 70%;
    height: 2px; /* cross thickness */
    background-color: var(--jg-c-critical-text-highlight)
}

#selectedFileOverlayClose::before {
    transform: rotate(45deg);
    left: 15%;
}

#selectedFileOverlayClose::after {
    transform: rotate(-45deg);
    left: 15%;
}


#selectedFileOverlayBodyContainer {
  flex-shrink: 1;
  flex-basis: 100%;
  width: 100%;
}

#selectedFileOverlayBody {
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

#selectedFileOverlayBackground {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--jg-c-subtle-background);
}

#selectedFileOverlayOverlay {
  position: absolute;
  top: 1.5rem;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  opacity: 0;

  justify-content: center;
  align-items: center;
  background: radial-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75), rgba(0,0,0,0.125));
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  border: none;
  color: var(--jg-c-text-highlight);
  display: block;

  font-size:large;
  cursor: pointer;
}

.selectedFileOverlayOverlay_initialStart {
  opacity: 100;
}

@media (hover: none) {
  #selectedFileOverlayOverlay {
    opacity: 100;
  }
}

#selectedFileOverlayOverlay:hover {
  opacity: 100;
}

.selectedFileLoadButton {
  opacity: 0;
}

.unsaved-changes-warning {
  color: var(--jg-c-critical-text-highlight)
}

.makeVisible {
  opacity: 100;
}

.makeClickable {
  pointer-events: auto;
}
</style>
