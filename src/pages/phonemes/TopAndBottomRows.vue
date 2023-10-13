<script setup lang="ts">
import { PropType, defineProps } from 'vue'
import type { PhoneType } from '../../common/commonTypes'

const props = defineProps({
  phoneType: {
    type: Object as PropType<PhoneType>,
    required: true,
  },
})

</script>

<template>
<q-tr class="myclass">
  <q-td />
  <q-td style="border-style: dotted;">
    IPA
  </q-td>
  <q-td v-for="feature in phoneType.features" :key="feature.id">
    {{ feature.desc }}
  </q-td>
</q-tr>
<q-tr>
  <q-td colspan="100%" :style="{ height: '1px', padding: '0', 'padding-left': '10px', 'padding-right': '10px', }">
    <hr style="width: 100%;"/>
  </q-td>
</q-tr>
</template>

<style>
.myclass {
  position: sticky;
  z-index: 1;
  top: 0;
}
</style>
