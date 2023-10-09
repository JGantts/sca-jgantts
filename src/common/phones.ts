import type {
  PhoneType,
  Phone,
  Language,
  Phoneme,
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
  PhoneString,
  Syllable,
  UUID_FeatureCategory,
  UUID_FeatureStop,
  FeatureCategory,
  FeatureEnumValue,
  FeatureStop,
} from './commonTypes'

import {
  type SaveFile,
  type SF_DataLatest,
  type SF_DataVersion,
  type SF_Data_v0_1_beta_2,
  type SF_Data_v0_1_beta_1,
  type SF_PhoneType,
  type SF_Language,
  type SF_Lexeme,
  type SF_RuleGroup,
  type SF_TreeLimb,
  type SF_TreeTrunk,
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
  SaveFileLatest,
  serialzierSFL,
} from './files/FileTypes'

function assemblePhonemes (data: SF_DataLatest) {
  const phonemes: { [id: UUID_Phoneme] : Phoneme; } = {}
  for (const language of data.languages) {
    for (const phoneme of language.phonemes) {
      phonemes[phoneme.id as string] = phoneme as unknown as Phoneme
    }
  }
  return phonemes
}

function assemblePhoneTypes (data: SF_DataLatest): { [id: UUID_PhoneType] : PhoneType; } {
  const phoneTypes: { [id: UUID_PhoneType] : PhoneType; } = {}
  for (const phoneType of data.phoneTypes) {
    const features: FeatureCategory[] = []
    for (const feature of phoneType.features) {
      const types: FeatureEnumValue[] = []
      for (const enumValue of feature.values) {
        types.push(enumValue)
      }
      features.push({
        id: feature.id,
        types,
        desc: '',
      })
    }
    phoneTypes[phoneType.id] = {
      id: phoneType.id,
      desc: phoneType.desc ?? '',
      articulation: phoneType.articulation,
      features,
    }
  }
  return phoneTypes
}

