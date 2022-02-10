<template>
  <n-card>
    <div class="flex flex-column h-100">
      <div class="flex flex-column">
        <div class="flex self-center relative w-100" style="height: 300px;">
          <server
            v-if="store.player.isConnectedToServer"
            :value="store.player.server"
          />

          <img v-else-if="value.img"
            class="image"
            :src="`/images/rooms/${value.img}`"
            :alt="value.img"
          />
        </div>

        <div class="flex ph1 mv2 items-center title-bar">
          {{ value?.name }}
        </div>

        <div class="flex items-center mb2">
          <span class="yellow mr2">YOU SEE:</span>

          <span
            v-for="item in items"
            :key="item.id"
            class="inline mr1"
          >
            <item :value="item" />
          </span>
        </div>

        <div class="flex items-center mb3">
          <span class="yellow mr2">EXITS:</span>

          <span
            v-for="door in doors"
            :key="door.id"
            class="inline mr1"
          >
            <door :value="door" />
          </span>
        </div>

        <div class="flex divider mb3" />
      </div>

      <div class="relative flex h-100">
        <div ref="scroller" class="scrollable">
          <log @change="logsChanged" />
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import Log from '@/components/Log.vue'
import Door from '@/components/Door.vue'
import Item from '@/components/Item.vue'
import Server from '@/components/Server.vue'
import { store } from '@/store'

const scroller = ref()

const props = defineProps({
  value: { type: Object },
})

const items = computed(() => props.value?.items || [])
const doors = computed(() => props.value?.doors || [])

const logsChanged = () => {
  if (scroller?.value) {
    setTimeout(() => {
      scroller.value.scrollTop = scroller.value.scrollHeight
    }, 100);
  }
}
</script>

<style scoped>
.image {
  object-fit: cover;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.scrollable {
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.title-bar {
  background-color: #4561B4;
  color: #111;
  height: 24px;
  width: 100%;
}
.divider {
  background: transparent;
  border-bottom: 3px dashed #4561B4;
}
</style>
