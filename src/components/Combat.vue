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
        <div class="freezes">
          <icon
            v-for="i of freezes"
            :key="`freeze-${i}`"
            class="mr1"
            :icon="icons.freeze"
            :scale="2.5"
          />
        </div>
      </div>

      <n-popover trigger="hover" placement="bottom">
        <template #trigger>
          <div class="npc-stats-hp flex flex-grow-1 items-center" style="color: #b44; z-index: 1">
            <icon
              class="mr1"
              :icon="icons.heart"
              :scale="2"
            />

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
    </div>

    <div class="flex flex-column relative items-center ml2">
      <Die
        v-for="(die, index) in store.player.combat.npc.dice"
        :key="`npc-die-${index}`"
        :class="`npc-die-${index}`"
        :faces="die.faces"
        :face="die.value"
        size="small"
      />
    </div>

    <div class="flex flex-grow-1" />

    <div class="combos flex flex-column relative">
      <span class="mb1 ml1">COMBOS:</span>

      <template
        v-for="(combo, ci) in combos"
        :key="`combo-${ci}`"
      >
        <div
          class="combo flex items-center ph1 mb1"
          :class="{ active: value.activeCombo(combo) }"
        >
          <div class="flex">
            <Die
              v-for="(die, index) in value.comboDice(combo)"
              :key="`combo-${ci}-die-${index}`"
              :class="`combo-${ci}-die-${index}`"
              :faces="die.faces"
              :face="die.value"
              size="xsmall"
            />
          </div>
          <span class="mh1">=</span>
          <div class="flex">
            <span>{{ value.comboLabel(combo) }}</span>
          </div>
        </div>
      </template>
    </div>

    <div class="flex flex-grow-1" />

    <div class="player-side flex flex-column flex-grow-1 relative ph2">
      <Dice
        :value="store.player.dice"
        :disabled="disabled"
        :isSelected="index => store.player.combat.isSelected(index)"
        :isSelectable="() => !disabled"
        :isDone="index => store.player.combat.isDone(index)"
        :toggleSelect="index => store.player.combat.toggleSelect(index)"
        :multiplier="currentMultiplier"
        :canReroll="canReroll"
        :rolls="store.player.rolls"
        :reroll="() => store.player.combat.reroll()"
        :endTurn="() => store.player.combat.endTurn()"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { store } from '@/store'
import Die from '@/components/Die.vue'
import Dice from '@/components/Dice.vue'
import { bleed } from '@/particles'
import icons from '@/icons'

const props = defineProps({
  value: { type: Object },
})

const disabled = computed(() => props.value.processing)

const canReroll = computed(() => store.player.combat.canReroll())

watch(() => props.value.npc.hp, (newValue, oldValue) => {
  if (newValue < oldValue) {
    const r = document.querySelector('.npc-stats-hp').getBoundingClientRect()
   bleed(r.left + (props.value.npc.hp / props.value.npc.maxHp * (r.width - 20)), r.top + 8)
  }
})

const freezes = computed(() => new Array(props.value.npc.skipTurns).map((_, i) => i))

const currentMultiplier = computed(() => props.value.currentMultiplier)

const combos = computed(() => [...props.value.combos, ...props.value.bonusCombos])
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
.freezes {
  position: absolute;
  left: 10px;
  bottom: 12px;
  filter: drop-shadow(1px 1px 1px #333);
  animation: freeze 1s ease-in-out infinite alternate;
}
.combo.active {
  border: 2px solid white;
  border-radius: 4px;
  animation: glowing 1s ease-in-out infinite alternate;
}
</style>
