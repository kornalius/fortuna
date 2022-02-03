<template>
  <h1>Inventory</h1>

  <button @click="addItem">Add Item</button>

  <div v-for="item in items" :key="item.id">
    {{ item.name }} ({{ item.qty }})
    <button @click="item.remove()">X</button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '../store';
import Item from '../classes/items/item';
import random from 'lodash/random'

const items = computed(() => store.player.items)

const addItem = () => {
  store.items.update(new Item({
    qty: random(20),
    locationStore: 'player',
  }))
}
</script>
