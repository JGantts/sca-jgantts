import type { FeatureRange, FeatureStop, Language, Phone, Phoneme, Syllable, Syllables_Cluster, UUID_FeatureCategory, UUID_FeatureStop } from "./commonTypes";

export function stringToWordPhrase(input: string, language: Language): Syllables_Cluster {
  let toReturnValueSounds: Syllable[] = []

  for (let syllable of input.split('.')) {
    const phonemes = stringToPhonemes(input, language)
    toReturnValueSounds.push({
      onset: [phonemeToPhone(phonemes[0])],
      rhyme: {
        nucleus: phonemeToPhone(phonemes[1]),
        coda: [phonemeToPhone(phonemes[2])]
      }
    })
  }
  return {
    value: {
      kind: "Syllables",
      sounds: toReturnValueSounds
    }
  }
}

function stringToPhonemes(input: string, language: Language): Phoneme[] {
  const phonemes: Phoneme[] = []
  let done = false
  let currCharIndex = 0
  let currPhonemeIndex = 0
  while(!done) {
    let currPhoneme = language.grid[currPhonemeIndex]
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
      if (currPhonemeIndex >= language.grid.length) {
        currPhonemeIndex = 0
        currCharIndex += 1
        if (currCharIndex >= input.length) {
          done = true
        }
      }
    }
  }
  console.log(phonemes)
  return phonemes
}

function phonemeToPhone(phoneme: Phoneme|null): Phone {
  if (!phoneme) {
    return {
      type: "",
      features: {}
    }
  }
  let features: { [id: UUID_FeatureCategory] : UUID_FeatureStop|number; } = {}
  for (let feature of phoneme.featureStops) {
      switch(feature.kind) {
        case "FeatureStop":
          features[feature.categoryID] = feature.id
          break

        case "FeatureRange":
          features[feature.categoryID] = (feature.high+feature.low)/2
          break
      }
  }
  return {
    type: phoneme.typeID,
    features
  }
}