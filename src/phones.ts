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

export function loadSaveFile(saveFile: SaveFile): WorkingFile {
  let toReturn = {
    phoneTypes: assemblePhoneTypes(saveFile),
    languages: assembleLanguagues(saveFile),
    phonemes: assemblePhonemes(saveFile),
    lexicon: saveFile.lexicon,
  }
  return toReturn
}


