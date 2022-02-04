<template>
  <n-card title="Menu">
    <n-button
      type="primary"
      @click="() => store.game.start()"
    >
      <v-icon icon="mdi:controller-classic" width="32" />
      <span class="ml2">New Game</span>
    </n-button>
  </n-card>
</template>

<script setup>
import { store } from '@/store'
</script>
