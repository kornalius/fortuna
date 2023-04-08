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
              :class="{ active: room === window.store.game.room }"
              :style="styleForRoom(room)"
            >
              <icon
                v-if="room.icon"
                :icon="icons[room.icon]"
                :scale="2"
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
import icons from '@/icons'

const { minimapRoomSize, minimapMargins } = window.store.config

const props = defineProps({
  building: { type: Object },
})

const container = ref()

const rooms = computed(() => (
  window.store.rooms.list.filter(r => r.hasVisited && r.locationId === props.building.id)
))

const style = computed(() => ({
  width: `${window.store.game.minimapWidth + minimapMargins * 2}px`,
  height: `${window.store.game.minimapHeight + minimapMargins * 2}px`,
}))

const styleForRoom = room => ({
  left: `${room.x * minimapRoomSize + minimapMargins}px`,
  top: `${room.y * minimapRoomSize + minimapMargins}px`,
  width: `${minimapRoomSize}px`,
  height: `${minimapRoomSize}px`,
})

onMounted(() => {
  watch(() => window.store.game.room, room => {
    if (room && container?.value) {
      const r = container.value.getBoundingClientRect()
      const x = room.x * minimapRoomSize + minimapMargins - (minimapRoomSize * 0.5)
      const y = room.y * minimapRoomSize + minimapMargins - (minimapRoomSize * 0.5)
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
  background-color: black;
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
