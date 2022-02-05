<template>
  <n-card :title="`Room - ${room?.name}`">
    <div class="pa2">
      <h3>Doors</h3>

      <n-grid
        v-for="door in doors"
        :key="door.id"
        cols="4"
      >
        <n-gi>
          {{ door.name }} {{ door.qty }} [{{ door.isOpened }}] [{{ door.isLocked }}]
        </n-gi>
        <n-gi>
          <n-button
            type="info"
            size="tiny"
            @click="door.toggle()"
          >
            {{ door.isOpened ? 'CLOSE' : 'OPEN' }}
          </n-button>

          <n-button
            class="ml2"
            type="info"
            size="tiny"
            @click="door.unlock()"
          >
            {{ door.isLocked ? 'UNLOCK' : 'LOCK' }}
          </n-button>
        </n-gi>
      </n-grid>
    </div>

    <div class="ma2">
      <h3>Items</h3>

      <n-button
        class="mb2"
        type="warning"
        size="small"
        @click="addItem"
      >
        Add Item
      </n-button>

      <n-grid
        v-for="item in items"
        :key="item.id"
        cols="6"
      >
        <n-gi>
          {{ item.name }} ({{ item.qty }})
        </n-gi>
        <n-gi>
          <n-button
            type="error"
            size="tiny"
            secondary
            round
            @click="item.remove()"
          >
            X
          </n-button>
        </n-gi>
      </n-grid>
    </div>
  </n-card>
</template>

<script setup>
import { computed } from 'vue'
import random from 'lodash/random'
import { store } from '@/store'
import Item from '@/classes/items/item'

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
