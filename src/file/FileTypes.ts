import type { Language, PhoneType, Phoneme, RuleGroup, TreeLimb, UUID_Language, UUID_PhoneType, UUID_Phoneme, UUID_TreeLimb, WordPhrase } from "@/commonTypes"



export type SaveFileDataLatest = SaveFileData_v0_1_beta_2
export type SaveFileData_vLatest = "SaveFileData_v0_1_beta_2"
export type SaveFileDataVersion = 
"SaveFileData_v0_1_beta_1"
| SaveFileData_vLatest 

export type SaveFileData = 
  SaveFileData_v0_1_beta_1 
  |SaveFileData_v0_1_beta_2

export type SaveFileMetaData = {
  version: SaveFileDataVersion
  projectName: string
}

export type WorkingFileMetaData = {
  projectName: string
}

export type SaveFileData_v0_1_beta_1 = {
  phoneTypes: PhoneType[]
  languages: Language[]
  lexicon: {
    words: WordPhrase[],
    rules: RuleGroup[],
    treeTrunks: UUID_TreeLimb[],
    treeLimbs: TreeLimb[],
  }
}

export type SaveFileData_v0_1_beta_2 = {
  phoneTypes: PhoneType[]
  languages: Language[]
  lexicon: {
    words: WordPhrase[],
    rules: RuleGroup[],
    treeTrunks: UUID_TreeLimb[],
    treeLimbs: TreeLimb[],
  }
}

export type WorkingFileData = {
  phoneTypes: { [id: UUID_PhoneType] : PhoneType; }
  languages: { [id: UUID_Language] : Language; }
  phonemes: { [id: UUID_Phoneme] : Phoneme; }
  lexicon: {
    words: WordPhrase[],
    rules: RuleGroup[],
    treeTrunks: UUID_TreeLimb[],
    treeLimbs: TreeLimb[],
  }
}

export type WorkingFile = {
  metadata: WorkingFileMetaData
  data: WorkingFileData
}

export type SaveFile = {
  metadata: SaveFileMetaData
  data: SaveFileData
}

