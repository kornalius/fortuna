<template>
  <n-card style="opacity: .95; width: 500px;">
    <div class="flex items-center justify-between mb3">
      <span>Level up...</span>
      <span>{{ pointsLeft }} points left</span>
    </div>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center justify-between mb3" style="color: #ff0;">
          <div class="inline flex items-center">
            <v-icon icon="mdi:arm-flex" color="#DAA02B" width="24" />
            <span class="ml2">{{ store.player.str }}</span>
            <n-button-group class="ml3" size="small">
              <n-button @click="decrement('str')">-</n-button>
              <n-button @click="increment('str')">+</n-button>
            </n-button-group>
          </div>

          <div class="inline flex items-center">
            <v-icon icon="fxemoji:running" width="24" />
            <span class="ml2">{{ store.player.dex }}</span>
            <n-button-group class="ml3" size="small">
              <n-button @click="decrement('dex')">-</n-button>
              <n-button @click="increment('dex')">+</n-button>
            </n-button-group>
          </div>

          <div class="inline flex items-center">
            <v-icon icon="noto:brain" width="24" />
            <span class="ml2">{{ store.player.int }}</span>
            <n-button-group class="ml3" size="small">
              <n-button @click="decrement('int')">-</n-button>
              <n-button @click="increment('int')">+</n-button>
            </n-button-group>
          </div>
        </div>
      </template>

      <span>STR: {{ store.player.str}}, </span>
      <span>DEX: {{ store.player.dex }}, </span>
      <span>INT: {{ store.player.int }}, </span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center mb3" style="color: #b44;">
          <v-icon class="mr1" icon="mdi:cards-heart" width="24" />
          <span class="ml2">{{ store.player.maxHp }}</span>
          <n-button-group class="ml3" size="small">
            <n-button @click="decrement('extraHp')">-</n-button>
            <n-button @click="increment('extraHp')">+</n-button>
          </n-button-group>
        </div>
      </template>

      <span>HP: {{ store.player.maxHp }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center mb3" style="color: #2293E1;">
          <v-icon class="mr1" icon="whh:harddrivealt" width="24" />
          <span class="ml2">{{ store.player.disk }}</span>
          <n-button-group class="ml3" size="small">
            <n-button @click="decrement('disk', 500)">-</n-button>
            <n-button @click="increment('disk', 500)">+</n-button>
          </n-button-group>
        </div>
      </template>

      <span>[DISK] Used: {{ store.player.diskUsed }}, Free: {{ store.player.diskFree }}, Total: {{ store.player.disk }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center mb3" style="color: #CBE54A;">
          <v-icon class="mr1" icon="whh:cpualt" width="24" color="#CBE54A" />
          <span class="ml2">{{ store.player.ram }}</span>
          <n-button-group class="ml3" size="small">
            <n-button @click="decrement('ram', 100)">-</n-button>
            <n-button @click="increment('ram', 100)">+</n-button>
          </n-button-group>
        </div>
      </template>

      <span>[RAM] Used: {{ store.player.ramUsed }}, Free: {{ store.player.ramFree }}, Total: {{ store.player.ram }}</span>
    </n-popover>

    <div class="flex w-100 mt3 justify-end">
<!--      <n-button type="error" @click="cancel">Cancel</n-button>-->
      <n-button type="primary" @click="confirm">Confirm</n-button>
    </div>
  </n-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import { store } from '@/store'

const props = defineProps({
  value: { type: Number, default: 5 },
})

const pointsLeft = ref()

watch(() => props.value, newValue => {
  pointsLeft.value = newValue
}, { immediate: true })

const origStats = {}

const decrement = (stat, by = 1) => {
  if (origStats[stat] === undefined) {
    origStats[stat] = store.player[stat]
  }
  if (store.player[stat] - 1 >= origStats[stat]) {
    store.player[stat] -= by
    pointsLeft.value += 1
  }
}

const increment = (stat, by = 1) => {
  if (origStats[stat] === undefined) {
    origStats[stat] = store.player[stat]
  }
  if (pointsLeft.value > 0) {
    store.player[stat] += by
    pointsLeft.value -= 1
  }
}

watch(() => store.player.maxHp, newValue => {
  store.player.hp = newValue
})

// const cancel = () => {
//   Object.keys(origStats).forEach(k => {
//     store.player[k] = origStats[k]
//   })
//   store.game.showLevelUp = true
// }

const confirm = () => {
  store.game.showLevelUp = false
}
</script>

<style scoped>
</style>
