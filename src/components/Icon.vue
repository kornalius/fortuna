<template>
  <sprite
    image="/images/icons.png"
    :json="json"
    :frame="icon"
    :scale-x="scaleX"
    :scale-y="scaleY"
  />
</template>

<script setup>
import json from '/public/images/icons.json'
import Sprite from '@/components/Sprite'

const props = defineProps({
  icon: { type: String },
  scaleX: { type: Number, default: 1 },
  scaleY: { type: Number, default: 1 },
})
</script>

<style scoped>
</style>
