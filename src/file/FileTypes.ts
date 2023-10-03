import type { JSONSchemaType } from "ajv";
import Ajv, {type JTDDataType} from "ajv/dist/jtd"
import type { Simplify } from "type-fest"

const ajv = new Ajv()

//#region SaveFileData_v0_1_beta_1
export type SF_Data_v0_1_beta_1__Phone = {
  type: string
  features: { [id: string] : string; }
}
export type SF_Data_v0_1_beta_1__Feature = {
  id: string
  desc: string
  type: {
    values: {
      id: string
      desc: string
    }[]
  }
}
export type SF_Data_v0_1_beta_1__Syllable = {
  onset: SF_Data_v0_1_beta_1__Phone[],
  rhyme: {
    nucleus: SF_Data_v0_1_beta_1__Phone[],
    coda: SF_Data_v0_1_beta_1__Phone[],
  },
}

export type SF_Data_v0_1_beta_1 = {
  phoneTypes: {
    id: string
    desc: string
    type: string
    features: SF_Data_v0_1_beta_1__Feature[]
  }[]
  languages: {
    id: string
    desc: string
    grid: {
      typeID: string
      id: string
      IPA: string
      desc: string
      syllabic: string
      featureStops: {
        kind: string
        categoryID: string
        id: string
      }[]
    }[]
  }[]
  lexicon: {
    words: {
      id: string
      entryForm: {
        value: {
          kind: string
          sounds: SF_Data_v0_1_beta_1__Syllable[]
        }
      }
      entryTreeLimb: string
      entryDate: number
    }[],
    rules: {
      id: string
      treeLimbs: {}[]
      rules: {}[]
    }[],
    treeTrunks: {}[],
    treeLimbs: {
      id: string,
      deathDate: number
      children: string[]
    }[],
  }
}
//#endregion


//#region Primatives
const schema_Uuid = {
  type: "string" as const
}
export type SF_Uuid = JTDDataType<typeof schema_Uuid>

const schema_Description = {
  type: "string" as const
}

const schema_LangDate = {
  type: "int32" as const
}

const schema_Ipa = {
  type: "string" as const
}

const schema_LimbDate = {
  properties: {
    limb: schema_Uuid,
    date: schema_LangDate,
  }
}
type SF_LimbDate = JTDDataType<typeof schema_LimbDate>
//#endregion

//#region Phones
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
export type SF_Feature = JTDDataType<typeof schema_Feature>

const schema_PhoneType = {
  properties: {
    id: schema_Uuid,
    desc: schema_Description,
    articulation: { enum: ["Consonant","Vowel"] as const },
    features: { elements: schema_Feature },
  }
}
export type SF_PhoneType = JTDDataType<typeof schema_PhoneType>

const schema_FeatureStop = {
  properties: {
    "categoryId": schema_Uuid,
    "stopId": schema_Uuid,
  }
}
export type SF_FeatureStop = JTDDataType<typeof schema_FeatureStop>

const schema_Phone = {
  properties: {
    "phoneTypeId": schema_Uuid,
    "featureStops": {
      elements: schema_FeatureStop
    }
  }
}
export type SF_Phone = JTDDataType<typeof schema_Phone>
//#endregion

//#region PhoneCollections
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
export type SF_Syllable = JTDDataType<typeof schema_Syllable>

const scheme_LexemeForm = {
  discriminator: "kind",
  mapping: {
    syllables: {
      properties: {
        syllables: { elements: schema_Syllable }
      }
    },
    phonemes: {
      properties: {
        phonemes: { elements: schema_Phone }
      }
    },
  }
}
export type SF_LexemeForm = Simplify<JTDDataType<typeof scheme_LexemeForm>>

const schema_Lexeme = {
  properties: {
    lexemeId: schema_Uuid,
    entryForm: scheme_LexemeForm,
  }
}
export type SF_Lexeme = JTDDataType<typeof schema_Lexeme>
//#endregion

