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
            <icon
              :icon="icons.str"
              color="#DAA02B"
              :scale="1.5"
            />

            <span class="ml2">{{ window.store.player.str }}</span>

            <n-button-group class="ml3" size="small">
              <n-button @click="decrement('str')">-</n-button>
              <n-button @click="increment('str')">+</n-button>
            </n-button-group>
          </div>

          <div class="inline flex items-center">
            <icon
              :icon="icons.dex"
              :scale="1.5"
            />

            <span class="ml2">{{ window.store.player.dex }}</span>

            <n-button-group class="ml3" size="small">
              <n-button @click="decrement('dex')">-</n-button>
              <n-button @click="increment('dex')">+</n-button>
            </n-button-group>
          </div>

          <div class="inline flex items-center">
            <icon
              :icon="icons.int"
              :scale="1.5"
            />

            <span class="ml2">{{ window.store.player.int }}</span>

            <n-button-group class="ml3" size="small">
              <n-button @click="decrement('int')">-</n-button>
              <n-button @click="increment('int')">+</n-button>
            </n-button-group>
          </div>
        </div>
      </template>

      <span>STR: {{ window.store.player.str}}, </span>
      <span>DEX: {{ window.store.player.dex }}, </span>
      <span>INT: {{ window.store.player.int }}, </span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center mb3" style="color: #b44;">
          <icon
            class="mr1"
            :icon="icons.heart"
            :scale="1.5"
          />

          <span class="ml2">{{ window.store.player.maxHp }}</span>

          <n-button-group class="ml3" size="small">
            <n-button @click="decrement('extraHp')">-</n-button>
            <n-button @click="increment('extraHp')">+</n-button>
          </n-button-group>
        </div>
      </template>

      <span>HP: {{ window.store.player.maxHp }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center mb3" style="color: #2293E1;">
          <icon
            class="mr1"
            :icon="icons.harddrive"
            :scale="1.5"
          />

          <span class="ml2">{{ window.store.player.disk }}</span>

          <n-button-group class="ml3" size="small">
            <n-button @click="decrement('disk', 500)">-</n-button>
            <n-button @click="increment('disk', 500)">+</n-button>
          </n-button-group>
        </div>
      </template>

      <span>[DISK] Used: {{ window.store.player.diskUsed }}, Free: {{ window.store.player.diskFree }}, Total: {{ window.store.player.disk }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center mb3" style="color: #CBE54A;">
          <icon
            class="mr1"
            :icon="icons.cpu"
            color="#CBE54A"
            :scale="1.5"
          />

          <span class="ml2">{{ window.store.player.ram }}</span>

          <n-button-group class="ml3" size="small">
            <n-button @click="decrement('ram', 100)">-</n-button>
            <n-button @click="increment('ram', 100)">+</n-button>
          </n-button-group>
        </div>
      </template>

      <span>[RAM] Used: {{ window.store.player.ramUsed }}, Free: {{ window.store.player.ramFree }}, Total: {{ window.store.player.ram }}</span>
    </n-popover>

    <div class="flex w-100 mt3 justify-end">
<!--      <n-button type="error" @click="cancel">Cancel</n-button>-->
      <n-button type="primary" :disabled="pointsLeft > 0" @click="confirm">Confirm</n-button>
    </div>
  </n-card>
</template>

<script setup>
import { ref, watch } from 'vue'
import icons from '@/icons'

const props = defineProps({
  value: { type: Number, default: 0 },
})

const pointsLeft = ref()

watch(() => props.value, newValue => {
  pointsLeft.value = newValue
}, { immediate: true })

const origStats = {}

const decrement = (stat, by = 1) => {
  if (origStats[stat] === undefined) {
    origStats[stat] = window.store.player[stat]
  }
  if (window.store.player[stat] - 1 >= origStats[stat]) {
    window.store.player[stat] -= by
    pointsLeft.value += 1
  }
}

const increment = (stat, by = 1) => {
  if (origStats[stat] === undefined) {
    origStats[stat] = window.store.player[stat]
  }
  if (pointsLeft.value > 0) {
    window.store.player[stat] += by
    pointsLeft.value -= 1
  }
}

watch(() => window.store.player.maxHp, newValue => {
  window.store.player.hp = newValue
})

// const cancel = () => {
//   Object.keys(origStats).forEach(k => {
//     window.store.player[k] = origStats[k]
//   })
//   window.store.game.showLevelUp = true
// }

const confirm = () => {
  window.store.game.showLevelUp = false
}
</script>

<style scoped>
</style>
