<script setup lang='ts'>
import { ref, type Ref } from 'vue'
import { useLangueageStore } from '../../stores/languages-store'

import ipa from '../../templates/ipa.json'
import {
  schemaValidate_SaveFile,
  type SaveFile,
  type Metadata,
} from '../../common/files/FileTypes'
import { getSaveFile, loadSaveFile } from '../../common/phones'

import fileIcon from '../../assets/icons/file-solid.svg'
import fileQuestionIcon from '../../assets/icons/file-circle-question-solid.svg'
import fileCheckIcon from '../../assets/icons/file-circle-check-solid.svg'
import fileExclamationIcon from '../../assets/icons/file-circle-exclamation-solid.svg'
import type { WorkingFile } from '../../common/commonTypes'

import route from '../../router/index'

// import Ajv from 'ajv'

// access the `store` variable anywhere in the component ✨
const store = useLangueageStore()

// assemblePhones()

const selectedFileMetadata: Ref<Metadata|null> = ref(null)
const jsonIcon = ref(fileIcon)

let fileObject: WorkingFile|null = null

// myProps.loadFromFiles.loadFromFiles = loadFromFiles

type templateName = 'ipa'|'blank'

type fileParseStateValue =
  'noFile'
  |'parsingForMetadata'
  |'metadataParseError'
  |'parsingForData'
  |'dataParseError'
  |'validForLoad'
const fileParseState: Ref<fileParseStateValue> = ref('noFile')
const fileParseError: Ref<string|null> = ref(null)

/* console.log(validate({
  name: 'John Doe',
  age: 43,
  phones: ['+44 1234567', '+44 2345678'],
})) */

function loadTemplate (templateName: templateName) {
  switch (templateName) {
    case 'ipa':
      parse(JSON.stringify(ipa))
      break

    case 'blank':
      parse('{}')
      break
  }
}

function newFileSelected (e: Event) {
  if (!e) return
  const files = (e?.target as HTMLInputElement)?.files
  if (!files) return
  loadFromFiles2(files)
}

function loadFromFiles2 (files: FileList) {
  const selectedFile = files[0]
  if (!selectedFile) return
  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result
    if (!result) return
    if (result instanceof ArrayBuffer) return
    parse(result)
  }
  reader.readAsText(selectedFile)
}

function parse (savefileString: string) {
  unload()
  jsonIcon.value = fileIcon
  fileParseState.value = 'parsingForMetadata'

  const savefileObj = JSON.parse(savefileString)

  if (!schemaValidate_SaveFile(savefileObj)) {
    fileParseState.value = 'metadataParseError'
    fileParseError.value = 'Error parsing file. Check console for messages.'
    console.log(savefileString.substring(0, 100))
    console.log(savefileObj)
    console.log(schemaValidate_SaveFile.errors)
    jsonIcon.value = fileExclamationIcon
    return
  }
  const savefile = savefileObj as SaveFile
  selectedFileMetadata.value = savefile.metadata
  fileParseState.value = 'parsingForData'
  jsonIcon.value = fileQuestionIcon

  try {
    fileObject = loadSaveFile(savefile)
  } catch (err: unknown) {
    fileParseState.value = 'dataParseError'
    fileParseError.value = 'Error parsing file. Check console for messages.'
    console.log(err)
    console.log(savefileString.substring(0, 100))
    console.log(savefileObj)
    jsonIcon.value = fileExclamationIcon
    return
  }

  fileParseState.value = 'validForLoad'
  jsonIcon.value = fileCheckIcon
}

function saveToFile () {
  if (!store.languages) return
  const toSave = getSaveFile(store.languages)
  download('mylang.scajgantts', toSave)
}

function unload () {
  const fileToLoad = document.getElementById('fileToLoad') as HTMLInputElement
  if (!fileToLoad) return
  fileToLoad.value = ''
  fileObject = null
  selectedFileMetadata.value = null
  fileParseState.value = 'noFile'
}

function loadFromFile () {
  if (!fileObject) return
  store.loadSaveFile(fileObject)
  const router = route()
  router.push({ path: '/' })
  unload()
}

function download (filename: string, text: string) {
  const element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}

function closeSelectedFile () {
  unload()
}
</script>

<template>
  <div
    style='
      position:relative;
      display: grid;
    '
  >
    <div
      class='container'
      style='display: flex; flex-direction: column; gap: 0.5rem'
    >
      <div class="text-h3 text-weight-thin">Load</div>
      <div>
        <h4>Templates</h4>
        <div style='display: flex;'>
          <q-btn rounded color="secondary" @click='loadTemplate("ipa")'>
            IPA
          </q-btn>
          &nbsp;
          <q-btn rounded color="secondary" click='loadTemplate("blank")'>
            blank
          </q-btn>
        </div>
      </div>
      <div>
        <input
          type='file'
          id='fileToLoad'
          accept='.scajgantts'
          @change='newFileSelected'
        />
      </div>
      <div v-if='fileParseState!="noFile"'>
        <hr />
        <q-btn
          rounded
          color="primary"
          style='
            background: none;
            border: none;
            margin: 0.3rem;
            display: flex;
            flex-direction: column;
            font-size: small;
            color: var(--jg-c-text-highlight);
          '
          @click='loadFromFile()'
          :disabled='fileParseState!="validForLoad"'
        >
          <img v-bind:src='jsonIcon' style='width: 2.5rem;' class='jsonIcon'/>
          &nbsp;
          <div v-if='fileParseState=="validForLoad"'>
            Load {{ selectedFileMetadata?.projectName }}
          </div>
        </q-btn>
        <div
          v-if='store.languages!==null && fileParseState=="validForLoad"'
          class='unsaved-changes-warning'
        >
          Unsaved changes will be lost!
        </div>
        <div v-if='fileParseState=="dataParseError"'>
            Unable to parse {{ selectedFileMetadata?.projectName }}
            <br />
            Error: '{{ fileParseError }}'
        </div>
        <div v-if='fileParseState=="metadataParseError"'>
          {{ fileParseError }}
        </div>
      </div>
    </div>
  </div>
  <br />
  <div class='container'>
      <div class="text-h3 text-weight-thin">Save</div>
    <div>
      <q-btn color="primary" rounded label="Download to disk" @click='saveToFile()' />
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

.overlay {
  position: absolute;
  display: flex;
  top:0;
  left:0;
  opacity: 0;
  transition: opacity 0.3s;
}

.selectedFileOverlay {
  user-select: none;
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

  transition: opacity 0.5s;
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

.jsonIcon {
  filter: var(--jg-c-text-filter);
}
</style>
../../stores/languages-store
