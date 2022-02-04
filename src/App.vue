<template>
  <n-config-provider :theme="darkTheme">
    <Main v-if="game.isStarted" />
    <n-dialog
      :value="showDialog"
    >
      <Menu />
    </n-dialog>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import Main from '@/components/Main.vue'
import Menu from '@/components/Menu.vue'
import { store } from '@/store'
import { darkTheme } from 'naive-ui'

const game = computed(() => store.game)

const showDialog = computed(() => game.isPaused || !game.isStarted)
</script>

<style>
body {
  background: #222;
}
</style>
