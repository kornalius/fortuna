<template>
  <n-card class="card">
    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center justify-between mb1" style="color: #ff0;">
          <div class="inline flex items-center">
            <v-icon icon="noto:glowing-star" width="20" />
            <span class="ml2">{{ player.lvl }}</span>
          </div>

          <div class="inline flex items-center">
            <v-icon icon="mdi:arm-flex" color="#DAA02B" width="24" />
            <span class="ml2">{{ player.str }}</span>
          </div>

          <div class="inline flex items-center">
            <v-icon icon="flat-color-icons:sports-mode" width="24" />
            <span class="ml2">{{ player.dex }}</span>
          </div>

          <div class="inline flex items-center">
            <v-icon icon="noto:brain" width="24" />
            <span class="ml2">{{ player.int }}</span>
          </div>
        </div>
      </template>

      <span>LEVEL: {{ player.lvl }}, STR: {{ player.str}}, DEX: {{ player.dex }}, INT: {{ player.int }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center mb1" style="color: #b44;">
          <v-icon class="mr1" icon="mdi:cards-heart" width="24" />
          <n-progress
            type="line"
            status="error"
            border-radius="12px 0 12px 0"
            fill-border-radius="12px 0 12px 0"
            :percentage="player.hp / player.maxHp * 100"
            :height="8"
            :show-indicator="false"
          />
        </div>
      </template>

      <span>HP: {{ player.hp }} / {{ player.maxHp }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center mb1" style="color: #F19936;">
          <v-icon class="mr1" icon="zondicons:badge" width="24" />
          <n-progress
            type="line"
            color="#F19936"
            border-radius="12px 0 12px 0"
            fill-border-radius="12px 0 12px 0"
            :percentage="player.xp / player.nextXp * 100"
            :height="8"
            :show-indicator="false"
          />
        </div>
      </template>

      <span>XP: {{ player.xp }} / {{ player.nextXp }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center mb1" style="color: #2293E1;">
          <v-icon class="mr1" icon="whh:harddrivealt" width="24" />
          <n-progress
            type="line"
            color="#2293E1"
            border-radius="12px 0 12px 0"
            fill-border-radius="12px 0 12px 0"
            :percentage="player.diskUsed / player.disk * 100"
            :height="8"
            :show-indicator="false"
          />
        </div>
      </template>

      <span>[DISK] Used: {{ player.diskUsed }}, Free: {{ player.diskFree }}, Total: {{ player.disk }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center mb1" style="color: #CBE54A;">
          <v-icon class="mr1" icon="whh:cpualt" width="24" color="#CBE54A" />
          <n-progress
            type="line"
            color="#CBE54A"
            border-radius="12px 0 12px 0"
            fill-border-radius="12px 0 12px 0"
            :percentage="player.ramUsed / player.ram * 100"
            :height="8"
            :show-indicator="false"
          />
        </div>
      </template>

      <span>[RAM] Used: {{ player.ramUsed }}, Free: {{ player.ramFree }}, Total: {{ player.ram }}</span>
    </n-popover>

<!--    <div class="mt2">-->
<!--      <n-button-->
<!--        type="primary"-->
<!--        size="small"-->
<!--        @click="() => player.lvl += 1"-->
<!--      >-->
<!--        + Level-->
<!--      </n-button>-->

<!--      <n-button-->
<!--        class="ml2"-->
<!--        type="info"-->
<!--        size="small"-->
<!--        @click="() => player.xp += 10"-->
<!--      >-->
<!--        + Xp-->
<!--      </n-button>-->

<!--      <n-button-->
<!--        class="ml2"-->
<!--        type="secondary"-->
<!--        size="small"-->
<!--        @click="() => {-->
<!--          player.state.lvl = 1-->
<!--          player.state.xp = 0-->
<!--        }"-->
<!--      >-->
<!--        Reset-->
<!--      </n-button>-->
<!--    </div>-->
  </n-card>
</template>

<script setup>
import { store } from '@/store'

const { player } = store
</script>

<style scoped>
.card {
  cursor: default;
}
</style>
