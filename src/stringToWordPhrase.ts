import type { FeatureStop, Language, LanguageData, Phone, Phoneme, Syllable, Syllables_Cluster, UUID_FeatureCategory, UUID_FeatureStop } from "./commonTypes";

export function stringToWordPhrase(input: string, languageData: LanguageData): Syllables_Cluster {
  let toReturnValueSyllables: Syllable[] = []
  let toReturnValuePhones: Phone[] = []

  let foundAnySyllabic = false
  for (let syllable of input.split('.')) {
    const phonemes = stringToPhonemes(syllable, languageData)
    let onset: Phone[] = []
    let nucleus: Phone[] = []
    let coda: Phone[] = []
    let foundSyllabic = false
    for (let phoneme of phonemes) {
      switch (phoneme.syllabic) {
        case "Syllabic":
          if (foundSyllabic) {
            throw new Error("Couldn't parse syllables.")
          }
          foundSyllabic = true
          nucleus.push(phonemeToPhone(phoneme))
          break

        case "Nonsyllabic":
          toReturnValuePhones.push(phonemeToPhone(phoneme))
          switch (languageData.phoneTypes[phoneme.typeID].type) {
            case "Vowel":
              nucleus.push(phonemeToPhone(phoneme))
              break
            case "Consonant":
              if (!foundSyllabic) {
                onset.push(phonemeToPhone(phoneme))
              } else {
                coda.push(phonemeToPhone(phoneme))
              }
              break
          }
          break
      }
    }
    foundAnySyllabic = foundAnySyllabic||foundSyllabic
    console.log(foundSyllabic)
    toReturnValueSyllables.push({
      onset,
      rhyme: {
        nucleus,
        coda,
      }
    })
  }
  if (!foundAnySyllabic) {
    return {
      value: {
        kind: "Cluster",
        sounds: toReturnValuePhones
      }
    }
  }
  return {
    value: {
      kind: "Syllables",
      sounds: toReturnValueSyllables
    }
  }
}

function stringToPhonemes(input: string, languageData: LanguageData): Phoneme[] {
  const phonemes: Phoneme[] = []
  let done = false
  let currCharIndex = 0
  let currPhonemeIndex = 0
  while(!done) {
    let currPhoneme = languageData.lang.grid[currPhonemeIndex]
    if (!currPhoneme) {
      done = true
      break
    }
    if (
      input.substring(currCharIndex, currCharIndex+currPhoneme.IPA.length) 
      == currPhoneme.IPA
    ) {
      phonemes.push(currPhoneme)
      currCharIndex += currPhoneme.IPA.length
      currPhonemeIndex = 0
    } else {
      currPhonemeIndex += 1
      if (currPhonemeIndex >= languageData.lang.grid.length) {
        currPhonemeIndex = 0
        currCharIndex += 1
        if (currCharIndex >= input.length) {
          done = true
        }
      }
    }
  }
  return phonemes
}

function phonemeToPhone(phoneme: Phoneme|null): Phone {
  if (!phoneme) {
    return {
      type: "",
      features: {}
    }
  }
  let features: { [id: UUID_FeatureCategory] : UUID_FeatureStop; } = {}
  for (let feature of phoneme.featureStops) {
      switch(feature.kind) {
        case "FeatureStop":
          features[feature.categoryID] = feature.id
          break
      }
  }
  return {
    type: phoneme.typeID,
    features
  }
}