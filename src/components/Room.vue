<template>
  <n-card style="opacity: .98">
    <div class="flex flex-column h-100">
      <div class="flex flex-column">
        <div class="top flex self-center relative w-100">
          <Server
            v-if="store.player.isConnectedToServer"
            :value="store.player.server"
          />

          <Dialog
            v-else-if="store.player.isInDialog"
            :value="store.player.dialog"
          />

          <Combat
            v-else-if="store.player.isInCombat"
            :value="store.player.combat"
          />

          <img v-else-if="value.img"
            class="image"
            :src="value.img"
            :alt="value.img"
          />
        </div>

        <div class="flex ph1 mv2 items-center justify-between title-bar">
          <span>{{ value?.name }}</span>
          <span>{{ store.game.dayString }}</span>
        </div>

        <div class="flex flex-wrap items-center mb1">
          <span class="yellow mr2">YOU SEE:</span>

          <span
            v-for="npc in npcs"
            :key="npc.id"
            class="inline mr1"
          >
            <Npc :value="npc" />
          </span>

          <span
            v-for="item in items"
            :key="item.id"
            class="inline mr1"
          >
            <Item :value="item" />
          </span>
        </div>

        <div class="flex flex-wrap items-center mb1">
          <span class="yellow mr2">EXITS:</span>

          <span
            v-for="door in doors"
            :key="door.id"
            class="inline mr1"
          >
            <Door :value="door" />
          </span>
        </div>

        <div
          v-for="container in value.openedContainers"
          :key="container.id"
          class="flex flex-wrap items-center mb1"
        >
          <v-icon :icon="icons[container.icon]" width="16" />

          <span class="yellow mh2">{{ container.name }}:</span>

          <span
            v-for="item in container.items"
            :key="item.id"
            class="inline mr1"
          >
            <Item :value="item" />
          </span>
        </div>

        <div class="flex divider mb3" />
      </div>

      <div class="relative flex h-100">
        <img
          class="screen"
          src="/images/screen.png"
          alt="screen"
        />
        <div ref="scroller" class="scrollable">
          <Log @change="logsChanged" />
        </div>
        <img
          class="glare"
          src="/images/glare.png"
          alt="glare"
        />
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import Log from '@/components/Log.vue'
import Door from '@/components/Door.vue'
import Npc from '@/components/Npc.vue'
import Item from '@/components/Item.vue'
import Server from '@/components/Server.vue'
import Dialog from '@/components/Dialog.vue'
import Combat from '@/components/Combat.vue'
import { store } from '@/store'
import icons from '@/icons'

const scroller = ref()

const props = defineProps({
  value: { type: Object },
})

const items = computed(() => props.value?.items || [])
const npcs = computed(() => (props.value?.npcs || []).filter(npc => !npc.isDead))
const doors = computed(() => props.value?.doors || [])

const logsChanged = () => {
  setTimeout(() => {
    if (scroller?.value) {
      scroller.value.scrollTop = scroller.value.scrollHeight
    }
  }, 100);
}
</script>

<style scoped>
.top {
  min-height: 300px;
}
.image {
  object-fit: cover;
  position: absolute;
  width: 100%;
  height: 100%;
}
.scrollable {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 1em;
}
.title-bar {
  background-color: #4561B4;
  color: #cce;
  height: 24px;
  width: 100%;
  text-shadow: 1px 1px 2px #111;
}
.divider {
  background: transparent;
  border-bottom: 3px dashed #4561B4;
}
.screen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: .1;
  pointer-events: none;
}
.glare {
  position: absolute;
  right: 0;
  top: 0;
  width: 65%;
  opacity: .35;
  z-index: 1;
  pointer-events: none;
}
</style>
