<script setup lang="ts">
import { ref, watch, type Ref, reactive } from 'vue';
import type { FeatureStop, Phone, Syllable, Syllables_Cluster, UUID_FeatureStop, WordPhrase } from './commonTypes';
import { stringToWordPhrase } from './stringToWordPhrase'
import { useLangueageStore } from './store'
import { AddLexemeCommand } from './commandTypes';
import { BuildLexeme } from './Lexemes/lexemeFactory';

const store = useLangueageStore()



function syllables_clusterToString(syllables_cluster: Syllables_Cluster) {
  let toReturn = ""
  switch (syllables_cluster.kind) {
    case "syllables":
      for (let syllable of syllables_cluster.syllables) {
        if (toReturn != "") {
          toReturn += "."
        }
        toReturn += syllableToString(syllable)
      }
      break
    case "phones":
      toReturn += phonesToString(syllables_cluster.phones)
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
  if (phone==null || store.languages==null) {
    return ""
  } else {
    return Object.values(store.languages.data.phonemes).filter(
      phoneme => 
        phoneme.featureStops.every(phonemeFeatureStop =>
          phonemeFeatureStopFitsPhone(phone, phonemeFeatureStop)
        )
    )[0]?.IPA ?? "[Error]"
  }
}

function phonemeFeatureStopFitsPhone(phone: Phone, phonemeStop: FeatureStop): boolean {
  return (phone.features[phonemeStop.categoryId] as UUID_FeatureStop) == phonemeStop.stopId
}

const newWordInRef = ref("")
const newWordObjectRef: Ref<Syllables_Cluster|null> = ref(null)
const newWordText = ref({})

watch(newWordInRef, () => {
  console.log(store.languages)
  if (!store.languages) return
  try {
    newWord = stringToWordPhrase(newWordInRef.value, store.languages)
    newWordObjectRef.value = newWord
    newWordText.value = syllables_clusterToString(newWord)
  } catch (err) {

  }
})

let newWord: Syllables_Cluster|null = null

function addWord() {
  if (!newWord) return
  store.executeDo(new AddLexemeCommand(BuildLexeme({ word: newWord })))
}

</script>

<template>
  <input
    v-model="newWordInRef"
    placeholder="type new word here"
  ><br/>
  <p>Interpretation: {{ newWordText }}</p>
  <div v-if="newWordObjectRef?.kind == 'syllables'">
  <table>
    <tr>
      <th>O</th>
      <th>N</th>
      <th>C</th>
    </tr>
    <tr v-for="sylable in newWordObjectRef.syllables">
      <td>
        <span v-for="phone in sylable.onset">
          {{ phoneToString(phone) }}
        </span>
      </td>
      <td>
        <span v-for="phone in sylable.rhyme.nucleus">
          {{ phoneToString(phone) }}
        </span>
      </td>
      <td>
        <span v-for="phone in sylable.rhyme.coda">
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
          <span v-for="phone in newWordObjectRef.phones">
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
  <li v-for="lexeme in store.languages?.data.words" class="roman-medium">{{ syllables_clusterToString(lexeme.entryForm) }}</li>


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
