import type { 
  PhoneType,
  Phone,
  Language,
  Phoneme,
  LanguageData,
  UUID_PhoneType,
  UUID_Language,
  UUID_Phoneme,
  WorkingFile,
  WorkingFileMetaData,
  WorkingFileData,
  WordPhrase,
  RuleGroup,
  TreeLimb,
  UUID_TreeLimb,
} from "./commonTypes"

import {
  type SaveFile,
  type SF_Data,
  type SF_DataLatest,
  type SF_DataVersion,
  type SF_Data_v0_1_beta_2,
  type SF_Data_vLatest,
  type SF_Data_v0_1_beta_1,
  type SF_SaveFileLatest,
  type SF_PhoneType,
  type SF_Language,
  type SF_Lexeme,
  type SF_RuleGroup,
  type SF_Uuid,
  type SF_TreeLimb,
  type SF_TreeTrunk,
  validateSF_Data_v0_0_beta_2,
  type SF_Data_v0_1_beta_1__Feature,
  type SF_FeatureStop,
  type SF_Feature,
  type SF_Phoneme,
  type SF_Phone,
  type SF_Data_v0_1_beta_1__Phone,
  type SF_Syllable,
  type SF_Data_v0_1_beta_1__Syllable,
  type SF_LexemeForm
} from "./file/FileTypes";

function assemblePhonemes(data: SF_DataLatest) {
  let phonemes: { [id: UUID_Phoneme] : Phoneme; } = {}
  for (let language of data.languages) {
    for (let phoneme of language.phonemes) {
      phonemes[phoneme.id as string] = phoneme as unknown as Phoneme
    }
  }
  return phonemes
}

function assemblePhoneTypes(data: SF_DataLatest): { [id: UUID_PhoneType] : PhoneType; } {
  let phoneTypes: { [id: UUID_PhoneType] : PhoneType; } = {}
  for (let phoneType of data.phoneTypes) {
    phoneTypes[phoneType.id as string] = phoneType as unknown as PhoneType
  }
  return phoneTypes
}

function assembleLanguagues(data: SF_DataLatest) {
  let langs: { [id: UUID_Language] : Language; } = {}
  for (let lang of data.languages) {
    langs[lang.id as string] = lang as unknown as Language
  }
  return langs
}

function assembleLexemes(data: SF_DataLatest): WordPhrase[] {
  
}

function assembleRules(data: SF_DataLatest): RuleGroup[] {
  
}

function assembleTreeTrunks(data: SF_DataLatest): UUID_TreeLimb[] {
  
}

function assembleTreeLimbs(data: SF_DataLatest): TreeLimb[] {
  
}

export function loadSaveFile(saveFile: SaveFile): WorkingFile {
  console.log(saveFile)
  let projectName = saveFile.metadata?.projectName as string ?? "[Failed to read name]"
  let metadata: WorkingFileMetaData = {
    projectName,
  }
  let data: any = saveFile.data

  switch (saveFile.metadata?.version as SF_DataVersion) {
    case "SaveFileData_v0_1_beta_1":
      data = v0_0_beta_1_TO_v0_0_beta_2(data as SF_Data_v0_1_beta_1)
      //fallthrough

    case "SaveFileData_v0_1_beta_2":
      if (!validateSF_Data_v0_0_beta_2(data))
        throw JSON.stringify(validateSF_Data_v0_0_beta_2.errors)
      data = data
      //fallthrough

      break
    default:
      throw `Unrecognized file version: ${saveFile?.metadata?.version}\n${JSON.stringify(saveFile)}`
  }
  let workingData = saveFileLatest_TO_workingFile(data)


  return {
    metadata,
    data: workingData,
  }
}

