<template>
  <div class="flex justify-center w-100 h-100">
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
import { store } from '../store'
import Room from './Room.vue'
import Stats from './Stats.vue'
import Inventory from './Inventory.vue'
import Map from './Map.vue'
</script>
