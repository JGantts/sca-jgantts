import { defineStore } from 'pinia'
import type { TabHash, WorkingFile } from '../common/commonTypes'
import type { Command } from '../common/commandTypes'

const undoStack: Command[] = []
const redoStack: Command[] = []

export const useLangueageStore = defineStore('languages', {
  state: () => {
    const toReturn: {
      languages: WorkingFile|null
      currentTab: TabHash
    } = {
      languages: null,
      currentTab: 'loadsave',
    }
    return toReturn
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    loadSaveFile (saveFile: WorkingFile) {
      if (saveFile) {
        this.languages = saveFile
      } else {
        this.languages = null
      }
    },
    excuteUndo () {
      const command = undoStack.pop()
      if (!command) { return }
      command.undo()
      redoStack.push(command)
    },
    excuteRedo () {
      const command = redoStack.pop()
      if (!command) { return }
      command.do()
      undoStack.push(command)
    },
    executeDo (newCommand: Command) {
      newCommand.do()
      undoStack.push(newCommand)
    },
  },
})
