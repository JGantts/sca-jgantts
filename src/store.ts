import { defineStore } from 'pinia'
import { loadSaveFile } from './phones';
import type { SaveFile } from './commonTypes';

export const useLangueageStore = defineStore('languages', {
  state: () => {
    return { 
      languages: {}
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    loadSaveFile(saveFile: SaveFile) {
      this.languages = loadSaveFile(saveFile)
    },
  },
})