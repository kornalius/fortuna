<template>
  <n-card style="opacity: .95; width: 966px; height: 800px;">
    <div ref="container" class="container">
      <div ref="content">
        <img
          style="max-width: none;"
          src="/images/province.png"
          alt="province.png"
          @mousemove="updateCoordinates"
        />

        <template
          v-for="city in cities"
          :key="city.id"
          v-show="!city.hidden"
        >
          <City
            :style="cityStyle(city)"
            :value="city"
          />
        </template>
      </div>
    </div>

    <span class="coordinates">{{ pos.x }}, {{ pos.y }}</span>
  </n-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { store } from '@/store'
import City from '@/components/City.vue'
import useDrag from '@/composites/drag'

const container = ref()
const content = ref()
const pos = ref({ x: 0, y: 0 })

onMounted(() => {
  useDrag(content.value, container.value)
})

const cityStyle = city => {
  const style = []
  style.push('position: absolute')
  style.push(`left: ${city.x}px`)
  style.push(`top: ${city.y}px`)
  style.push('line-height: 1.25em')
  style.push('max-width: 100px')
  style.push('padding: 14px')
  style.push('height: unset')
  return style.join('; ')
}

const cities = computed(() => store.cities.list)

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
  width: 926px;
  height: 758px;
}
.coordinates {
  position: absolute;
  right: 24px;
  bottom: -4px;
}
</style>
