import { defineStore } from 'pinia'
import type { SaveFile, } from './file/FileTypes';
import type { TabHash, WorkingFile } from './commonTypes';

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
    loadSaveFile(saveFile: WorkingFile) {
      if (saveFile)
        this.languages = saveFile
      else
        this.languages = null
    },
  },
})