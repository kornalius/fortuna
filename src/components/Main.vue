<template>
  <div class="flex justify-center w-100 h-100">
    <n-modal :show="store.game.showKeypad" role="dialog" aria-modal="true">
      <Keypad class="fade-in" :value="store.game.keypad" title="SECURITY DOOR SYSTEM" />
    </n-modal>

    <n-modal v-model:show="store.game.showProvince" role="dialog" aria-modal="true">
      <Province class="fade-in" />
    </n-modal>

    <n-modal v-model:show="store.game.showCityMap" role="dialog" aria-modal="true">
      <CityMap class="fade-in" :value="store.game.city" />
    </n-modal>

    <n-modal :show="store.game.showLevelUp" role="dialog" aria-modal="true">
      <LevelUp class="fade-in" :value="store.player.levelUpPoints"/>
    </n-modal>

    <img src="/images/menu-background.png" class="background-image" alt="menu-background.png" />

    <div class="flex h-100">
      <div class="flex flex-column w-100" style="width: 1000px;">
        <div class="flex h-100">
          <Room
            v-if="store.game.room"
            :value="store.game.room"
            :disabled="disabled"
          />
        </div>
      </div>

      <div class="flex flex-column">
        <Stats />

        <div class="flex h-100">
          <Inventory :disabled="disabled" />
        </div>

        <MiniMap :building="store.game.building" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '@/store'
import Room from './Room.vue'
import Stats from './Stats.vue'
import Inventory from './Inventory.vue'
import MiniMap from './MiniMap.vue'
import Province from '@/components/Province.vue'
import CityMap from '@/components/CityMap.vue'
import LevelUp from '@/components/LevelUp.vue'
import Keypad from '@/components/Keypad.vue'

const disabled = computed(() => (
  store.player.isTravelling
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
