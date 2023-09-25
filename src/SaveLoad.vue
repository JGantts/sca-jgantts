<script setup lang="ts">
import { ref, type Ref } from 'vue';
import Overview from './Overview.vue';
import SaveLoad from './SaveLoad.vue'
import type { SaveFile } from './commonTypes';
import { lexicon } from './lexicon';
import { phonemes, phoneTypes, languageData, assemblePhones, phoneTypesPrivate, languages } from './phones'

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

function loadFromFile() {
  let input = document.getElementById("fileToLoad") as HTMLInputElement
  if (!input) return
  let files = input.files
  if (!files) return
  loadFromFiles(files)
}

function loadFromFiles(files: FileList) {
  const selectedFile = files[0]
  if (!selectedFile) return
  const reader = new FileReader()
  reader.onload = (e) => {
    let result = e.target?.result
    if (!result) return
    if (result instanceof ArrayBuffer) return
    load(result)
  }
  reader.readAsText(selectedFile)
}

function saveToFile() {
  let toSave = save()
  download("mylang.json", toSave)
}


function load(language: string) {
  console.log(language)
}

function save(): string {
  let toSave: SaveFile = {
    phoneTypes: phoneTypesPrivate,
    languages,
    lexicon,
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

function dragover(e: DragEvent) {
  e.stopImmediatePropagation();
  e.preventDefault();
  isDragging.value = true
  console.log("over")
  document.body.style.cursor = "default"
}

function dragleave(e: DragEvent) {
  e.stopImmediatePropagation();
  e.preventDefault();
  console.log(`leave: '${(e.target as HTMLElement).innerHTML}'`)
  isDragging.value = false
  document.body.style.cursor = "default"
}

function drop(e: DragEvent) {
  e.stopImmediatePropagation();
  e.preventDefault();
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
        />
      </div>
      <div>
        <button @click="loadFromFile()">
          Load from chosen .json file
        </button>
      </div>
    </div>
    <div
    class="draggingOverlay"
    :class="{ isDraggingOverlay: isDragging }"
    id="drag-container3"
    >
      Drop Project File Here
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
  border-color: green;
  border-style: solid;
  border-radius: 1rem;
}

.container > h3 {
  padding-bottom: 0.75rem;
}

.draggingOverlay {
  position: absolute;
  top:0;
  left:0; 
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: radial-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.25));
  border-radius: 1rem;
  color: white;
  display: none;
}

.isDraggingOverlay {
  display: flex;
}
</style>
