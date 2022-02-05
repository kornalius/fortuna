<template>
  <n-card title="Stats" style="width: 250px;">
    <h3>{{ player.name }}</h3>

    <div class="flex items-center mb1" style="color: #ff0;">
      <v-icon icon="noto:glowing-star" width="20" />
      <span class="ml2">{{ player.lvl }}</span>
    </div>

    <div class="flex items-center mb1" style="color: #b44;">
      <v-icon icon="mdi:cards-heart" width="20" />
      <n-progress
        type="line"
        status="error"
        :percentage="player.hp / player.maxHp * 100"
        :height="8"
        border-radius="12px 0 12px 0"
        fill-border-radius="12px 0 12px 0"
      >
        <span>{{ player.hp }} / {{ player.maxHp }}</span>
      </n-progress>
    </div>

    <div class="flex items-center mb1" style="color: #F19936;">
      <v-icon icon="zondicons:badge" width="20" />
      <n-progress
        type="line"
        color="#F19936"
        :percentage="player.xp / player.nextXp * 100"
        :height="8"
        border-radius="12px 0 12px 0"
        fill-border-radius="12px 0 12px 0"
      >
        <span>{{ player.xp }} / {{ player.nextXp }}</span>
      </n-progress>
    </div>

    <div class="mt2">
      <n-button
        type="primary"
        size="small"
        @click="() => player.lvl += 1"
      >
        + Level
      </n-button>

      <n-button
        class="ml2"
        type="info"
        size="small"
        @click="() => player.xp += 10"
      >
        + Xp
      </n-button>

      <n-button
        class="ml2"
        type="secondary"
        size="small"
        @click="() => {
          player.state.lvl = 1
          player.state.xp = 0
        }"
      >
        Reset
      </n-button>
    </div>
  </n-card>
</template>

<script setup>
import { store } from '@/store'

const { player } = store
</script>
