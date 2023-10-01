import type { Language, PhoneType, Phoneme, RuleGroup, TreeLimb, UUID_Language, UUID_PhoneType, UUID_Phoneme, UUID_TreeLimb, WordPhrase } from "@/commonTypes"
import type { JSONSchemaType } from "ajv";

import Ajv, {type JTDDataType} from "ajv/dist/jtd"

const ajv = new Ajv()

export type SaveFileDataLatest = SaveFileData_v0_1_beta_2
export type SaveFileData_vLatest = "SaveFileData_v0_1_beta_2"
export type SaveFileDataVersion = 
"SaveFileData_v0_1_beta_1"
| SaveFileData_vLatest 

export type SaveFileData = 
  SaveFileData_v0_1_beta_2

export type SaveFileMetaData = {
  version: SaveFileDataVersion
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

const schema_Uuid = {
  type: "string"
}

const schema_Description = {
  type: "string"
}

const schema_LangDate = {
  type: "number"
}

const schema_FeatureValue = {
  properties: {
    "id": schema_Uuid,
    "desc": schema_Description,
  }
}

const schema_Feature = {
  properties: {
    "id": schema_Uuid,
    "values": {
      elements: schema_FeatureValue
    }
  }
}

export const schema_Phone = {
  properties: {
    "phoneTypeId": schema_Uuid,
    "features": {
      elements: {
        properties: {
          "featureCategoryId": schema_Uuid,
          "valueId": schema_Uuid,
        }
      }
    }
  }
}

const schema_Syllable = {
  properties: {
    "onset": {
      elements: schema_Phone
    },
    "rhyme": {
      properties: {
        "nucleus": {
          elements: schema_Phone
        },
        "coda": {
          elements: schema_Phone
        },
      }
    },
  }
}

const scheme_LexemeForm = {
  discriminator: "kind",
  mapping: {
    syllables: {
      elements: schema_Syllable
    },
    phonemes: {
      elements: schema_Phone
    },
  }
}

export const schema_Lexeme = {
  properties: {
    lexemeId: schema_Uuid,
    entryForm: scheme_LexemeForm,
  }
}


export const schema_PhoneType = {
  properties: {
    id: schema_Uuid,
    desc: schema_Description,
    articulation: { enum: ["Consonant","Vowel"] },
    features: { elementnts: schema_Feature },
  }
}

export const schema_Language = {
  properties: {
    "id": schema_Uuid,
    "lexemes": {
      elements: schema_Lexeme
    },
    
  }
}

export const schema_LimbDate = {
  properties: {
    limb: schema_Uuid,
    date: schema_LangDate,
  }
}

export const schema_RuleGroup = {
  properties: {
    id: schema_Uuid,
    startLimb: schema_LimbDate,
    treeLimbs: {
      elements: schema_LimbDate
    },
  }
}

export const schema_TreeLimb = {
  properties: {
    id: schema_Uuid,
    branch: {
      properties: {
        deathDate: schema_LangDate,
        children: schema_Uuid,
      }
    }
  }
}

export const schema_v0_1_beta_2 = {
  properties: {
    "phoneTypes": {elements: schema_PhoneType},
    "languages": {elements: schema_Language},
    "lexicon": {
      properties: {
        lexemes: schema_Lexeme,
        rules: {
          elements: schema_RuleGroup
        },
        treeTrunks: {
          elements: schema_LimbDate
        },
        treeLimbs: {
          elements: schema_TreeLimb
        },
      }
    },
  }
}

export type SaveFileData_v0_1_beta_2 = JTDDataType<typeof schema_v0_1_beta_2>


const schema_SaveFileVersion = {
  enum: [
    "SaveFileData_v0_1_beta_1",
    "SaveFileData_v0_1_beta_2",
  ]
}

const schema_Metadata = {
  properties: {
    version: schema_SaveFileVersion,
    projectName: {type: "string" },
  }
}
export type Metadata = JTDDataType<typeof schema_Metadata>

const schema_SaveFile = {
  properties: {
    "metadata": schema_Metadata,
    "data": {
      properties: { },
      additionalProperties: true
    }
  }
}
export const schemaValidate_SaveFile = ajv.compile(schema_SaveFile)
export type SaveFile = JTDDataType<typeof schema_SaveFile>