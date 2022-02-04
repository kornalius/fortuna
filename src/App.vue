<template>
  <n-config-provider :theme="darkTheme">
    <Main v-if="game.isStarted" />
    <n-modal
      :show="showDialog"
      style="width: 600px;"
      role="dialog"
      aria-modal="true"
    >
      <Menu />
    </n-modal>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import Main from '@/components/Main.vue'
import Menu from '@/components/Menu.vue'
import { store } from '@/store'
import { darkTheme } from 'naive-ui'

const { game } = store

const showDialog = computed(() => game.isPaused || game.isStarted === false)
</script>

<style>
body {
  background: #222;
}
</style>
