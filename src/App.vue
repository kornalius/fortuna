<template>
  <n-config-provider :theme="darkTheme" style="height: 100%;">
    <Main v-if="game.isStarted" />

    <div v-show="showDialog">
      <div v-if="!game.isStarted" class="title smoke">FORTUNA</div>
      <img src="/images/menu-background.png" class="background-image" alt="menu-background.png" />
      <div class="bg background-anim">
        <n-modal :show="showDialog" role="dialog" aria-modal="true">
          <Menu />
        </n-modal>
      </div>
    </div>
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
@font-face{
  font-family: hacked;
  src: url('/fonts/Hacked.ttf');
  font-weight: normal;
  font-style: normal;
}
@font-face{
  font-family: pixeled;
  src: url('/fonts/Pixeltype.ttf');
  font-weight: normal;
  font-style: normal;
}
#app {
  height: 100%;
}
::selection {
  color: white;
  background: #2293E1;
}
body {
  font-family: nokia,sans-serif;
  height: 100vh;
  background: #333;
}
</style>

<style scoped>
.title {
  font-family: hacked,sans-serif;
  font-size: 80px;
  text-align: center;
  position: absolute;
  top: 15%;
  width: 100%;
  z-index: 1;
  /*animation: glow 2s ease-in-out infinite alternate;*/
}
</style>

<style lang="scss">
@import "/public/styles/scanlines";
@import "/public/styles/menu-background";
@import "/public/styles/glow";
@import "/public/styles/smoke-background";

.background-anim {
  position: absolute;
}
.background-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
}
</style>
