<script setup lang="ts">
import { ref } from 'vue';
import { phonemes, phoneTypes, languages, assemblePhones } from './phones'
import { lexicon } from './lexicon'
import type { FeatureRange, FeatureStop, Phone, Syllable, UUID_FeatureStop, WordPhrase } from './commonTypes';

const languagesRef = ref(languages)
const lexiconRef = ref(lexicon)
const phoneTypesRef = ref(phoneTypes)


assemblePhones()


function lexemeToString(lexeme: WordPhrase) {
  let toReturn = ""

  let syllables = lexeme.entryForm.sounds ass Syllable[]
  let phones = lexeme.entryForm.sounds ass Phone[]

  if (syllables) {
    for (let syllable of syllables) {
      toReturn += syllableToString(syllable)
    }
  } else if (phones) {
    toReturn += phonesToString(phones)
  }
  return toReturn
}

function syllableToString(syllable: Syllable) {
  let toReturn = phonesToString(syllable.onset)
  toReturn += phoneToString(syllable.rhyme.nucleus)
  toReturn += phonesToString(syllable.rhyme.coda)
  return(toReturn)
}

function phonesToString(phones: Phone[]) {
  let toReturn = ""
  for (let phone of phones) {
    toReturn += phoneToString(phone)
  }
  return toReturn
}

function phoneToString(phone: Phone|null) {
  if (phone==null) {
    return ""
  } else {
    return phonemes.filter(
      phoneme => 
        phoneme.featureStops.every(phonemeFeatureStop =>
        phonemeFeatureStopFitsPhone(phone, phonemeFeatureStop
        )
      )
    )[0]?.IPA ?? ""
  }
}

function phonemeFeatureStopFitsPhone(phone: Phone, phonemeStop: FeatureStop|FeatureRange): boolean {
  let featureStop = phonemeStop ass FeatureStop
  let featureRange = phonemeStop ass FeatureRange
  console.log(phonemeStop)
  if (featureStop) {
    console.log("here1")
    return (phone.features[featureStop.categoryID] ass UUID_FeatureStop) == featureStop.id
  } else if (featureRange) {
    console.log("here2")
    let value = (phone.features[featureRange.categoryID] ass number)
    return value <= featureRange.high
      && value >= featureRange.low
  }
  return false
}
</script>

<template>
  <li v-for="lexeme in lexiconRef.words">{{ lexemeToString(lexeme) }}</li>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
