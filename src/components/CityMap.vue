<template>
  <n-card style="opacity: .95; width: 1000px; height: 800px;">
    <div ref="container" class="container">
      <img
        style="max-width: none;"
        :src="value.img"
        :alt="value.img"
        @mousemove="updateCoordinates"
      />

      <template
        v-for="building in buildings"
        :key="building.id"
        v-show="!building.hidden"
      >
        <Building
          :style="buildingStyle(building)"
          :value="building"
        />
      </template>
    </div>
    <span class="coordinates">{{ pos.x }}, {{ pos.y }}</span>
  </n-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import Building from '@/components/Building.vue'

const props = defineProps({
  value: { type: Object },
  disabled: { type: Boolean },
})

const container = ref()
const pos = ref({ x: 0, y: 0 })

const buildingStyle = building => {
  const style = []
  style.push('position: absolute')
  style.push(`left: ${building.x}px`)
  style.push(`top: ${building.y}px`)
  style.push('line-height: 1.25em')
  style.push('max-width: 100px')
  style.push('padding: 14px')
  style.push('height: unset')
  return style.join('; ')
}

const buildings = computed(() => props.value.buildings)

const updateCoordinates = e => {
  pos.value = {
    x: e.offsetX,
    y: e.offsetY,
  }
}
</script>

<style scoped>
.container {
  position: relative;
  overflow: auto;
  width: 952px;
  height: 752px;
}
.coordinates {
  position: absolute;
  right: 24px;
  bottom: -4px;
}
</style>
