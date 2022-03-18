<template>
  <div class="flex flex-column flex-grow-1 items-center">
    <div style="height: 60px">
      <span class="multiplier">
        X {{ multiplier }}
      </span>
    </div>

    <div class="flex relative h-100 items-center">
      <Die
        v-for="(die, index) in value"
        :key="`player-die-${index}`"
        :class="`player-die-${index}`"
        :faces="die.faces"
        :face="die.value"
        :selected="isSelected(index)"
        :done="isDone(index)"
        @click="isSelectable(index) && toggleSelect(index)"
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
</template>

<script setup>
import { computed } from 'vue'
import Die from '@/components/Die.vue'

const props = defineProps({
  // dice { .faces, .value }
  value: { type: Array },
  disabled: { type: Boolean },
  // is the die selected
  isSelected: { type: Function },
  // if die is selectable
  isSelectable: { type: Function },
  // toggle select for a die
  toggleSelect: { type: Function },
  // is the processing of the die done (after an endTurn)
  isDone: { type: Function },
  // if re-rolling the dice is allowed
  canReroll: { type: Boolean },
  // number of rolls left
  rolls: { type: Number },
  // reroll function
  reroll: { type: Function },
  // end of turn function
  endTurn: { type: Function },
  // current multiplier
  multiplier: { type: Number },
})

const executeOrRerollLabel = computed(() => (
  props.canReroll ? `Reroll (${props.rolls})` : 'End Turn'
))

const executeOrReroll = async () => {
  if (props.canReroll) {
    return props.reroll()
  }
  return props.endTurn()
}
</script>

<style scoped>
.multiplier {
  font-size: 40px;
  opacity: 0;
  scale: 0;
  text-shadow: #333 1px 1px 4px;
  z-index: 2;
}
</style>
