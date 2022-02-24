<template>
  <n-card class="card" style="opacity: .95">
    <div class="player-hit relative">
      <img
        src="/images/hit-effect.png"
        alt="hit-effect"
      />
      <span class="player-hit-label">0</span>
    </div>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="flex items-center justify-between mb1" style="color: #ff0;">
          <div class="stats-lvl inline flex items-center">
            <v-icon icon="noto:glowing-star" width="20" />
            <span class="ml2">{{ player.lvl }}</span>
          </div>

          <div class="stats-str inline flex items-center">
            <v-icon icon="mdi:arm-flex" color="#DAA02B" width="24" />
            <span class="ml2">{{ player.str }}</span>
          </div>

          <div class="stats-dex inline flex items-center">
            <v-icon icon="fxemoji:running" width="24" />
            <span class="ml2">{{ player.dex }}</span>
          </div>

          <div class="stats-int inline flex items-center">
            <v-icon icon="noto:brain" width="24" />
            <span class="ml2">{{ player.int }}</span>
          </div>

          <div class="stats-credits inline flex items-center">
            <v-icon icon="noto-v1:credit-card" width="24" />
            <span class="ml2">{{ player.credits }}</span>
          </div>
        </div>
      </template>

      <span>LEVEL: {{ player.lvl }}, </span>
      <span>STR: {{ player.str}}, </span>
      <span>DEX: {{ player.dex }}, </span>
      <span>INT: {{ player.int }}, </span>
      <span>CREDITS: {{ player.credits }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="stats-hp flex items-center mb1" style="color: #b44;">
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
        <div class="stats-xp flex items-center mb1" style="color: #F19936;">
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
        <div class="stats-disk flex items-center mb1" style="color: #2293E1;">
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
        <div class="stats-ram flex items-center mb1" style="color: #CBE54A;">
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

    <div class="flex mt2 w-100" style="height: 24px;">
      <div
        v-for="buff in buffs"
        :key="`buffs-${buff.name}`"
        class="inline flex items-center"
      >
        <n-popover trigger="hover" placement="left">
          <template #trigger>
            <div class="inline flex items-center">
              <v-icon
                :icon="buff.icon"
                width="20"
                height="20"
              />
              <span class="ml1 mr2">{{ `${buff.value < 0 ? '-' : '+'}${buff.value}` }}</span>
            </div>
          </template>
          {{ buff.name }} => {{ buff.timeLeft }}, {{ buff.turns }}, {{ buff.rolls }}
        </n-popover>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed, watch } from 'vue'
import { store } from '@/store'
import { bleed, life } from '@/particles'
import { buffIcon, buffLabel } from '@/buffs'

const { player } = store

watch(() => player.hp, (newValue, oldValue) => {
  const r = document.querySelector('.stats-hp').getBoundingClientRect()
  if (newValue < oldValue) {
    bleed(r.left + (player.hp / player.maxHp * (r.width - 20)), r.top)
  } else if (newValue > oldValue) {
    life(r.left + (player.hp / player.maxHp * (r.width - 20)), r.top)
  }
})

const buffs = computed(() => {
  const buffs = []
  player.buffs.forEach(b => {
    buffs.push({
      name: buffLabel(b.name),
      icon: buffIcon(b.name),
      value: b.value,
      timeLeft: b.time ? `${b.time} secs left` : '',
      turns: b.turns ? `${b.turns} turns left` : '',
      rolls: b.rolls ? `${b.rolls} rolls left` : '',
    })
  })
  return buffs
})
</script>

<style scoped>
.card {
  cursor: default;
}
.player-hit {
  pointer-events: none;
  position: absolute;
  top: 5%;
  left: 18%;
  opacity: 0;
  z-index: 1;
}
.player-hit-label {
  position: absolute;
  top: 35%;
  left: 0;
  text-align: center;
  width: 100%;
  color: #D12E2E;
  font-size: 32px;
  text-shadow: #333 1px 1px 4px;
  z-index: 2;
}
</style>
