<template>
  <v-card class="mt-4">
    <v-card-title>Stats</v-card-title>

    <v-card-text>
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

      <div class="mt-2">
        <v-btn
          color="primary"
          size="small"
          @click="() => player.lvl += 1"
        >
          Increment level
        </v-btn>

        <v-btn
          class="ml-1"
          color="secondary"
          size="small"
          @click="() => player.state.lvl = 1"
        >
          RESET
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { store } from '@/store'

const { player } = store
</script>
