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
  Syllables_Cluster,
  Syllable,
  UUID_FeatureCategory,
  UUID_FeatureStop,
  FeatureCategory,
  FeatureEnumValue,
  FeatureStop,
} from "./commonTypes"

import {
  type SaveFile,
  type SF_Data,
  type SF_DataLatest,
  type SF_DataVersion,
  type SF_Data_v0_1_beta_2,
  type SF_Data_vLatest,
  type SF_Data_v0_1_beta_1,
  type SF_PhoneType,
  type SF_Language,
  type SF_Lexeme,
  type SF_RuleGroup,
  type SF_Uuid,
  type SF_TreeLimb,
  type SF_TreeTrunk,
  type SF_Data_v0_1_beta_1__Feature,
  type SF_FeatureStop,
  type SF_Feature,
  type SF_Phoneme,
  type SF_Phone,
  type SF_Data_v0_1_beta_1__Phone,
  type SF_Syllable,
  type SF_Data_v0_1_beta_1__Syllable,
  type SF_LexemeForm,
  type SF_LimbDate,
  validateSF_Data_v0_1_beta_2,
  type SF_FeatureValue,
  serializeSF_Data_v0_1_beta_2,
  type SaveFile_Latest,
  schemaValidate_SaveFile_Latest,
  serialzierSF_latest
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
    let features: FeatureCategory[] = []
    for (let feature of phoneType.features) {
      let types: FeatureEnumValue[] = []
      for (let enumValue of feature.values) {
        types.push(enumValue)
      }
      features.push({
        id: feature.id,
        types,
        desc: "",
      })
    }
    phoneTypes[phoneType.id] = {
      id: phoneType.id,
      desc: phoneType.desc ?? "", 
      articulation: phoneType.articulation,
      features,
    }
  }
  return phoneTypes
}

function assembleLanguagues(data: SF_DataLatest) {
  let langs: { [id: UUID_Language] : Language; } = {}
  for (let lang of data.languages) {
    let phonemesByCategory: { [id: string] : Phoneme[] } = {}
    let phonemesAll: Phoneme[] = []
    for (let phoneme of lang.phonemes) {
      if (!phonemesByCategory[phoneme.typeID]) phonemesByCategory[phoneme.typeID] = []
      let featureStops: FeatureStop[] = []
      for (let stop of phoneme.featureStops) {
        featureStops.push({
          categoryId: stop.categoryId,
          stopId: stop.stopId,
        })
      }
      let phonemeOut = {
        id: phoneme.id,
        typeID: phoneme.typeID,
        desc: phoneme.desc,
        syllabic: phoneme.syllabic,
        IPA: phoneme.IPA,
        featureStops,
      }
      phonemesByCategory[phoneme.typeID].push(phonemeOut)
      phonemesAll.push(phonemeOut)
    }
    langs[lang.id as string] = {
      id: lang.id,
      desc: "",
      phonemesByCategory,
      phonemesAll,
    }
  }
  return langs
}

function assembleLexemes(data: SF_DataLatest): WordPhrase[] {
  let assemblePhones = (phones: SF_Phone[]): Phone[] => {
    let toReturn: Phone[] = []
    for (let phone of phones) {
      let features: { [id: UUID_FeatureCategory] : UUID_FeatureStop; } = {}
      for (let featureCat of phone.featureStops) {
        features[featureCat.categoryID] = phone.featureStops.filter(x => x.categoryID == featureCat.categoryID)[0]?.stopId;
      }
      toReturn.push({
        type: phone.phoneTypeId,
        features,
      })
    }
    return toReturn
  }

  let toReturn: WordPhrase[] = []
  for (let wordphrase of data.lexemes) {
    let entryForm: Syllables_Cluster
    if (wordphrase.entryForm.kind == "syllables") {
      let syllables: Syllable[] = []
      for (let syllable of wordphrase.entryForm.syllables) {
        syllables.push({
          onset: assemblePhones(syllable.onset),
          rhyme: {
            nucleus: assemblePhones(syllable.rhyme.nucleus),
            coda: assemblePhones(syllable.rhyme.coda),
          }
        })
      }
      entryForm = {
        kind: "syllables",
        syllables,
      }
    } else {
      let phones: Phone[] = []
      entryForm = {
        kind: "phones",
        phones: assemblePhones(wordphrase.entryForm.phones),
      }
    }
    toReturn.push({
      id: wordphrase.lexemeId,
      entryForm,
      entryDate: 0,
      entryTreeLimb: data.treeLimbs[0]?.id ?? "",
    })
  }
  return toReturn
}

function assembleRules(data: SF_DataLatest): RuleGroup[] {
  let toReturn: RuleGroup[] = []
  
  return toReturn
}

function assembleTreeTrunks(data: SF_DataLatest): UUID_TreeLimb[] {
  let toReturn: UUID_TreeLimb[] = []
  
  return toReturn
}

function assembleTreeLimbs(data: SF_DataLatest): TreeLimb[] {
  let toReturn: TreeLimb[] = []
  
  return toReturn
}

