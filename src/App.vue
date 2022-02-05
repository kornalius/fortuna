<template>
  <n-config-provider :theme="darkTheme" style="height: 100%;">
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
@font-face{
  font-family: nokia;
  src: url('/fonts/nokiafc22.ttf');
  font-weight: normal;
  font-style: normal;
}
#app {
  height: 100%;
}
body {
  font-family: nokia,sans-serif;
  height: 100vh;
  background: #333;
}
</style>

<style lang="scss">
@import "/public/scanlines.scss";
</style>
