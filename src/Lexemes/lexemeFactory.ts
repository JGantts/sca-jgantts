import type { Syllables_Cluster, WordPhrase } from "@/commonTypes";

export function BuildLexeme(from: { word: Syllables_Cluster }): WordPhrase {
  return {
    id: crypto.randomUUID(),
    entryForm: from.word,
    entryTreeLimb: "",
    entryDate: 0,
  }
}