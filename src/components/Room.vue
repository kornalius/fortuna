<template>
  <v-card>
    <v-card-title>
      Room - {{ room?.name }}
    </v-card-title>

    <v-card-text class="pa-0">
      <v-container class="mx-0">
        <h3>Doors</h3>

        <v-row v-for="door in doors" :key="door.id">
          <v-col cols="auto">
            {{ door.name }} {{ door.qty }} [{{ door.isOpened }}]
          </v-col>
          <v-col>
            <v-btn
              size="x-small"
              @click="door.toggle()"
            >
              {{ door.isOpened ? 'CLOSE' : 'OPEN' }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="mx-0">
        <h3>Items</h3>

        <v-btn size="small" @click="addItem">Add Item</v-btn>

        <v-row v-for="item in items" :key="item.id">
          <v-col cols="auto">
            {{ item.name }} ({{ item.qty }})
          </v-col>
          <v-col>
            <v-btn size="x-small" @click="item.remove()">X</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '../store';
import Item from '../classes/items/item';
import random from 'lodash/random'

const props = defineProps({
  room: { type: Object },
})

const items = computed(() => props.room?.items || [])
const doors = computed(() => props.room?.doors || [])

const addItem = () => {
  store.items.update(new Item({
    qty: random(20),
    locationId: props.room?.id,
    locationStore: 'rooms',
  }))
}
</script>
