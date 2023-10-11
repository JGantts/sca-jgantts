<script setup lang="ts">
import { PropType, defineProps, ref } from 'vue'
import { useLangueageStore } from '../../stores/languages-store'
import { Phoneme } from 'src/common/commonTypes'
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
})

const isChildExpanded = ref(isRowExpandedInternal())

function isRowExpandedInternal () {
  if (!props.isRowExpanded) return false
  return props.isRowExpanded(props.row.id)
}

function toggleRowExpansionInternal () {
  if (!props.toggleRowExpansion) return
  if (!isRowExpandedInternal()) {
    isChildExpanded.value = false
  }
  props.toggleRowExpansion(props.row.id)
}

function deleteSelf () {
  // isDeleting = true
  setTimeout(() => {
    if (!store.languages) return
    const newPhonemes: { [id: string]: Phoneme; } = { }
    for (const phoneme of Object.values(store.languages.data.phonemes).filter(x => x.id !== props.row.id)) {
      newPhonemes[phoneme.id] = phoneme
    }
    store.languages.data.phonemes = newPhonemes
  }, 0)
}

</script>

<template>
  <q-tr>
    <q-td auto-width style="padding: 0.5rem">
      <q-btn
        size="sm" color="accent" round dense
        @click="toggleRowExpansionInternal"
        icon="chevron_right"
        :class="{ rotate: isRowExpandedInternal() }"
        class="can-rotate"
      />
    </q-td>
    <q-td
      v-for="col in props.cols"
      :key="col.name"
    >
      {{ col.value }}
      <q-popup-edit v-model="col.name" title="Update calories" buttons v-slot="scope">
        <q-input type="number" v-model="scope.value" dense autofocus />
      </q-popup-edit>
    </q-td>
  </q-tr>
  <transition
    name="fade"
    @after-enter="isChildExpanded = true"
  >
    <q-tr v-if="isRowExpandedInternal()" :props="props" style="height: 2.5rem">
      <q-td auto-width style="padding: 0.5rem">
        <transition
          name="slide"
        >
          <q-btn
            v-if="isChildExpanded"
            size="sm" color="negative" round dense
            icon="remove"
            @click="deleteSelf"
          />
        </transition>
      </q-td>
      <q-td
        v-for="col in props.cols"
        :key="col.name"
      >
        {{ col.value }}
      </q-td>
    </q-tr>
  </transition>
</template>

<style scoped>
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
}
.fade-enter-from {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
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
