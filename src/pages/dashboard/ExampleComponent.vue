<template>
  <q-input rounded outlined v-model="newWordInRef" label="New Word" />
  <br />
  <p>Interpretation: {{ newWordText }}</p>
  <div v-if="newWordObjectRef?.kind == 'syllables'">
  <table>
    <tr>
      <th>O</th>
      <th>N</th>
      <th>C</th>
    </tr>
    <tr v-for="syllable in newWordObjectRef.syllables" :key="syllable.id" >
      <td>
        <span v-for="phone in syllable.onset" :key="phone.id">
          {{ phoneToString(phone) }}
        </span>
      </td>
      <td>
        <span v-for="phone in syllable.rhyme.nucleus" :key="phone.id">
          {{ phoneToString(phone) }}
        </span>
      </td>
      <td>
        <span v-for="phone in syllable.rhyme.coda" :key="phone.id">
          {{ phoneToString(phone) }}
        </span>
      </td>
    </tr>

    </table>
  </div>
  <div v-if="newWordObjectRef?.kind == 'phones'">
    <table>
      <tr>
        <th>Nonsyllabic</th>
      </tr>
      <tr>
        <td class="ipa">
          <span v-for="phone in newWordObjectRef.phones" :key="phone.id">
            {{ phoneToString(phone) }}
          </span>
        </td>
      </tr>
    </table>
  </div>
  <br/>
  <button
    @click="addWord"
  >
    Add to list
  </button>
  <br/>
  <br/>
  <h2>List of words:</h2>
  <li v-for="lexeme in store.languages?.data.words" :key="lexeme.id" class="roman-medium">{{ syllablesClusterToString(lexeme.entryForm) }}</li>

</template>

<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
import type { FeatureStop, Phone, Syllable, PhoneString, UUID_FeatureStop } from '../../common/commonTypes'
import { stringToWordPhrase } from '../../common/stringToWordPhrase'
import { useLangueageStore } from '../../stores/example-store'
import { AddLexemeCommand } from '../../common/commandTypes'
import { BuildLexeme } from '../../common/Lexemes/lexemeFactory'

const store = useLangueageStore()

function syllablesClusterToString (syllablesCluster: PhoneString) {
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

function phoneToString (phone: Phone|null) {
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

const newWordInRef = ref('')
const newWordObjectRef: Ref<PhoneString|null> = ref(null)
const newWordText = ref({})

watch(newWordInRef, () => {
  console.log(store.languages)
  if (!store.languages) return
  try {
    newWord = stringToWordPhrase(newWordInRef.value, store.languages)
    newWordObjectRef.value = newWord
    newWordText.value = syllablesClusterToString(newWord)
  } catch (err) {

  }
})

let newWord: PhoneString|null = null

function addWord () {
  if (!newWord) return
  store.executeDo(new AddLexemeCommand(BuildLexeme({ word: newWord })))
}
</script>
