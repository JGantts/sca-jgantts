import { defineStore } from 'pinia'

export const useUserSanityStore = defineStore('userSanity', {
  state: () => {
    const toReturn: {
      dashboard: {
        newWord: string
      }
    } = {
      dashboard: {
        newWord: '',
      },
    }
    return toReturn
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
  },
})
