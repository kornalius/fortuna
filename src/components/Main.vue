<template>
  <div class="ma-4">
    <Room :room="store.player.room" />

    <Stats />

    <Inventory />

    <Map />

    <Log />
  </div>
</template>

<script setup>
import { store } from '../store'
import Room from './Room.vue';
import Stats from './Stats.vue'
import Inventory from './Inventory.vue';
import Map from './Map.vue';
import Log from './Log.vue';

const { player, items, doors, logs } = store

console.log(player)

player.rename('Bob')

setTimeout(() => {
  player.rename('Alain')
}, 1000)
</script>
