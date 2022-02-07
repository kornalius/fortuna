<template>
  <n-card>
    <div class="container">
      <div ref="scroller" :style="style">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="room flex items-center justify-center"
          :class="{ active: room === store.game.room }"
          :style="styleForRoom(room)"
        >
          <v-icon
            v-if="room.icon"
            :icon="room.icon"
            width="32"
            color="white"
          />

          <div v-if="room.northDoor" class="north door" />
          <div v-if="room.southDoor" class="south door" />
          <div v-if="room.eastDoor" class="east door" />
          <div v-if="room.westDoor" class="west door" />
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed, watch } from 'vue'
import { store } from '@/store'

const rooms = computed(() => store.rooms.list.filter(r => r.visited > 0))
const doors = computed(() => store.doors.list)

const style = computed(() => ({
  width: `${store.game.minimapWidth + store.config.minimapMargins * 2}px`,
  height: `${store.game.minimapHeight + store.config.minimapMargins * 2}px`,
}))

const gameRoom = computed(() => store.game.room)

const styleForRoom = room => ({
  left: `${room.x * store.config.minimapRoomSize + store.config.minimapMargins}px`,
  top: `${room.y * store.config.minimapRoomSize + store.config.minimapMargins}px`,
  width: `${store.config.minimapRoomSize}px`,
  height: `${store.config.minimapRoomSize}px`,
})

watch(gameRoom, () => {

}, { immediate: true })
</script>

<style scoped>
.container {
  position: relative;
  overflow: auto;
  width: 200px;
  height: 200px;
}
.room {
  position: absolute;
  border: 1px solid white;
}
.door {
  position: absolute;
  background-color: white;
  transform-origin: center;
}
.active {
  border: 2px solid red;
}
.north {
  width: 12px;
  height: 4px;
  top: -2px;
  left: 33%;
}
.south {
  width: 12px;
  height: 4px;
  bottom: -2px;
  left: 33%;
}
.east {
  width: 4px;
  height: 12px;
  right: -2px;
  top: 25%;
}
.west {
  width: 4px;
  height: 12px;
  left: -2px;
  top: 25%;
}
</style>
