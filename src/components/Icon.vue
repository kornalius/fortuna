<template>
  <sprite
    class="flex self-center"
    image="/images/icons.png"
    :json="json"
    :frame="icon"
    :scale-x="scaleX || scale"
    :scale-y="scaleY || scale"
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
})
</script>

<style scoped>
</style>
