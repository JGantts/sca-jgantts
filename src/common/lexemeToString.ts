import type { FeatureStop, Phone, Syllable, PhoneString, UUID_FeatureStop } from './commonTypes'
import { useLangueageStore } from '../stores/languages-store'

const store = useLangueageStore()

export function lexemeToString (syllablesCluster: PhoneString) {
  let toReturn = ''
  switch (syllablesCluster.kind) {
    case 'syllables':
      for (const syllable of syllablesCluster.syllables) {
        if (toReturn !== '') {
          toReturn += '.'
        }
        toReturn += syllableToString(syllable)
      }
      break
    case 'phones':
      toReturn += phonesToString(syllablesCluster.phones)
      break
  }
  return toReturn
}

function syllableToString (syllable: Syllable) {
  let toReturn = phonesToString(syllable.onset)
  toReturn += phonesToString(syllable.rhyme.nucleus)
  toReturn += phonesToString(syllable.rhyme.coda)
  return toReturn
}

function phonesToString (phones: Phone[]) {
  let toReturn = ''
  for (const phone of phones) {
    toReturn += phoneToString(phone)
  }
  return toReturn
}

export function phoneToString (phone: Phone|null) {
  if (phone == null || store.languages == null) {
    return ''
  } else {
    return Object.values(store.languages.data.phonemes).filter(
      phoneme =>
        phoneme.featureStops.every(phonemeFeatureStop =>
          phonemeFeatureStopFitsPhone(phone, phonemeFeatureStop),
        ),
    )[0]?.IPA ?? 'Error]'
  }
}

function phonemeFeatureStopFitsPhone (phone: Phone, phonemeStop: FeatureStop): boolean {
  return (phone.features[phonemeStop.categoryId] as UUID_FeatureStop) === phonemeStop.stopId
}
