<template>
  <n-card style="opacity: .95">
    <div ref="container" class="container">
      <div :style="style">
        <n-popover
          v-for="room in rooms"
          :key="room.id"
          trigger="hover"
          placement="top"
        >
          <template #trigger>
            <div
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
          </template>
          <span>{{ room.name }}</span>
        </n-popover>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { store } from '@/store'

const container = ref()

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

onMounted(() => {
  watch(gameRoom, () => {
    const { minimapRoomSize, minimapMargins } = store.config
    if (container?.value) {
      const r = container.value.getBoundingClientRect()
      const x = gameRoom.value.x * minimapRoomSize + minimapMargins - (minimapRoomSize * 0.5)
      const y = gameRoom.value.y * minimapRoomSize + minimapMargins - (minimapRoomSize * 0.5)
      container.value.scrollLeft = Math.max(0, x - r.width * 0.5)
      container.value.scrollTop = Math.max(0, y - r.height * 0.5)
    }
  }, { immediate: true })
})
</script>

<style scoped>
.container {
  position: relative;
  overflow: auto;
  width: 260px;
  height: 200px;
}
.room {
  position: absolute;
  border: 2px solid white;
}
.door {
  position: absolute;
  background-color: white;
  transform-origin: center;
}
.active {
  border: 3px solid #F1AF0D;
}
.north {
  width: 12px;
  height: 4px;
  top: -2px;
  left: 8px;
}
.south {
  width: 12px;
  height: 4px;
  bottom: -2px;
  left: 8px;
}
.east {
  width: 4px;
  height: 12px;
  right: -2px;
  top: 8px;
}
.west {
  width: 4px;
  height: 12px;
  left: -2px;
  top: 8px;
}
</style>
