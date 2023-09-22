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
}

export type FeatureEnum = {
  values: FeatureEnumValue[]
}

export type FeatureCategory = {
  id: UUID_FeatureCategory
  type: "number"|FeatureEnum
  desc: Description
}

export type PhoneType = {
  id: UUID_PhoneType
  desc: Description
  features: FeatureCategory[]
}

export type FeatureStop = {
  kind: "FeatureStop"
  categoryID: UUID_FeatureCategory
  id: UUID_FeatureStop
}

export type FeatureRange = {
  kind: "FeatureRange"
  categoryID: UUID_FeatureCategory
  low: number
  high: number
}

export type Phoneme = {
  id: UUID_Phoneme
  typeID: UUID_PhoneType
  desc: Description
  IPA: IPA
  featureStops: (FeatureStop|FeatureRange)[]
}

export type Language = {
  id: UUID_Language
  desc: Description
  grid: Phoneme[]
}


export type Phone = {
  type: UUID_PhoneType
  features: { [id: UUID_FeatureCategory] : UUID_FeatureStop|number; }
}

export type Syllable = {
	onset: Phone[]
  rhyme: {
    nucleus: Phone
    coda: Phone[]
  }
}

export type Syllables = {
  kind: "Syllables"
  sounds: Syllable[]
}

export type Cluster = {
  kind: "Cluster"
  sounds: Phone[]
}

export type Syllables_Cluster {
  value: Syllables|Cluster
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