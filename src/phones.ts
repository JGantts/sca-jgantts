import type { 
  PhoneType,
  Phone,
  Language,
  Phoneme,
  LanguageData,
  SaveFile,
  WorkingFile,
  UUID_PhoneType,
  UUID_Language,
  UUID_Phoneme,
} from "./commonTypes"

import { reactive } from 'vue'

function assemblePhonemes(saveFile: SaveFile) {
  let phonemes: { [id: UUID_Phoneme] : Phoneme; } = {}
  for (let language of saveFile.languages) {
    for (let phoneme of language.grid) {
      phonemes[phoneme.id] = phoneme
    }
  }
  return phonemes
}

function assemblePhoneTypes(saveFile: SaveFile) {
  let phoneTypes: { [id: UUID_PhoneType] : PhoneType; } = {}
  for (let phoneType of saveFile.phoneTypes) {
    phoneTypes[phoneType.id] = phoneType
  }
  return phoneTypes
}

function assembleLanguagues(saveFile: SaveFile) {
  let langs: { [id: UUID_Language] : Language; } = {}
  for (let lang of saveFile.languages) {
    langs[lang.id] = lang
  }
  return langs
}

function loadSaveFile(saveFile: SaveFile) {
  languages.phoneTypes = assemblePhoneTypes(saveFile)
  languages.languages = assembleLanguagues(saveFile)
  languages.phonemes = assemblePhonemes(saveFile)
  languages.lexicon = saveFile.lexicon
}

let languages: WorkingFile = {
  phoneTypes: {},
  languages: {},
  phonemes: {},
  lexicon: {
    words: [],
    rules: [],
    treeTrunks: [],
    treeLimbs: [],
  }
}

export const langs = reactive({
  languages,
  loadSaveFile,
})
