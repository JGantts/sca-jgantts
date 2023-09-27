import { defineStore } from 'pinia'
import { loadSaveFile } from './phones';
import type { SaveFile, WorkingFile } from './commonTypes';

export const useLangueageStore = defineStore('languages', {
  state: () => {
    let toReturn: { languages: WorkingFile|null}
    toReturn = { languages: null }
    return toReturn
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    loadSaveFile(saveFile: SaveFile) {
      if (saveFile)
        this.languages = loadSaveFile(saveFile)
      else
        this.languages = null
    },
  },
})