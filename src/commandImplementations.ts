import type { WordPhrase } from "./commonTypes"
import { useLangueageStore } from "./store"



export function AddLexeme(lexeme: WordPhrase) {
  const store = useLangueageStore()
  if (!store.languages) return
  store.languages.data.words.push(lexeme)
}

export function RemoveLexeme(lexeme: WordPhrase) {
  console.log("blarg")
  const store = useLangueageStore()
  if (!store.languages) return
  let word = store.languages.data.words.filter(x => x.id==lexeme.id)[0]
  let index = store.languages.data.words.indexOf(word)
  store.languages.data.words.splice(index, 1)
}
