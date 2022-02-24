<template>
  <div class="flex w-100" style="height: 300px; overflow: hidden; opacity: .95;">
    <img v-if="value.npc.location.img"
      class="image"
      :src="value.npc.location.img"
      :alt="value.npc.location.img"
    />

    <div class="flex flex-column h-100" style="max-width: 228px">
      <div class="relative">
        <img
          v-if="value.npc?.img"
          class="npc-image"
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
          <div class="npc-stats-hp flex flex-grow-1 items-center" style="color: #b44; z-index: 1">
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

    <div class="player-side flex flex-column flex-grow-1 relative ph2">
      <div class="flex flex-column flex-grow-1 items-center">
        <div style="height: 60px">
          <span
            v-if="value.bonus !== 0"
            class="bonus-label"
          >
            {{ value.bonus }}
          </span>
        </div>

        <div class="flex relative h-100 items-center">
          <Die
            v-for="(die, index) in store.player.dice"
            :key="`player-die-${index}`"
            :class="`player-die-${index}`"
            :faces="die.faces"
            :face="die.value"
            :selected="store.player.combat.isSelected(index)"
            :done="store.player.combat.isDone(index)"
            @click="store.player.combat.toggleSelect(index)"
          />
        </div>

        <div class="actions flex justify-end w-100 pv1">
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
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { store } from '@/store'
import Die from '@/components/Die.vue'
import { bleed } from '@/particles'

const props = defineProps({
  value: { type: Object },
})

const disabled = computed(() => props.value.processing)

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

watch(() => props.value.npc.hp, (newValue, oldValue) => {
  if (newValue < oldValue) {
    const r = document.querySelector('.npc-stats-hp').getBoundingClientRect()
   bleed(r.left + (props.value.npc.hp / props.value.npc.maxHp * (r.width - 20)), r.top, {}, bleed)
  }
})
</script>

<style scoped>
.image {
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(10px) brightness(40%);
  z-index: 0;
}
.npc-image {
  border: 8px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to left, #4561B4, #9BA3BD);
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
.bonus-label {
  font-size: 30px;
}
</style>
