<template>
  <n-card :title="`Room - ${room?.name}`">
    <div class="flex flex-column h-100">
      <div class="flex flex-column">
        <div class="flex self-center relative">
          <door v-if="northDoor" :door="northDoor" position="north" />
          <door v-if="southDoor" :door="southDoor" position="south" />
          <door v-if="eastDoor" :door="eastDoor" position="east" />
          <door v-if="westDoor" :door="westDoor" position="west" />

          <n-image v-if="room.img"
            style="max-height: 300px;"
            object-fit="cover"
            :src="`/images/rooms/${room.img}`"
          />
        </div>

        <h3>Items</h3>

        <n-grid cols="6">
          <n-gi>
            <n-button
              class="mb2"
              type="warning"
              size="small"
              @click="() => room.addItem({ qty: random(20) })"
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
import Log from '@/components/Log.vue'
import Door from '@/components/Door.vue'

const props = defineProps({
  room: { type: Object },
})

const items = computed(() => props.room?.items || [])
const doors = computed(() => props.room?.doors || [])

const northDoor = computed(() => props.room?.northDoor)
const southDoor = computed(() => props.room?.southDoor)
const eastDoor = computed(() => props.room?.eastDoor)
const westDoor = computed(() => props.room?.westDoor)
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
