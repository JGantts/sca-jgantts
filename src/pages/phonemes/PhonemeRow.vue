<script setup lang="ts">
import { PropType, defineProps, ref, onBeforeUpdate } from 'vue'
import { useLangueageStore } from '../../stores/languages-store'
import { Phoneme } from 'src/common/commonTypes'
import PhonemeFeature from './PhonemeFeature.vue'
const store = useLangueageStore()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const props = defineProps({
  cols: {
    type: Array as PropType<{ name: string }[]>,
    required: true,
  },
  row: {
    type: Object as PropType<Phoneme>,
    required: true,
  },
  isRowExpanded: Function,
  toggleRowExpansion: Function,
  isRowLast: Function,
})

const isChildExpanded = ref(isRowExpandedInternal())

function isRowExpandedInternal () {
  if (!props.isRowExpanded) return false
  return props.isRowExpanded(props.row.id)
}

function toggleRowExpansionInternal () {
  recycling = false
  if (!props.toggleRowExpansion) return
  if (!isRowExpandedInternal()) {
    isChildExpanded.value = false
  }
  props.toggleRowExpansion(props.row.id)
  isChildExpanded.value = false
}

function isRowLastInternal (row: unknown) {
  if (!props.isRowLast) return false
  return props.isRowLast(props.row)
}

let isDeleting = false

function deleteSelf () {
  isDeleting = true
  setTimeout(() => {
    if (!store.languages) return
    const newPhonemes: { [id: string]: Phoneme; } = { }
    for (const phoneme of Object.values(store.languages.data.phonemes).filter(x => x.id !== props.row.id)) {
      newPhonemes[phoneme.id] = phoneme
    }
    store.languages.data.phonemes = newPhonemes
  }, 0)
}

let recycling = false

onBeforeUpdate(() => {
  recycling = true
})

</script>

<template>
  <q-tr>
    <q-td
      style="
        height: 2.5rem;
        width:2.5rem;
      "
    >
      <q-btn
        size="sm" color="accent" round dense
        @click="toggleRowExpansionInternal"
        icon="chevron_right"
        :class="{ rotate: isRowExpandedInternal(), 'can-rotate': !isDeleting && !recycling }"
      />
    </q-td>
    <q-td>
      {{ row.IPA }}
    </q-td>
    <q-td
      v-for="col in props.cols"
      :key="col.name"
      :class="{ highlight: isChildExpanded }"
      style="transition: font 0.3s;"
    >
      {{ col.value }}
    </q-td>
  </q-tr>
  <transition
    :name="'fade'"
    @after-enter="isChildExpanded = true"
  >
    <q-tr v-if="isRowExpandedInternal()" :props="props" style="height: 1rem;">
      <q-td
        style="
          width:2.5rem;
          height: 1rem;
        "
        class="text-center"
      >
        <transition
          :name="recycling ? '' : 'slide'"
        >
          <q-btn
            v-if="isChildExpanded"
            size="xs" color="negative" round dense
            icon="remove"
            @click="deleteSelf"
          />
        </transition>
      </q-td>
      <q-td>
        <q-input filled v-model="Object.values(store.languages.data.phonemes).filter(x => x.id === props.row.id)[0].IPA" label="" dense outlined style="width: 3.5rem;"/>
      </q-td>
      <q-td
        style="
          height: 1rem;
        "
        v-for="col in props.cols"
        :key="col.name"
      >
        <transition
          :name="'slide'"
        >
          <PhonemeFeature />
        </transition>
      </q-td>
    </q-tr>
  </transition>
  <q-tr >
    <q-td colspan="100%"
      :style="{
        height: '1px',
        padding: '0',
        'padding-left': '10px',
        'padding-right': '10px',
        opacity: '25%',
      }"
    >
      <div v-if="!isRowLastInternal(row)">
        <hr style="width: 100%;"/>
      </div>
    </q-td>
  </q-tr>
</template>

<style scoped>
.highlight {
  font-weight: 900;
}
.can-rotate {
  transition: transform 0.3s ease-in-out;
}
.rotate {
  transform: rotate(90deg);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s, max-height 0.3s, transform 0.3s;
}
.fade-enter {
  opacity: 0;
  transform: translateY(-100%);
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.slide-enter-active, .slide-leave-active {
  transition: opacity 0.3s, max-height 0.3s, transform 0.3s;
}
.slide-enter {
  transform: translateX(-100%);
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
