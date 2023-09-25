<script setup lang="ts">
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
  download("mylang.scajg.json", toSave)
}


function load(language: string) {

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
</script>

<template>
  <div class="container">
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
      <input type="file" id="fileToLoad" accept=".scajg.json"/>
    </div>
    <div>
      <button @click="loadFromFile()">
        Load from chosen .scajg.json file
      </button>
    </div>
  </div>
  <br />
  <div class="container">
    <h3>Save</h3>
    <div>
      <button @click="saveToFile()">
        Save to .scajg.json file
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
</style>
