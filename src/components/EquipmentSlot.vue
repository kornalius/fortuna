<template>
  <div class="slot">
    <item
      v-if="value"
      :value="value"
      :disabled="disabled"
      hide-label
    />

    <icon
      v-else
      :icon="icons[EquipableIcons[props.type]]"
      :scale="2"
    />
  </div>
</template>

<script setup>
import { EquipableIcons } from '@/mixins/equipable'
import Icon from '@/components/Icon'
import Item from '@/components/Item.vue'
import icons from '@/icons'

const props = defineProps({
  value: { type: Object },
  type: { type: String },
  disabled: { type: Boolean },
})
</script>

<style scoped>
.slot {
  padding: 4px;
  margin: 2px;
  border: 2px solid gray;
  border-radius: 4px;
}
</style>
