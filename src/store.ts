import { defineStore } from 'pinia'
import { loadSaveFile } from './phones';
import type { SaveFile, WorkingFile } from './file/FileTypes';
import type { TabHash } from './commonTypes';

export const useLangueageStore = defineStore('languages', {
  state: () => {
    let toReturn: { 
      languages: WorkingFile|null
      currentTab: TabHash
    }
    toReturn = {
      languages: null,
      currentTab: "loadsave",
    }
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