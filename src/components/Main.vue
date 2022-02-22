<template>
  <div class="flex justify-center w-100 h-100">
    <img src="/images/menu-background.png" class="background-image" alt="menu-background.png" />

    <div class="flex h-100">
      <div class="flex flex-column w-100">
        <div class="flex h-100">
          <Room :value="store.game.room" />
        </div>
      </div>

      <div class="flex flex-column">
        <Stats />

        <div class="flex h-100">
          <Inventory />
        </div>

        <Map />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { store } from '../store'
import Room from './Room.vue'
import Stats from './Stats.vue'
import Inventory from './Inventory.vue'
import Map from './Map.vue'

const keyup = e => {
  if (e.keyCode === 27) {
    if (!store.game.isPaused) {
      store.game.pause()
    } else {
      store.game.resume()
    }
  }
  e.stopImmediatePropagation()
  e.preventDefault()
}

onMounted(() => {
  window.document.addEventListener('keyup', keyup)
})

onUnmounted(() => {
  window.document.removeEventListener('keyup', keyup)
})
</script>

<style scoped>
.background-image {
  object-fit: fill;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
