<template>
  <div class="flex w-100 h-100">
    <n-image
      style="max-width: 200px; max-height: 300px;"
      object-fit="fill"
      src="/images/retro-computer.png"
    />

    <div class="relative flex w-100 h-100">
      <div ref="scroller" class="scrollable">
        <div
          v-for="(line, index) of displayed"
          :key="`line-${index}`"
          v-html="line"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import random from 'lodash/random'
import { store } from '@/store'

const props = defineProps({
  value: { type: Object },
})

const displayed = computed(() => (
  props.value?.display.slice(-store.config.serverLogSize)
  || []
))

const process = () => {
  setTimeout(() => {
    props.value.processBuffer()
    process()
  }, random(store.config.serverSpeed))
}

onMounted(() => {
  process()
})
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
</style>
