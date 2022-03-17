<template>
  <sprite
    class="flex self-center"
    image="/images/icons.png"
    :json="json"
    :frame="icon"
    :scale-x="scaleX || scale"
    :scale-y="scaleY || scale"
    :offset-x="offsetX"
    :offset-y="offsetY"
    :rotation="rotation"
    :drop-shadow="dropShadow"
    :shadow="shadow"
    :filter="filter"
  />
</template>

<script setup>
import json from '/public/images/icons.json'
import Sprite from '@/components/Sprite'

const props = defineProps({
  icon: { type: String },
  color: { type: String },
  scale: { type: Number, default: 1 },
  scaleX: { type: Number },
  scaleY: { type: Number },
  offsetX: { type: Number, default: 0 },
  offsetY: { type: Number, default: 0 },
  rotation: { type: Number },
  dropShadow: { type: Boolean },
  shadow: { type: String },
  filter: { type: String },
})
</script>

<style scoped>
</style>
