<template>
  <div v-for="log in logs" :key="log.id" class="line">
    <span
      v-for="(msg, i) in innerMsgs(log)"
      :key="`${log.id}-${i}`"
      class="mr2"
      v-html="msg"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../store'

const size = 100

const logs = computed(() => {
  const l = store.logs.list.length
  return store.logs.list
    .sort((a, b) => a.timestamp < b.timestamp)
    .slice(l - size)
})

const innerMsgs = log => Array.isArray(log.message) ? log.message : [log.message]
</script>

<style scoped>
.line {
  line-height: 1.75em;
}
</style>
