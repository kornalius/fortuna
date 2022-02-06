<template>
  <n-card style="width: 400px">
    <n-button
      class="mv3"
      type="primary"
      strong
      secondary
      block
      @click="() => store.game.start()"
    >
      New Game
    </n-button>

    <n-button
      class="mv3"
      type="warning"
      strong
      secondary
      block
    >
      Options
    </n-button>

    <n-button
      class="mv3"
      type="info"
      strong
      secondary
      block
    >
      Credits
    </n-button>
  </n-card>
</template>

<script setup>
import { store } from '@/store'
</script>
