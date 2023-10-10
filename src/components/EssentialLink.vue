<template>
  <router-link
    :to="link"
    :label="title"
  >
    <q-item
      :active="$route.matched.some(({ path }) => {
        path === '/'+link
        || (path === '/' && link == './')
      })"
    >
      <q-item-section
        v-if="icon"
        avatar
      >
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </router-link>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
})
</script>

<style>
a {
  text-decoration: none;
  color: inherit;
}
</style>
