import type { 
  PhoneType,
  Phone,
  Language,
  Phoneme,
  LanguageData,
  UUID_PhoneType,
  UUID_Language,
  UUID_Phoneme,
} from "./commonTypes"
import type { SaveFile, SaveFileData, SaveFileDataLatest, SaveFileDataVersion, SaveFileData_v0_1_beta_1, SaveFileData_v0_1_beta_2, SaveFileData_vLatest, SaveFileMetaData, WorkingFile, WorkingFileData, WorkingFileMetaData } from "./file/FileTypes";

function assemblePhonemes(data: SaveFileDataLatest) {
  let phonemes: { [id: UUID_Phoneme] : Phoneme; } = {}
  for (let language of data.languages) {
    for (let phoneme of language.grid) {
      phonemes[phoneme.id] = phoneme
    }
  }
  return phonemes
}

function assemblePhoneTypes(data: SaveFileDataLatest): { [id: UUID_PhoneType] : PhoneType; } {
  let phoneTypes: { [id: UUID_PhoneType] : PhoneType; } = {}
  for (let phoneType of data.phoneTypes) {
    phoneTypes[phoneType.id] = phoneType
  }
  return phoneTypes
}

function assembleLanguagues(data: SaveFileDataLatest) {
  let langs: { [id: UUID_Language] : Language; } = {}
  for (let lang of data.languages) {
    langs[lang.id] = lang
  }
  return langs
}

export function loadSaveFile(saveFile: SaveFile): WorkingFile {
  let projectName = saveFile.metadata?.projectName ?? "MyProject"
  let metadata: WorkingFileMetaData = {
    projectName,
  }
  let data: SaveFileData = saveFile.data

  switch (saveFile.metadata?.version as SaveFileDataVersion) {
    case "SaveFileData_v0_1_beta_1":
      data = v0_0_beta_1_TO_v0_0_beta_2(data)

    case "SaveFileData_v0_1_beta_2":
      data = data
      break

    default:
      throw new Error(`Unrecognized file version: ${saveFile?.metadata?.version}`)
  }
  let workingData = saveFileLatest_TO_workingFile(data)


  return {
    metadata,
    data: workingData,
  }
}

export function getSaveFile(workingFile: WorkingFile): SaveFile {
  let metadata: SaveFileMetaData = {
    version: "SaveFileData_v0_1_beta_2",
    projectName: workingFile.metadata.projectName,
  }
  let data: SaveFileDataLatest = {
    phoneTypes: Object.values(workingFile.data.phoneTypes),
    languages: Object.values(workingFile.data.languages),
    lexicon: workingFile.data.lexicon,
  }

  let toSave: SaveFile = {
    metadata,
    data,
  }
  return toSave
}

function saveFileLatest_TO_workingFile(dataIn: SaveFileDataLatest): WorkingFileData {
  let dataOut: WorkingFileData = {
    phoneTypes: assemblePhoneTypes(dataIn),
    languages: assembleLanguagues(dataIn),
    phonemes: assemblePhonemes(dataIn),
    lexicon: dataIn.lexicon,
  }
  return dataOut
}

function v0_0_beta_1_TO_v0_0_beta_2(dataIn: SaveFileData_v0_1_beta_1): SaveFileData_v0_1_beta_2 {
  let dataOut: SaveFileData_v0_1_beta_2 = {
    phoneTypes: dataIn.phoneTypes,
    languages: dataIn.languages,
    lexicon: dataIn.lexicon,
  }
  return dataOut
}