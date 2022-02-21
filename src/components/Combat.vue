<template>
  <div class="flex w-100" style="height: 300px; overflow: hidden;">
    <div class="flex flex-column h-100" style="max-width: 228px">
      <div class="relative">
        <img
          v-if="value.npc?.img"
          style="max-height: 228px;"
          :src="value.npc.img"
          :alt="value.npc.img"
        />
        <div class="npc-hit relative">
          <img
            src="/images/hit-effect.png"
            alt="hit-effect"
          />
          <span class="npc-hit-label">0</span>
        </div>
      </div>

      <n-popover trigger="hover" placement="bottom">
        <template #trigger>
          <div class="flex flex-grow-1 items-center" style="color: #b44;">
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

      <div class="flex relative items-center">
        <Die
          v-for="(die, index) in store.player.combat.npc.dice"
          :key="`npc-die-${index}`"
          :class="`npc-die-${index}`"
          :faces="die.faces"
          :face="die.value"
          size="small"
        />
      </div>
    </div>

    <div class="flex flex-grow-1" />

    <div class="player-side flex flex-column flex-grow-1 relative">
      <div class="flex relative h-100 items-center">
        <Die
          v-for="(die, index) in store.player.dice"
          :key="`player-die-${index}`"
          :class="`player-die-${index}`"
          :faces="die.faces"
          :face="die.value"
          :selected="store.player.combat.isSelected(index)"
          @click="store.player.combat.toggleSelect(index)"
        />
      </div>

      <div class="actions flex w-100 pv1">
        <n-popover trigger="hover" placement="bottom">
          <template #trigger>
            <div class="flex items-center w-100">
              <v-icon
                v-for="(_, index) in playerShields"
                :key="`${index}-${store.player.id}`"
                class="shield"
                :icon="index < store.player.shields ? 'bxs:shield' : 'ci:dot-02-s'"
                width="24"
                height="24"
              />
            </div>
          </template>
          <span>Defense: {{ store.player.shields }} / {{ store.player.maxShields }}</span>
        </n-popover>

        <n-button
          :disabled="disabled"
          type="success"
          tertiary
          @click="executeOrReroll"
        >
          <span>{{ executeOrRerollLabel }}</span>
        </n-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '@/store'
import Die from '@/components/Die.vue'

const props = defineProps({
  value: { type: Object },
})

const playerShields = computed(() => new Array(store.player.maxShields).fill(''))

const disabled = computed(() => false)

const canReroll = computed(() => store.player.combat.canReroll())

const executeOrRerollLabel = computed(() => (
  canReroll.value ? 'Reroll' : 'End Turn'
))

const executeOrReroll = async () => {
  if (canReroll.value) {
    return store.player.combat.reroll()
  }
  return store.player.combat.endTurn()
}
</script>

<style scoped>
.shield {
  height: 30px;
  color: #6C852B;
  filter: drop-shadow(2px 1px 1px #ddd);
}
.npc-hit {
  pointer-events: none;
  position: absolute;
  top: 15%;
  left: 0;
  opacity: 0;
  z-index: 1;
}
.npc-hit-label {
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
