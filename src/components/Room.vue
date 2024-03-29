<template>
  <n-card style="width: 1000px; opacity: .98">
    <div class="flex flex-column h-100">
      <div class="flex flex-column">
        <div class="top flex self-center relative w-100">
          <Server
            v-if="store.player.isConnectedToServer"
            class="fade-in"
            :value="store.player.server"
          />

          <Dialog
            v-else-if="store.player.isInDialog"
            class="fade-in"
            :value="store.player.dialog"
          />

          <Combat
            v-else-if="store.player.isInCombat"
            class="fade-in"
            :value="store.player.combat"
          />

          <Travel
            v-else-if="store.player.isTravelling"
          />

          <img v-else-if="value.img"
            class="image fade-in"
            :src="value.img"
            :alt="value.img"
          />
        </div>

        <div class="flex ph1 mv2 items-center justify-between title-bar">
          <div>
            <span>{{ value?.name }}</span>
            <n-checkbox v-model:checked="showLabels" class="ml3">Show Labels</n-checkbox>
          </div>
          <span>{{ store.game.dayString }}</span>
        </div>

        <div class="flex flex-wrap items-center mb1">
          <span class="yellow mr2">YOU SEE:</span>

          <span
            v-for="npc in npcs"
            :key="npc.id"
            class="inline mr1"
          >
            <Npc
              :value="npc"
              :disabled="isDisabled"
              :hide-label="!showLabels"
            />
          </span>

          <span
            v-for="item in items"
            :key="item.id"
            class="inline mr1"
          >
            <Item
              :value="item"
              :disabled="isDisabled && (!store.player.isConnectedToServer || !item.isServer)"
              :hide-label="!showLabels"
            />
          </span>
        </div>

        <div class="flex flex-wrap items-center mb1">
          <span class="yellow mr2">EXITS:</span>

          <span
            v-for="door in doors"
            :key="door.id"
            class="inline mr1"
          >
            <Door
              :value="door"
              :disabled="isDisabled"
              hide-label
            />
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
import { computed, ref, watch } from 'vue'
import Log from '@/components/Log.vue'
import Door from '@/components/Door.vue'
import Npc from '@/components/Npc.vue'
import Item from '@/components/Item.vue'
import Server from '@/components/Server.vue'
import Dialog from '@/components/Dialog.vue'
import Combat from '@/components/Combat.vue'
import Travel from '@/components/Travel.vue'
import { store } from '@/store'

const scroller = ref()

const props = defineProps({
  value: { type: Object },
  disabled: { type: Boolean },
})

const showLabels = ref(store.game.showLabels)

watch(showLabels, newValue => {
  store.game.showLabels = newValue
})

const items = computed(() => props.value?.items || [])
const npcs = computed(() => (props.value?.npcs || []).filter(npc => !npc.isDead))
const doors = computed(() => props.value?.doors || [])

const isDisabled = computed(() => (
  props.disabled
    || store.player.isConnectedToServer
    || store.player.isInCombat
    || store.player.isInDialog
))

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
  height: 300px;
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
