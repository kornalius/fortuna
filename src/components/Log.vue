<template>
  <div
    v-for="log in logs"
    :key="log.id"
    :class="{ line: true, important: log.isImportant }"
    v-bind="$attrs"
  >
    <span
      v-for="(msg, i) in log.message"
      :key="`${log.id}-${i}`"
      class="mr2"
      v-html="msg"
    />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { store } from '../store'

const logs = computed(() => {
  return store.logs.list
    .sort((a, b) => a.timestamp < b.timestamp)
    .slice(-store.config.logSize)
})

const emit = defineEmits(['change'])

watch(logs, () => {
  emit('change')
}, { immediate: true })
</script>

<style scoped>
.line {
  line-height: 1.75em;
  margin-bottom: 1em;
}
.important {
  font-weight: bolder;
  font-size: 1.25em;
}
</style>