export function getSaveFile(workingFile: WorkingFile): SF_SaveFileLatest {
  let version: SF_DataVersion = "SaveFileData_v0_1_beta_2"
  let projectName: string = workingFile.metadata.projectName
  let phoneTypes: SF_PhoneType[]  = []
  let languages: SF_Language[] = []
  let lexemes: SF_Lexeme[] = []
  let rules: SF_RuleGroup[] = []
  let treeTrunks: SF_TreeTrunk[] = []
  let treeLimbs: SF_TreeLimb[] = []
  let data: SF_DataLatest = {
    phoneTypes,
    languages,
    lexemes,
    rules,
    treeTrunks,
    treeLimbs,
  }

  let toSave: SF_SaveFileLatest = {
    metadata: {
      version,
      projectName,
    },
    data,
  }

  return toSave
}

function saveFileLatest_TO_workingFile(dataIn: SF_DataLatest): WorkingFileData {
  let dataOut: WorkingFileData = {
    phoneTypes: assemblePhoneTypes(dataIn),
    languages: assembleLanguagues(dataIn),
    phonemes: assemblePhonemes(dataIn),
    words: assembleLexemes(dataIn),
    rules: assembleRules(dataIn),
    treeTrunks: assembleTreeTrunks(dataIn),
    treeLimbs: assembleTreeLimbs(dataIn),
  }
  return dataOut
}

function v0_0_beta_1_TO_v0_0_beta_2(dataIn: SF_Data_v0_1_beta_1): SF_Data_v0_1_beta_2 {
  let phoneTypes: SF_PhoneType[] = []
  for (let phoneType of dataIn.phoneTypes) {
    let features: SF_Feature[] = []
    for (let feature of phoneType.features) {
      let values: {id: string, desc: string}[] = []
      for (let value of feature.type.values) {
        values.push({
          id: value.id,
          desc: value.desc,
        })
      }
      features.push({
        id: feature.id,
        values,
      })
    }
    phoneTypes.push({
      id: phoneType.id,
      desc: phoneType.desc ?? "",
      articulation: phoneType.type == "Vowel" ? "Vowel" : "Consonant",
      features,
    })
  }

  let languages: SF_Language[] = []
  for (let language of dataIn.languages) {
    let phonemes: SF_Phoneme[] = []
    for (let phoneme of language.grid) {
      let featureStops: { categoryId: string, stopId: string, }[] = []
      phonemes.push({
        id: phoneme.id,
        typeID: phoneme.typeID,
        desc: phoneme.desc,
        syllabic: phoneme.syllabic == "Syllabic" ? "Syllabic" : "Nonsyllabic",
        IPA: phoneme.IPA,
        featureStops,
      })
    }
    languages.push({
      id: language.id,
      phonemes,
    })
  }

  let lexemes: SF_Lexeme[] = []
  for (let lexeme of dataIn.lexicon.words) {
    let phonesToPhones = (syllableIn: SF_Data_v0_1_beta_1__Phone[]): SF_Phone[] => {

    }
    let syllableToSyllable = (syllableIn: SF_Data_v0_1_beta_1__Syllable): SF_Syllable => {
      let featureStops: SF_FeatureStop[] = []
      for (let stop in syllableIn.features) {
        featureStops.push({
          categoryId: syllableIn.features[stop],
          stopId: stop,
        })
      }
      return {
        phoneTypeId: syllableIn.type,
        featureStops
      }
    }

    let syllables: SF_Syllable[] = []
    for (let syllable of lexeme.entryForm.value.sounds) {
      syllables.push(syllableToSyllable(syllable))
    }
    let entryForm: SF_LexemeForm = {
      kind: "syllables",
      syllables: syllables,
    }
    lexemes.push({
      lexemeId: lexeme.id,
      entryForm,
    })
  }
  let dataOut: SF_Data_v0_1_beta_2 = {
    phoneTypes,
    languages,
    lexemes,
    rules: dataIn.lexicon.rules,
    treeTrunks: dataIn.lexicon.treeTrunks,
    treeLimbs: dataIn.lexicon.treeLimbs,
  }
  if (!validateSF_Data_v0_0_beta_2(dataOut)) {
    console.log(validateSF_Data_v0_0_beta_2.errors)
    throw JSON.stringify(validateSF_Data_v0_0_beta_2.errors)
  }
  return dataOut
}