function assembleLanguagues (data: SF_DataLatest) {
  const langs: { [id: UUID_Language] : Language; } = {}
  for (const lang of data.languages) {
    const phonemesByCategory: { [id: string] : Phoneme[] } = {}
    const phonemesAll: Phoneme[] = []
    for (const phoneme of lang.phonemes) {
      if (!phonemesByCategory[phoneme.typeID]) phonemesByCategory[phoneme.typeID] = []
      const featureStops: FeatureStop[] = []
      for (const stop of phoneme.featureStops) {
        featureStops.push({
          categoryId: stop.categoryId,
          stopId: stop.stopId,
        })
      }
      const phonemeOut = {
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
      desc: '',
      phonemesByCategory,
      phonemesAll,
    }
  }
  return langs
}

function assembleLexemes (data: SF_DataLatest): WordPhrase[] {
  const assemblePhones = (phones: SF_Phone[]): Phone[] => {
    const toReturn: Phone[] = []
    for (const phone of phones) {
      const features: { [id: UUID_FeatureCategory] : UUID_FeatureStop; } = {}
      for (const featureCat of phone.featureStops) {
        features[featureCat.categoryID] = phone.featureStops.filter(x => x.categoryID === featureCat.categoryID)[0]?.stopId
      }
      toReturn.push({
        id: crypto.randomUUID(),
        type: phone.phoneTypeId,
        features,
      })
    }
    return toReturn
  }

  const toReturn: WordPhrase[] = []
  for (const wordphrase of data.lexemes) {
    let entryForm: PhoneString
    if (wordphrase.entryForm.kind === 'syllables') {
      const syllables: Syllable[] = []
      for (const syllable of wordphrase.entryForm.syllables) {
        syllables.push({
          id: crypto.randomUUID(),
          onset: assemblePhones(syllable.onset),
          rhyme: {
            nucleus: assemblePhones(syllable.rhyme.nucleus),
            coda: assemblePhones(syllable.rhyme.coda),
          },
        })
      }
      entryForm = {
        id: crypto.randomUUID(),
        kind: 'syllables',
        syllables,
      }
    } else {
      entryForm = {
        id: crypto.randomUUID(),
        kind: 'phones',
        phones: assemblePhones(wordphrase.entryForm.phones),
      }
    }
    toReturn.push({
      id: wordphrase.lexemeId,
      entryForm,
      entryDate: 0,
      entryTreeLimb: data.treeLimbs[0]?.id ?? '',
    })
  }
  return toReturn
}

function assembleRules (data: SF_DataLatest): RuleGroup[] {
  const toReturn: RuleGroup[] = []

  return toReturn
}

function assembleTreeTrunks (data: SF_DataLatest): UUID_TreeLimb[] {
  const toReturn: UUID_TreeLimb[] = []

  return toReturn
}

function assembleTreeLimbs (data: SF_DataLatest): TreeLimb[] {
  const toReturn: TreeLimb[] = []

  return toReturn
}

export function loadSaveFile (saveFile: SaveFile): WorkingFile {
  const projectName = saveFile.metadata?.projectName as string ?? '[Failed to read name]'
  const metadata: WorkingFileMetaData = {
    projectName,
  }
  let data: object = saveFile.data

  switch (saveFile.metadata?.version as SF_DataVersion) {
    case 'SaveFileData_v0_1_beta_1':
      data = v0_0_beta_1_TO_v0_0_beta_2(data as SF_Data_v0_1_beta_1)
      // fallthrough

    case 'SaveFileData_v0_1_beta_2':
      if (!validateSF_Data_v0_1_beta_2(data)) {
        throw new Error(JSON.stringify(validateSF_Data_v0_1_beta_2.errors))
      }
      // data = data
      // fallthrough

      break
    default:
      throw new Error(`Unrecognized file version: ${saveFile?.metadata?.version}\n${JSON.stringify(saveFile)}`)
  }
  const workingData = saveFileLatestTOworkingFile(data as SF_DataLatest)

  return {
    metadata,
    data: workingData,
  }
}

function getPhoneFromPhone (phoneIn: Phone): SF_Phone {
  const featureStops: SF_FeatureStop[] = []
  for (const stop in phoneIn.features) {
    featureStops.push({
      categoryID: stop,
      stopId: phoneIn.features[stop],
    })
  }
  return {
    phoneTypeId: phoneIn.type,
    featureStops,
  }
}

function getSyllableFromSyllable (syllableIn: Syllable): SF_Syllable {
  return {
    onset: (syllableIn.onset.map(getPhoneFromPhone)),
    rhyme: {
      nucleus: (syllableIn.rhyme.nucleus.map(getPhoneFromPhone)),
      coda: (syllableIn.rhyme.coda.map(getPhoneFromPhone)),
    },
  }
}

export function getSaveFile (workingFile: WorkingFile): string {
  const version: SF_DataVersion = 'SaveFileData_v0_1_beta_2'
  const projectName: string = workingFile.metadata.projectName
  const phoneTypes: SF_PhoneType[] = []
  for (const phoneTypeIn of Object.values(workingFile.data.phoneTypes)) {
    const features: SF_Feature[] = []
    for (const featureIn of phoneTypeIn.features) {
      const values: SF_FeatureValue[] = []
      for (const valueIn of featureIn.types) {
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
      desc: phoneTypeIn.desc ?? '',
      articulation: phoneTypeIn.articulation,
      features,
    })
  }
  const languages: SF_Language[] = []
  for (const langIn of Object.values(workingFile.data.languages)) {
    languages.push({
      id: langIn.id,
      phonemes: langIn.phonemesAll,
    })
  }
  const lexemes: SF_Lexeme[] = []
  for (const lexemeIn of workingFile.data.words) {
    switch (lexemeIn.entryForm.kind) {
      case 'syllables':
        lexemes.push({
          lexemeId: lexemeIn.id,
          entryForm: {
            kind: lexemeIn.entryForm.kind,
            syllables: lexemeIn.entryForm.syllables.map(getSyllableFromSyllable),
          },
        })
        break
      case 'phones':
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
  const rules: SF_RuleGroup[] = []
  const treeTrunks: SF_TreeTrunk[] = []
  const treeLimbs: SF_TreeLimb[] = []
  const data: SF_DataLatest = {
    phoneTypes,
    languages,
    lexemes,
    rules,
    treeTrunks,
    treeLimbs,
  }

  const toSave: SaveFileLatest = {
    metadata: {
      version,
      projectName,
    },
    data,
  }
  return serialzierSFL(toSave)
}

function saveFileLatestTOworkingFile (dataIn: SF_DataLatest): WorkingFileData {
  const dataOut: WorkingFileData = {
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

function v0_0_beta_1_TO_v0_0_beta_2 (dataIn: SF_Data_v0_1_beta_1): SF_Data_v0_1_beta_2 {
  const phoneTypes: SF_PhoneType[] = []
  for (const phoneType of dataIn.phoneTypes) {
    const features: SF_Feature[] = []
    for (const feature of phoneType.features) {
      const values: {id: string, desc: string}[] = []
      for (const value of feature.type.values) {
        values.push({
          id: value.id,
          desc: value.desc ?? '',
        })
      }
      features.push({
        id: feature.id,
        values,
      })
    }
    phoneTypes.push({
      id: phoneType.id,
      desc: phoneType.desc ?? '',
      articulation: phoneType.type === 'Vowel' ? 'Vowel' : 'Consonant',
      features,
    })
  }

  const languages: SF_Language[] = []
  for (const language of dataIn.languages) {
    const phonemes: SF_Phoneme[] = []
    for (const phoneme of language.grid) {
      const featureStops: { categoryId: string, stopId: string, }[] = []
      for (const stop of phoneme.featureStops) {
        featureStops.push({
          categoryId: stop.categoryID,
          stopId: stop.id,
        })
      }
      phonemes.push({
        id: phoneme.id,
        typeID: phoneme.typeID,
        desc: phoneme.desc ?? '',
        syllabic: phoneme.syllabic === 'Syllabic' ? 'Syllabic' : 'Nonsyllabic',
        IPA: phoneme.IPA,
        featureStops,
      })
    }
    languages.push({
      id: language.id,
      phonemes,
    })
  }

  const lexemes: SF_Lexeme[] = []
  for (const lexeme of dataIn.lexicon.words) {
    const phonesToPhones = (phonesIn: SF_Data_v0_1_beta_1__Phone[]): SF_Phone[] => {
      const toReturn: SF_Phone[] = []
      for (const phone of phonesIn) {
        const featureStops: SF_FeatureStop[] = []
        for (const stop in phone.features) {
          featureStops.push({
            categoryID: stop,
            stopId: phone.features[stop],
          })
        }
        toReturn.push({
          phoneTypeId: phone.type,
          featureStops,
        })
      }
      return toReturn
    }
    const syllableToSyllable = (syllableIn: SF_Data_v0_1_beta_1__Syllable): SF_Syllable => {
      return {
        onset: phonesToPhones(syllableIn.onset),
        rhyme: {
          nucleus: phonesToPhones(syllableIn.rhyme.nucleus),
          coda: phonesToPhones(syllableIn.rhyme.coda),
        },
      }
    }

    const syllables: SF_Syllable[] = []
    for (const syllable of lexeme.entryForm.value.sounds) {
      syllables.push(syllableToSyllable(syllable))
    }
    const entryForm: SF_LexemeForm = {
      kind: 'syllables',
      syllables,
    }
    lexemes.push({
      lexemeId: lexeme.id,
      entryForm,
    })
  }
  const rules: SF_RuleGroup[] = []
  const treeTrunks: SF_LimbDate[] = []
  for (const treeTrunk of dataIn.lexicon.treeTrunks) {
    treeTrunks.push({ limb: treeTrunk, date: 0 })
  }
  const treeLimbs: SF_TreeLimb[] = []
  for (const limb of dataIn.lexicon.treeLimbs) {
    const children = limb.branch.children
    treeLimbs.push({
      id: limb.id,
      branch: {
        diversionDate: limb.branch.deathDate,
        children,
      },
    })
  }
  const dataOut: SF_Data_v0_1_beta_2 = {
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