export function loadSaveFile(saveFile: SaveFile): WorkingFile {
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
      if (!validateSF_Data_v0_1_beta_2(data))
        throw JSON.stringify(validateSF_Data_v0_1_beta_2.errors)
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

function getPhoneFromPhone(phoneIn: Phone): SF_Phone {
  let featureStops: SF_FeatureStop[] = []
  for (let stop in phoneIn.features) {
    featureStops.push({
      categoryID: stop,
      stopId: phoneIn.features[stop]
    })
  }
  return {
    phoneTypeId: phoneIn.type,
    featureStops,
  }
}

function getSyllableFromSyllable(syllableIn: Syllable): SF_Syllable {
  return {
    onset: (syllableIn.onset.map(getPhoneFromPhone)),
    rhyme: {
      nucleus: (syllableIn.rhyme.nucleus.map(getPhoneFromPhone)),
      coda: (syllableIn.rhyme.coda.map(getPhoneFromPhone)),
    }
  }
}

export function getSaveFile(workingFile: WorkingFile): string {
  let version: SF_DataVersion = "SaveFileData_v0_1_beta_2"
  let projectName: string = workingFile.metadata.projectName
  let phoneTypes: SF_PhoneType[] = []
  for (let phoneTypeIn of Object.values(workingFile.data.phoneTypes)) {
    let features: SF_Feature[] = []
    for (let featureIn of phoneTypeIn.features) {
      let values: SF_FeatureValue[] = []
      for (let valueIn of featureIn.types) {
        values.push({
          id: valueIn.id,
          desc: valueIn.desc,
        })
      }
      features.push({
        id: featureIn.id,
        values,
      })
    }
    phoneTypes.push({
      id: phoneTypeIn.id,
      desc: phoneTypeIn.desc ?? "",
      articulation: phoneTypeIn.articulation,
      features,
    })
  }
  let languages: SF_Language[] = []
  for (let langIn of Object.values(workingFile.data.languages)) {
    languages.push({
      id: langIn.id,
      phonemes: langIn.phonemesAll
    })
  }
  let lexemes: SF_Lexeme[] = []
  for (let lexemeIn of workingFile.data.words) {
    switch (lexemeIn.entryForm.kind) {
      case "syllables": 
        lexemes.push({
          lexemeId: lexemeIn.id,
          entryForm: {
            kind: lexemeIn.entryForm.kind,
            syllables: lexemeIn.entryForm.syllables.map(getSyllableFromSyllable),
          },
        })
        break
      case "phones":
        lexemes.push({
          lexemeId: lexemeIn.id,
          entryForm: {
            kind: lexemeIn.entryForm.kind,
            phones: lexemeIn.entryForm.phones.map(getPhoneFromPhone),
          },
        })
        break
    }
  }
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

  let toSave: SaveFile_Latest = {
    metadata: {
      version,
      projectName,
    },
    data,
  }
  return serialzierSF_latest(toSave)
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
          desc: value.desc ?? "",
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
      for (let stop of phoneme.featureStops) {
        featureStops.push({
          categoryId: stop.categoryID,
          stopId: stop.id,
        })
      }
      phonemes.push({
        id: phoneme.id,
        typeID: phoneme.typeID,
        desc: phoneme.desc ?? "",
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
    let phonesToPhones = (phonesIn: SF_Data_v0_1_beta_1__Phone[]): SF_Phone[] => {
      let toReturn: SF_Phone[] = []
      for (let phone of phonesIn) {
        let featureStops: SF_FeatureStop[] = []
        for (let stop in phone.features) {
          featureStops.push({
            categoryID: stop,
            stopId: phone.features[stop]
          })
        }
        toReturn.push({
          phoneTypeId: phone.type,
          featureStops,
        })
      }
      return toReturn
    }
    let syllableToSyllable = (syllableIn: SF_Data_v0_1_beta_1__Syllable): SF_Syllable => {
      return {
        onset: phonesToPhones(syllableIn.onset),
        rhyme: {
          nucleus: phonesToPhones(syllableIn.rhyme.nucleus),
          coda: phonesToPhones(syllableIn.rhyme.coda),
        },
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
  let rules: SF_RuleGroup[] = []
  let treeTrunks: SF_LimbDate[] = []
  for (let treeTrunk of dataIn.lexicon.treeTrunks){
    treeTrunks.push({limb: treeTrunk, date: 0})
  }
  let treeLimbs: SF_TreeLimb[] = []
  for (let limb of dataIn.lexicon.treeLimbs) {
    let children = limb.branch.children
    treeLimbs.push({
      id: limb.id,
      branch: {
        diversionDate: limb.branch.deathDate,
        children
      }
    })
  }
  let dataOut: SF_Data_v0_1_beta_2 = {
    phoneTypes,
    languages,
    lexemes,
    rules,
    treeTrunks,
    treeLimbs,
  }
  if (!validateSF_Data_v0_1_beta_2(dataOut)) {
    console.log(dataOut)
    console.log(validateSF_Data_v0_1_beta_2.errors)
    throw JSON.stringify(validateSF_Data_v0_1_beta_2.errors)
  }
  return dataOut
}
