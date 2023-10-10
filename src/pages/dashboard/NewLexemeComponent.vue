<template>
  <q-input rounded outlined
    v-model="userSanity.dashboard.newWord"
    label="New Word"
    @keydown.enter.prevent="addWord"
    @update:model-value="newNewWord"
  />
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
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import type { PhoneString } from '../../common/commonTypes'
import { stringToWordPhrase } from '../../common/stringToWordPhrase'
import { useLangueageStore } from '../../stores/languages-store'
import { AddLexemeCommand } from '../../common/commandTypes'
import { BuildLexeme } from '../../common/Lexemes/lexemeFactory'
import { lexemeToString, phoneToString } from '../../common/lexemeToString'
import { useUserSanityStore } from 'src/stores/userSanity-store'

const store = useLangueageStore()
const userSanity = useUserSanityStore()

const newWordObjectRef: Ref<PhoneString|null> = ref(null)
const newWordText = ref({})

function newNewWord () {
  newWord = null
  newWordObjectRef.value = null
  newWordText.value = ''
  if (!store.languages) return
  if (userSanity.dashboard.newWord === '') return
  try {
    newWord = stringToWordPhrase(userSanity.dashboard.newWord, store.languages)
    newWordObjectRef.value = newWord
    newWordText.value = lexemeToString(newWord)
  } catch (err) {
    console.log(err)
  }
}

let newWord: PhoneString|null = null

function addWord () {
  if (!newWord) return
  store.executeDo(new AddLexemeCommand(BuildLexeme({ word: newWord })))
  userSanity.dashboard.newWord = ''
  newNewWord()
}
</script>
