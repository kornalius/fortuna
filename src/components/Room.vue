<template>
  <h1>Room - {{ room?.name }}</h1>

  <h3>Doors</h3>

  <div v-for="door in doors" :key="door.id">
    {{ door.name }} {{ door.qty }} [{{ door.isOpened }}]
    <button style="margin-left: .5em" @click="door.toggle()">{{ door.isOpened ? 'CLOSE' : 'OPEN' }}</button>
  </div>

  <h3>Items</h3>

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

const props = defineProps({
  room: { type: Object },
})

const items = computed(() => props.room?.items || [])
const doors = computed(() => props.room?.doors || [])

const addItem = () => {
  store.items.update(new Item({
    qty: Math.floor(Math.random() * 20) + 1,
    locationId: props.room?.id,
    locationStore: 'rooms',
  }))
}
</script>
