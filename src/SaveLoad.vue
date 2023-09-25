<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Overview from './Overview.vue';
import SaveLoad from './SaveLoad.vue'
import type { SaveFile, WorkingFile } from './commonTypes';
import { languages, loadSaveFile } from './phones'

//assemblePhones()

type templateName = "ipa"|"blank"

function loadTemplate(templateName: templateName) {
  switch (templateName) {
    case "ipa":
      load("")
    break

    case "blank":
      load("")
    break
  }
}

function newFileSelected(e: Event) {
  let input = document.getElementById("fileToLoad") as HTMLInputElement
  if (!input) return
  let files = input.files
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
    load(result)
  }
  reader.readAsText(selectedFile)
  fileSelected.value = true
}

function saveToFile() {
  if (!languages) return
  let toSave = save(languages)
  download("mylang.json", toSave)
}


function load(language: string) {
  let selectedFile = document.getElementById('selectedFileOverlay')
  if (!selectedFile) return
  selectedFile.innerText = language
  fileContents = language
}

function loadFromFile() {
  let save: SaveFile = JSON.parse(fileContents)
  if (!save) return
  loadSaveFile(save)
}

function save(langs: WorkingFile): string {
  
  let toSave: SaveFile = {
    phoneTypes: Object.values(langs.phoneTypes),
    languages: Object.values(langs.languages),
    lexicon: langs.lexicon,
  }
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
    :class="{ makeVisible: fileSelected }"
    >
    <div id="selectedFileOverlayTitle" />
    <div id="selectedFileOverlayBody" />
    </div>
  </div>
  <div>
    <button @click="loadFromFile()">
      Load chosen .json file
    </button>
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
  border-color: var(--color-text);
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
  color: white;
  pointer-events: none;
}

.selectedFileOverlay {
  justify-content: center;
  align-items: center;
  margin: 0.1rem;
  height: calc(100% - 2*0.1rem);
  width: calc(100% - 2*0.1rem);
  background: radial-gradient(closest-side, white, black);
  color: black;
  border-radius: calc(1rem - 0.1rem);
  pointer-events: none;
  overflow-y: hidden;
  overflow-x:scroll;

  font-size: x-small;
}

.makeVisible {
  opacity: 100;
}
</style>
