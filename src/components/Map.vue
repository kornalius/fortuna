<template>
  <n-card>
    <h3>Map</h3>
  </n-card>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '@/store'

const rooms = computed(() => store.rooms.list)
const doors = computed(() => store.doors.list)
</script>
