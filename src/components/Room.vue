<template>
  <n-card :title="`Room - ${room?.name}`">
    <div class="flex flex-column h-100">
      <div class="flex flex-column">
        <div class="flex self-center">
          <n-image v-if="room.img"
            style="max-height: 300px;"
            object-fit="cover"
            :src="`/images/rooms/${room.img}`"
          />
        </div>

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

        <h3>Items</h3>

        <n-grid cols="6">
          <n-gi>
            <n-button
              class="mb2"
              type="warning"
              size="small"
              @click="addItem"
            >
              Add Item
            </n-button>
          </n-gi>
        </n-grid>

        <n-grid
          v-for="item in items"
          :key="item.id"
          class="pv1"
          :cols="6"
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
              x
            </n-button>
          </n-gi>
        </n-grid>
      </div>

      <div class="relative flex h-100">
        <div class="scrollable">
          <log />
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed } from 'vue'
import random from 'lodash/random'
import { store } from '@/store'
import Item from '@/classes/items/item'
import Log from '@/components/Log.vue'

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

<style scoped>
.scrollable {
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
</style>
