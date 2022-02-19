<template>
  <div class="flex w-100" style="height: 300px; overflow: hidden;">
    <span class="turn-label">{{ turnLabel }}</span>

    <div class="flex flex-column h-100" style="width: 225px; margin-right: 3em;">
      <div class="relative">
        <img
          v-if="value.npc?.img"
          style="max-height: 258px;"
          :src="value.npc.img"
          :alt="value.npc.img"
        />
        <div class="hit relative">
          <img
            src="/images/hit-effect.png"
            alt="hit-effect"
          />
          <span class="hit-label">18</span>
        </div>
      </div>

      <div class="flex flex-grow-1">
        <n-popover trigger="hover" placement="bottom">
          <template #trigger>
            <div class="flex flex-grow-1 items-center mb1" style="color: #b44;">
              <v-icon class="mr1" icon="mdi:cards-heart" width="24" />
              <n-progress
                type="line"
                status="error"
                border-radius="12px 0 12px 0"
                fill-border-radius="12px 0 12px 0"
                :percentage="value.npc.hp / value.npc.maxHp * 100"
                :height="8"
                :show-indicator="false"
              />
            </div>
          </template>
          <span>HP: {{ value.npc.hp }} / {{ value.npc.maxHp }}</span>
        </n-popover>

        <n-popover trigger="hover" placement="bottom">
          <template #trigger>
            <div class="action-points ml2 flex items-center justify-center">
              <v-icon
                v-for="(_, index) in npcAp"
                :key="`${index}-${value.npc.id}`"
                class="ap"
                :icon="index < value.npc.ap ? 'fa:dot-circle-o' : 'fa:circle-o'"
                width="16"
                height="16"
              />
            </div>
          </template>
          <span>AP: {{ value.npc.ap }} / {{ value.npc.maxAp }}</span>
        </n-popover>
      </div>
    </div>

    <div class="flex flex-grow-1" />

    <div class="player-side flex flex-column flex-grow-1 items-end relative">
      <div class="hand flex flex-grow-1 items-end">
        <Action
          v-for="h in value.hand"
          :key="`hand-card-${h.id}`"
          :value="h"
          :combat="value"
          :selected="value.isSelected(h.id)"
          :disabled="disabled"
          @click="(id) => value.toggleSelect(id)"
        />
      </div>

      <div class="actions flex w-100 pv1">
        <n-popover trigger="hover" placement="bottom">
          <template #trigger>
            <div class="action-points flex items-center justify-center w-100">
              <v-icon
                v-for="(_, index) in playerAp"
                :key="`${index}-${store.player.id}`"
                class="ap"
                :icon="index < store.player.ap ? 'fa:dot-circle-o' : 'fa:circle-o'"
                width="16"
                height="16"
              />
            </div>
          </template>
          <span>AP: {{ store.player.ap }} / {{ store.player.maxAp }}</span>
        </n-popover>

        <n-button
          :disabled="disabled"
          type="success"
          tertiary
          @click="() => value.execute()"
        >
          <span>{{ goButtonLabel }}</span>
        </n-button>

        <n-button
          class="ml2"
          :disabled="disabled"
          type="error"
          tertiary
          @click="() => value.attemptRetreat()"
        >
          <span>Retreat</span>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '@/store'
import Action from '@/components/Action.vue'

const props = defineProps({
  value: { type: Object },
})

const npcAp = computed(() => new Array(props.value.npc.maxAp).fill(''))
const playerAp = computed(() => new Array(store.player.maxAp).fill(''))

const turnLabel = computed(() => (
  !props.value.isYourTurn ? 'Opponent\'s Turn' : 'Your Turn'
))

const goButtonLabel = computed(() => (
  props.value.selected.length > 0 ? 'Execute' : 'End Turn'
))

const disabled = computed(() => !props.value.isYourTurn || props.value.isAnimatingTurn)
</script>

<style scoped>
.hand {
  margin-left: 3em;
}
.ap {
  margin: 0 2px;
  height: 30px;
}
.turn-label {
  pointer-events: none;
  font-size: 48px;
  color: #F19936;
  text-shadow: #333 2px 2px 8px;
  text-align: center;
  position: absolute;
  top: 40%;
  left: 0;
  width: 100%;
  z-index: 1;
  opacity: 0;
}
.hit {
  position: absolute;
  top: 15%;
  left: 0;
  opacity: 0;
  z-index: 1;
}
.hit-label {
  position: absolute;
  top: 35%;
  left: 0;
  text-align: center;
  width: 100%;
  color: #D12E2E;
  font-size: 32px;
  text-shadow: #333 1px 1px 4px;
  z-index: 2;
}
</style>
