export type UUID_PhoneType = string
export type UUID_PhonemeType = string
export type UUID_FeatureCategory = string
export type UUID_Feature = string
export type UUID_FeatureEnumValue = string
export type UUID_FeatureStop = string

export type UUID_Phoneme = string

export type UUID_Language = string

export type UUID_WordPhrase = string
export type UUID_Rule = string
export type UUID_RuleGroup = string
export type UUID_TreeLimb = string

export type phoneFeature_Kind = string

export type phoneID = string

export type langDate = number

export type Description = string|null

export type IPA = string


export type FeatureEnumValue = {
  id: UUID_FeatureEnumValue
  desc: Description
}

export type FeatureCategory = {
  id: UUID_FeatureCategory
  types: FeatureEnumValue[]
  desc: Description
}

export type PhoneType = {
  id: UUID_PhoneType
  desc: Description
  articulation: "Consonant"|"Vowel"
  features: FeatureCategory[]
}

export type FeatureStop = {
  categoryId: UUID_FeatureCategory
  stopId: UUID_FeatureStop
}

export type Phoneme = {
  id: UUID_Phoneme
  typeID: UUID_PhoneType
  desc: Description
  syllabic: "Syllabic"|"Nonsyllabic"
  IPA: IPA
  featureStops: FeatureStop[]
}

export type Language = {
  id: UUID_Language
  desc: Description
  phonemesByCategory: { [id: string] : Phoneme[] }
  phonemesAll: Phoneme[]
}

export type LanguageData = {
  id: UUID_Language
  lang: Language
  phoneTypes: { [id: string] : PhoneType }
}

export type Phone = {
  type: UUID_PhoneType
  features: { [id: UUID_FeatureCategory] : UUID_FeatureStop; }
}

export type Syllable = {
	onset: Phone[]
  rhyme: {
    nucleus: Phone[]
    coda: Phone[]
  }
}

export type Syllables_Cluster = {
  kind: "syllables"
  syllables: Syllable[]
}|{
  kind: "phones"
  phones: Phone[]
}

export type WordPhrase = {
  id: UUID_WordPhrase
  entryForm: Syllables_Cluster
  entryTreeLimb: UUID_TreeLimb
  entryDate: langDate
}

export type Rule = {
  id: UUID_Rule
  desc: string
  
}

export type RuleGroup = {
  id: UUID_RuleGroup
  treeLimbs: {
    limb: UUID_TreeLimb
    dates: {
      start: langDate|null
      end: langDate|null
    }|null
  }[]

  rules: Rule[]
}

export type TreeLimb = {
  id: UUID_TreeLimb
  branch: {
    deathDate: langDate
    children: UUID_TreeLimb[]
  }
}

export type TabHash = "loadsave"|"overview"|"phonetypes"|"phones"|"familygraph"

export type WorkingFileData = {
  phoneTypes: { [id: UUID_PhoneType] : PhoneType; }
  languages: { [id: UUID_Language] : Language; }
  phonemes: { [id: UUID_Phoneme] : Phoneme; }
  words: WordPhrase[],
  rules: RuleGroup[],
  treeTrunks: UUID_TreeLimb[],
  treeLimbs: TreeLimb[],
}

export type WorkingFileMetaData = {
  projectName: string
}

export type WorkingFile = {
  metadata: WorkingFileMetaData
  data: WorkingFileData
}
