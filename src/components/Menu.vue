<template>
  <n-card style="width: 400px; opacity: .95;">
    <n-button
      v-if="window.store.game.isPaused"
      class="mv3"
      type="primary"
      strong
      secondary
      block
      @click="() => {
        window.store.game.playSound('button')
        window.store.game.resume()
      }"
    >
      Resume
    </n-button>

    <n-button
      v-if="!window.store.game.isStarted && window.store.game.hasSave"
      class="mv3"
      type="primary"
      strong
      secondary
      block
      @click="() => {
        window.store.game.playSound('button')
        window.store.game.load()
        window.store.game.start()
      }"
    >
      Continue
    </n-button>

    <n-button
      class="mv3"
      type="error"
      strong
      secondary
      block
      @click="() => {
        window.store.game.playSound('button')
        window.store.game.restart()
      }"
    >
      {{ window.store.game.isStarted ? 'Restart' : 'New Game' }}
    </n-button>

    <n-button
      v-if="window.store.game.isStarted"
      class="mv3"
      strong
      secondary
      block
      @click="() => {
        window.store.game.playSound('button')
        window.store.game.save()
      }"
    >
      Save Game
    </n-button>

    <n-button
      class="mv3"
      type="warning"
      strong
      secondary
      block
      @click="() => {
        window.store.game.playSound('button')
        window.store.game.showOptions = true
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
        window.store.game.playSound('button')
      }"
    >
      Credits
    </n-button>
  </n-card>
</template>

<script setup>
</script>
