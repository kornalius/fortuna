<template>
  <n-card style="width: 500px; opacity: .95;">
    <div class="flex flex-grow-1 justify-center f3 mb4">
      Options
    </div>

    <div class="flex flex-grow-1 pb4">
      <n-checkbox
        class="w-100"
        v-model:checked="crt"
      >
        CRT effects
      </n-checkbox>
    </div>

    <div class="flex flex-grow-1 pb4">
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

const volume = ref(0)
const crt = ref(false)

watch(() => window.store.game.volume, newValue => {
  volume.value = newValue
}, { immediate: true })

watch(volume, newValue => {
  if (newValue !== window.store.game.volume) {
    window.store.game.volume = newValue
  }
})

watch(() => window.store.game.crt, newValue => {
  crt.value = newValue
}, { immediate: true })

watch(crt, newValue => {
  if (newValue !== window.store.game.crt) {
    window.store.game.crt = newValue
  }
})

const { store } = window
</script>
