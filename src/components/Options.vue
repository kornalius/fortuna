<template>
  <n-card style="width: 500px; opacity: .95;">
    <div class="flex flex-grow-1 justify-center f3 mb4">
      Options
    </div>
    <div class="flex flex-grow-1">
      <div class="flex w-50">
        Volume
      </div>
      <div class="flex w-100">
        <n-slider
          v-model:value="volume"
          :step="0.1"
          :min="0.0"
          :max="1.0"
        />
      </div>
    </div>

    <n-button
      class="mt4"
      type="primary"
      strong
      secondary
      block
      @click="() => {
        store.game.playSound('button')
        store.game.showOptions = false
      }"
    >
      Back
    </n-button>
  </n-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { store } from '@/store'

const volume = ref(0)

watch(() => store.game.volume, newValue => {
  volume.value = newValue
}, { immediate: true })

watch(volume, newValue => {
  if (newValue !== store.game.volume) {
    store.game.volume = newValue
  }
})
</script>
