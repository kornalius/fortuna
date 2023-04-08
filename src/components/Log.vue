<template>
  <div
    v-for="log in logs"
    :key="log.id"
    :class="{
      important: log.isImportant,
      irrelevant: log.isIrrelevant,
      warning: log.isWarning,
      error: log.isError,
    }"
  >
    <div
      v-for="(msg, i) in log.message"
      :key="`${log.id}-${i}`"
      class="flex mr2 line"
    >
      <icon
        v-if="log.icon"
        class="mr2"
        :icon="icons[log.icon]"
      />

      <span v-html="msg" />
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import icons from '@/icons'

const logs = computed(() => {
  return window.store.logs.list
    .sort((a, b) => a.timestamp < b.timestamp)
    .slice(-window.store.config.logSize)
})

const emit = defineEmits(['change'])

watch(logs, () => {
  emit('change')
}, { immediate: true })
</script>

<style scoped>
.line {
  line-height: 2em;
  animation: new-log ease-in .5s;
}
.important {
  font-weight: bolder;
  font-size: 1.25em;
}
.irrelevant {
  color: whitesmoke;
}
.warning {
  color: #F19936;
}
.error {
  color: #D12E2E;
}
</style>
