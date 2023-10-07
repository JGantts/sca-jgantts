import { defineStore } from 'pinia'
import type { TabHash, WorkingFile } from './commonTypes';
import type { Command } from './commandTypes';

let undoStack: Command[] = []
let redoStack: Command[] = []

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
    excuteUndo() {
      let command = undoStack.pop()
      if (!command) return
      command.undo()
      redoStack.push(command)
    },
    excuteRedo() {
      let command = redoStack.pop()
      if (!command) return
      command.do()
      undoStack.push(command)
    },
    executeDo(newCommand: Command) {
      newCommand.do()
      undoStack.push(newCommand)
    },
  },
})