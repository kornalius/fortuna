<template>
  <n-card style="width: 400px; opacity: .95;">
    <n-button
      v-if="store.game.isPaused"
      class="mv3"
      type="primary"
      strong
      secondary
      block
      @click="() => {
        store.game.playSound('button')
        store.game.resume()
      }"
    >
      Resume
    </n-button>

    <n-button
      class="mv3"
      type="error"
      strong
      secondary
      block
      @click="() => {
        store.game.playSound('button')
        store.game.start()
      }"
    >
      New Game
    </n-button>

    <n-button
      class="mv3"
      type="warning"
      strong
      secondary
      block
      @click="() => {
        store.game.playSound('button')
      }"
    >
      Options
    </n-button>

    <n-button
      class="mv3"
      type="info"
      strong
      secondary
      block
      @click="() => {
        store.game.playSound('button')
      }"
    >
      Credits
    </n-button>
  </n-card>
</template>

<script setup>
import { store } from '@/store'
</script>
