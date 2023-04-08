<template>
  <n-card style="opacity: .95">
    <div>
      <div class="flex w-100">
        <div class="flex w-33 justify-center" />
        <div class="flex w-33 justify-center">
          <equipment-slot :value="head" :type="EquipableSlots.HEAD" :disabled="disabled" />
        </div>
        <div class="flex w-33 justify-start">
          <equipment-slot :value="eyes" :type="EquipableSlots.EYES" :disabled="disabled" />
        </div>
      </div>

      <div class="flex w-100">
        <div class="flex w-33 justify-center" />
        <div class="flex w-33 justify-center">
          <equipment-slot :value="torso" :type="EquipableSlots.TORSO" :disabled="disabled" />
        </div>
        <div class="flex w-33 justify-start">
          <equipment-slot :value="hands" :type="EquipableSlots.HANDS" :disabled="disabled" />
        </div>
      </div>

      <div class="flex w-100">
        <div class="flex w-33 justify-end">
          <equipment-slot :value="waist" :type="EquipableSlots.WAIST" :disabled="disabled" />
        </div>
        <div class="flex w-33 justify-center">
          <equipment-slot :value="legs" :type="EquipableSlots.LEGS" :disabled="disabled" />
        </div>
        <div class="flex w-33 justify-start">
          <equipment-slot :value="feet" :type="EquipableSlots.FEET" :disabled="disabled" />
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed } from 'vue'
import { EquipableSlots } from '@/mixins/equipable'
import EquipmentSlot from '@/components/EquipmentSlot'

const props = defineProps({
  disabled: { type: Boolean },
})

const head = computed(() => window.store.player.equippedInSlot(EquipableSlots.HEAD))
const eyes = computed(() => window.store.player.equippedInSlot(EquipableSlots.EYES))
const torso = computed(() => window.store.player.equippedInSlot(EquipableSlots.TORSO))
const waist = computed(() => window.store.player.equippedInSlot(EquipableSlots.WAIST))
const hands = computed(() => window.store.player.equippedInSlot(EquipableSlots.HANDS))
const legs = computed(() => window.store.player.equippedInSlot(EquipableSlots.LEGS))
const feet = computed(() => window.store.player.equippedInSlot(EquipableSlots.FEET))
</script>
