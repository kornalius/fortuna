<template>
  <div v-for="log in logs" :key="log.id">
    <span v-for="(l, i) in innerLogs(log)" :key="`${log.id}-${i}`">
      <item-component
        v-if="l instanceof Item"
        :value="l"
      />
      <span v-else v-text="l.message" />
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../store'
import ItemComponent from './Item.vue'
import Item from '@/classes/items/item'

const size = 100

const logs = computed(() => {
  const l = store.logs.list.length
  return store.logs.list
    .sort((a, b) => a.timestamp < b.timestamp)
    .slice(l - size)
})

const innerLogs = log => Array.isArray(log) ? log : [log]
</script>
