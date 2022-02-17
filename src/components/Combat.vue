<template>
  <div class="flex w-100" style="height: 300px;">
    <div class="flex flex-column h-100" style="width: 225px; margin-right: 3em;">
      <img
        v-if="value.npc?.img"
        style="max-height: 258px;"
        :src="value.npc.img"
        :alt="value.npc.img"
      />

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

    <div class="player-side flex flex-column flex-grow-1 items-end">
      <div class="hand flex flex-grow-1 items-end">
        <Action
          v-for="(h, index) in value.hand"
          :key="`hand-${index}`"
          :value="value.getAction(h.name)"
          :selected="value.isSelected(h.id)"
          :kill="h.kill"
          :disabled="!value.isYourTurn"
          @click="toggleSelect(h.id)"
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
          :disabled="!value.isYourTurn"
          type="success"
          tertiary
          @click="execute"
        >
          <span>{{ goButtonLabel }}</span>
        </n-button>

        <n-button
          class="ml2"
          :disabled="!value.isYourTurn"
          type="error"
          tertiary
          @click="retreat"
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

const retreat = () => {
  props.value.attemptRetreat()
}

const execute = () => {
  props.value.execute()
}

const toggleSelect = name => {
  props.value.toggleSelect(name)
}

const goButtonLabel = computed(() => (
  props.value.selected.length > 0 ? 'Execute' : 'End Turn'
))
</script>

<style scoped>
.hand {
  margin-left: 3em;
}
.ap {
  margin: 0 2px;
  height: 30px;
}
</style>
