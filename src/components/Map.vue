<template>
  <h1>Map</h1>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '@/store'

const rooms = computed(() => store.rooms.list)
const doors = computed(() => store.doors.list)
</script>
