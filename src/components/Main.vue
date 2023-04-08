<template>
  <div class="flex justify-center w-100 h-100">
    <n-modal :show="window.store.game.showKeypad" role="dialog" aria-modal="true">
      <Keypad class="fade-in" :value="window.store.game.keypad" title="SECURITY DOOR SYSTEM" />
    </n-modal>

    <n-modal v-model:show="window.store.game.showProvince" role="dialog" aria-modal="true">
      <Province class="fade-in" />
    </n-modal>

    <n-modal v-model:show="window.store.game.showCityMap" role="dialog" aria-modal="true">
      <CityMap class="fade-in" :value="window.store.game.city" />
    </n-modal>

    <n-modal :show="window.store.game.showLevelUp" role="dialog" aria-modal="true">
      <LevelUp class="fade-in" :value="window.store.player.levelUpPoints"/>
    </n-modal>

    <img src="/images/menu-background.png" class="background-image" alt="menu-background.png" />

    <div class="flex h-100">
      <div class="flex flex-column w-100" style="width: 1000px;">
        <div class="flex h-100">
          <Room
            v-if="window.store.game.room"
            :value="window.store.game.room"
            :disabled="disabled"
          />
        </div>
      </div>

      <div class="flex flex-column">
        <Stats />

        <div class="flex h-100">
          <Inventory :disabled="disabled" />
        </div>

        <MiniMap :building="window.store.game.building" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Room from './Room.vue'
import Stats from './Stats.vue'
import Inventory from './Inventory.vue'
import MiniMap from './MiniMap.vue'
import Province from '@/components/Province.vue'
import CityMap from '@/components/CityMap.vue'
import LevelUp from '@/components/LevelUp.vue'
import Keypad from '@/components/Keypad.vue'

const disabled = computed(() => (
  window.store.player.isTravelling
))
</script>

<style scoped>
.background-image {
  object-fit: fill;
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
