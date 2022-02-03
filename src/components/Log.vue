<template>
  <h1>Logs</h1>

  <div v-for="log in logs" :key="log.id">
    [{{ new Date(log.timestamp).toLocaleString() }}] {{ log.message }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '../store';

const logs = computed(() => store.logs.list)
</script>