//#region Phonemes
const schema_Phoneme = {
  properties: {
    id: schema_Uuid,
    typeID: schema_Uuid,
    desc: schema_Description,
    syllabic: { enum: ["Syllabic","Nonsyllabic"] as const },
    IPA: schema_Ipa,
    featureStops: {
      elements: {
        properties: {
          categoryId: schema_Uuid,
          stopId: schema_Uuid,
        }
      }
    },
  }
}
export type SF_Phoneme = JTDDataType<typeof schema_Phoneme>
//#endregion

//#region Languages
const schema_Language = {
  properties: {
    "id": schema_Uuid,
    phonemes: {
      elements: schema_Phoneme
    },
  }
}
export type SF_Language = JTDDataType<typeof schema_Language>
//#endregion

//#region Rules
const schema_RuleGroup = {
  properties: {
    id: schema_Uuid,
    startLimb: schema_LimbDate,
    treeLimbs: {
      elements: schema_LimbDate
    },
  }
}
export type SF_RuleGroup = JTDDataType<typeof schema_RuleGroup>
//#endregion

//#region TreeLimb
const schema_TreeTrunk = {
  properties: {
    limb: schema_Uuid,
    date: schema_LangDate,
  }
}
export type SF_TreeTrunk = JTDDataType<typeof schema_TreeTrunk>

const schema_TreeLimb = {
  properties: {
    id: schema_Uuid,
    branch: {
      properties: {
        diversionDate: schema_LangDate,
        children: schema_Uuid,
      }
    }
  }
}
export type SF_TreeLimb = JTDDataType<typeof schema_TreeLimb>
//#endregion

//#region SaveFileData_v0_1_beta_2
const schema_SaveFileData_v0_1_beta_2 = {
  properties: {
    phoneTypes: {elements: schema_PhoneType},
    languages: {elements: schema_Language},
    lexemes: {elements: schema_Lexeme},
    rules: {elements: schema_RuleGroup},
    treeTrunks: {elements: schema_LimbDate},
    treeLimbs: {elements: schema_TreeLimb},
  }
}
export type SF_Data_v0_1_beta_2 = JTDDataType<typeof schema_SaveFileData_v0_1_beta_2>
export const validateSF_Data_v0_0_beta_2 = ajv.compile(schema_SaveFileData_v0_1_beta_2)
//#endregion


//#region Metadata
const schema_SaveFileVersion = {
  enum: [
    "SaveFileData_v0_1_beta_1",
    "SaveFileData_v0_1_beta_2",
  ] as const
}
export const validateDumb = ajv.compile(schema_SaveFileVersion)
export type SF_Version = JTDDataType<typeof schema_SaveFileVersion>

const schema_Metadata = {
  properties: {
    version: schema_SaveFileVersion,
    projectName: {type: "string" },
  },
  additionalProperties: true
}
export type Metadata = JTDDataType<typeof schema_Metadata>
//#endregion

//#region SaveFile types
const schema_SaveFile = {
  properties: {
    "metadata": schema_Metadata,
    "data": {
      properties: { },
      additionalProperties: true
    }
  }
}
export type SaveFile = JTDDataType<typeof schema_SaveFile>
export const schemaValidate_SaveFile = ajv.compile<SaveFile>(schema_SaveFile)


const schema_SaveFileLatest = {
  properties: {
    "metadata": schema_Metadata,
    "data": schema_SaveFileData_v0_1_beta_2
  }
}
export type SF_SaveFileLatest = JTDDataType<typeof schema_SaveFileLatest>


export type SF_DataLatest = SF_Data_v0_1_beta_2
export type SF_Data_vLatest = "SaveFileData_v0_1_beta_2"
export type SF_DataVersion = JTDDataType<typeof schema_SaveFileVersion>

export type SF_Data = 
SF_Data_v0_1_beta_2

export type SF_Metadata = {
  version: SF_DataVersion
  projectName: string
}
//#endregion
