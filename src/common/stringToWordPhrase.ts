import type { Phone, Phoneme, Syllable, PhoneString as syllablesCluster, uuidFeatureCategory, uuidFeatureStop, WorkingFile } from './commonTypes'

export function stringToWordPhrase (input: string, languages: WorkingFile): syllablesCluster {
  const toReturnValueSyllables: Syllable[] = []
  const toReturnValuePhones: Phone[] = []

  let foundAnySyllabic = false
  for (const syllable of input.split('.')) {
    const phonemes = stringToPhonemes(syllable, languages)
    const onset: Phone[] = []
    const nucleus: Phone[] = []
    const coda: Phone[] = []
    let foundSyllabic = false
    for (const phoneme of phonemes) {
      switch (phoneme.syllabic) {
        case 'Syllabic':
          if (foundSyllabic) {
            throw new Error('Couldn\'t parse syllables.')
          }
          foundSyllabic = true
          nucleus.push(phonemeToPhone(phoneme))
          break

        case 'Nonsyllabic':
          toReturnValuePhones.push(phonemeToPhone(phoneme))
          switch (languages.data.phoneTypes[phoneme.typeID].articulation) {
            case 'Vowel':
              nucleus.push(phonemeToPhone(phoneme))
              break
            case 'Consonant':
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
    foundAnySyllabic = foundAnySyllabic || foundSyllabic
    toReturnValueSyllables.push({
      id: crypto.randomUUID(),
      onset,
      rhyme: {
        nucleus,
        coda,
      },
    })
  }
  if (!foundAnySyllabic) {
    return {
      id: crypto.randomUUID(),
      kind: 'phones',
      phones: toReturnValuePhones,
    }
  }
  return {
    id: crypto.randomUUID(),
    kind: 'syllables',
    syllables: toReturnValueSyllables,
  }
}

function stringToPhonemes (input: string, languages: WorkingFile): Phoneme[] {
  const phonemes: Phoneme[] = []
  let done = false
  let currCharIndex = 0
  let currPhonemeIndex = 0
  while (!done) {
    const currPhoneme = Object.values(languages.data.languages)[0].phonemesAll[currPhonemeIndex]
    if (!currPhoneme) {
      done = true
      break
    }
    if (
      input.substring(currCharIndex, currCharIndex + currPhoneme.IPA.length)
      === currPhoneme.IPA
    ) {
      phonemes.push(currPhoneme)
      currCharIndex += currPhoneme.IPA.length
      currPhonemeIndex = 0
    } else {
      currPhonemeIndex += 1
      if (currPhonemeIndex >= Object.values(languages.data.languages)[0].phonemesAll.length) {
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

function phonemeToPhone (phoneme: Phoneme|null): Phone {
  if (!phoneme) {
    return {
      id: crypto.randomUUID(),
      type: '',
      features: {},
    }
  }
  const features: { [id: uuidFeatureCategory] : uuidFeatureStop; } = {}
  for (const feature of phoneme.featureStops) {
    features[feature.categoryId] = feature.stopId
  }
  return {
    id: crypto.randomUUID(),
    type: phoneme.typeID,
    features,
  }
}
