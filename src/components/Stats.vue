<template>
  <h1>Stats</h1>

  <h3>{{ player.name }}</h3>

  <div>
    {{ player.lvl }}
  </div>

  <div>
    {{ player.hp }} / {{ player.maxHp }}
  </div>

  <div>
    {{ player.xp }} / {{ player.nextXp }}
  </div>
</template>

<script setup>
import { store } from '../store';

const { player } = store
</script>
