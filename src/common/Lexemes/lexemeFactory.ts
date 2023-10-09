import type { PhoneString, WordPhrase } from '../commonTypes'

export function BuildLexeme (from: { word: PhoneString }): WordPhrase {
  return {
    id: crypto.randomUUID(),
    entryForm: from.word,
    entryTreeLimb: '',
    entryDate: 0,
  }
}
