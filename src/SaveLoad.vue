<script setup lang="ts">
import Overview from './Overview.vue';
import SaveLoad from './SaveLoad.vue'
import { phonemes, phoneTypes, languageData, assemblePhones } from './phones'

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
  let toSave = saveToFile()
}



function load(language: string) {
  console.log(language)
}

function save(): string {
  return ""
}
</script>

<template>
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
    <input type="file" id="fileToLoad" />
  </div>
  <div>
    <button @click="loadFromFile()">
      Load from chosen file
    </button>
  </div>
  <br />
  <div>
    <button>
      Save to file
    </button>
  </div>
</template>

<style>

</style>
