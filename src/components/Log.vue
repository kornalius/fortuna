<template>
  <div v-for="log in logs" :key="log.id">
    <span v-for="(msg, i) in innerMsgs(log)" :key="`${log.id}-${i}`">
      <item-component
        v-if="msg instanceof Item"
        :value="msg"
      />
      <span class="mr2" v-else v-text="msg" />
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
  const logs = store.logs.list
    .sort((a, b) => a.timestamp < b.timestamp)
    .slice(l - size)
  console.log(logs)
  return logs
})

const innerMsgs = log => Array.isArray(log.message) ? log.message : [log.message]
</script>
