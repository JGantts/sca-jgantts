<script setup lang="ts">
import { ref, watch } from 'vue';
import { phonemes, phoneTypes, languageData, assemblePhones } from './phones'
import { lexicon } from './lexicon'
import type { Cluster, FeatureRange, FeatureStop, Phone, Syllable, Syllables, Syllables_Cluster, UUID_FeatureStop, WordPhrase } from './commonTypes';
import { stringToWordPhrase } from './stringToWordPhrase'

const lexiconRef = ref(lexicon)


assemblePhones()


function syllables_clusterToString(syllables_cluster: Syllables_Cluster) {
  let toReturn = ""
  switch (syllables_cluster.value.kind) {
    case "Syllables":
      for (let syllable of syllables_cluster.value.sounds) {
        let syllableString = syllableToString(syllable)
        if (toReturn != "") {
          toReturn += "."
        }
        toReturn += syllableToString(syllable)
      }
      break
    case "Cluster":
      toReturn += phonesToString(syllables_cluster.value.sounds)
      break
  }
  return toReturn
}

function syllableToString(syllable: Syllable) {
  let toReturn = phonesToString(syllable.onset)
  toReturn += phonesToString(syllable.rhyme.nucleus)
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
          phonemeFeatureStopFitsPhone(phone, phonemeFeatureStop)
        )
    )[0]?.IPA ?? "[Error]"
  }
}

function phonemeFeatureStopFitsPhone(phone: Phone, phonemeStop: FeatureStop|FeatureRange): boolean {
  switch (phonemeStop.kind) {
    case "FeatureStop":
      return (phone.features[phonemeStop.categoryID] as UUID_FeatureStop) == phonemeStop.id
      
    case "FeatureRange":
      let value = (phone.features[phonemeStop.categoryID] as number)
      return value <= phonemeStop.high
        && value >= phonemeStop.low

  }
}

const newWordInRef = ref("")
const newWordObjectRef = ref({})
const newWordText = ref({})

watch(newWordInRef, () => {
  newWord = stringToWordPhrase(newWordInRef.value, languageData)
  newWordObjectRef.value = newWord
  newWordText.value = syllables_clusterToString(newWord)
})

let newWord: Syllables_Cluster|null = null

function addWord() {
  if (newWord){
    lexiconRef.value.words.push({
      id: "",
      entryForm: newWord,
      entryTreeLimb: "",
      entryDate: 0,
    })
  }
}
</script>

<template>
  <input
    v-model="newWordInRef"
    placeholder="type new word here"
  ><br/>
  <p>Interpretation: {{ newWordText }}</p>
  <li v-for="phoneme in newWordObjectRef">{{ phoneme }}</li>
  <br/>
  <button
    @click="addWord"
  >
    Add to list
  </button>
  <br/>
  <br/>
  <h2>List of words:</h2>
  <li v-for="lexeme in lexiconRef.words">{{ syllables_clusterToString(lexeme.entryForm) }}</li>


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
