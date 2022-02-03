<template>
  <Room :room="store.rooms.at(0, 0)" />

  <Stats />

  <div style="margin-top: 1em">
    <button @click="() => player.lvl += 1">Increment level</button>
    <button style="margin-left: .5em" @click="() => player.state.lvl = 1">RESET</button>
  </div>

  <Inventory />

  <Map />

  <Log />
</template>

<script setup>
import { store } from '../store'
import Room from './Room.vue';
import Stats from './Stats.vue'
import Inventory from './Inventory.vue';
import Map from './Map.vue';
import Log from './Log.vue';

const { player, items, doors, logs } = store

player.rename('Bob')

setTimeout(() => {
  player.rename('Alain')
}, 1000)
</script>
