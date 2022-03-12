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
            <v-icon :icon="icons.lvl" width="20" />
            <span class="ml2">{{ store.player.lvl }}</span>
          </div>

          <div class="stats-str inline flex items-center">
            <v-icon :icon="icons.str" color="#DAA02B" width="24" />
            <span class="ml2">{{ store.player.str }}</span>
          </div>

          <div class="stats-dex inline flex items-center">
            <v-icon :icon="icons.dex" width="24" />
            <span class="ml2">{{ store.player.dex }}</span>
          </div>

          <div class="stats-int inline flex items-center">
            <v-icon :icon="icons.int" width="24" />
            <span class="ml2">{{ store.player.int }}</span>
          </div>

          <div class="stats-credits inline flex items-center">
            <v-icon :icon="icons.credits" width="24" />
            <span class="ml2">{{ store.player.credits }}</span>
          </div>
        </div>
      </template>

      <span>LEVEL: {{ store.player.lvl }}, </span>
      <span>STR: {{ store.player.str}}, </span>
      <span>DEX: {{ store.player.dex }}, </span>
      <span>INT: {{ store.player.int }}, </span>
      <span>CREDITS: {{ store.player.credits }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="stats-hp flex items-center mb1" style="color: #b44;">
          <v-icon class="mr1" :icon="icons.heart" width="24" />
          <n-progress
            type="line"
            status="error"
            border-radius="12px 0 12px 0"
            fill-border-radius="12px 0 12px 0"
            :percentage="store.player.hp / store.player.maxHp * 100"
            :height="8"
            :show-indicator="false"
          />
        </div>
      </template>

      <span>HP: {{ store.player.hp }} / {{ store.player.maxHp }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="stats-xp flex items-center mb1" style="color: #F19936;">
          <v-icon class="mr1" :icon="icons.xp" width="24" />
          <n-progress
            type="line"
            color="#F19936"
            border-radius="12px 0 12px 0"
            fill-border-radius="12px 0 12px 0"
            :percentage="store.player.xp / store.player.nextXp * 100"
            :height="8"
            :show-indicator="false"
          />
        </div>
      </template>

      <span>XP: {{ store.player.xp }} / {{ store.player.nextXp }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="stats-disk flex items-center mb1" style="color: #2293E1;">
          <v-icon class="mr1" :icon="icons.harddrive" width="24" />
          <n-progress
            type="line"
            color="#2293E1"
            border-radius="12px 0 12px 0"
            fill-border-radius="12px 0 12px 0"
            :percentage="store.player.diskUsed / store.player.disk * 100"
            :height="8"
            :show-indicator="false"
          />
        </div>
      </template>

      <span>[DISK] Used: {{ store.player.diskUsed }}, Free: {{ store.player.diskFree }}, Total: {{ store.player.disk }}</span>
    </n-popover>

    <n-popover trigger="hover" placement="left">
      <template #trigger>
        <div class="stats-ram flex items-center mb1" style="color: #CBE54A;">
          <v-icon class="mr1" :icon="icons.cpu" width="24" color="#CBE54A" />
          <n-progress
            type="line"
            color="#CBE54A"
            border-radius="12px 0 12px 0"
            fill-border-radius="12px 0 12px 0"
            :percentage="store.player.ramUsed / store.player.ram * 100"
            :height="8"
            :show-indicator="false"
          />
        </div>
      </template>

      <span>[RAM] Used: {{ store.player.ramUsed }}, Free: {{ store.player.ramFree }}, Total: {{ store.player.ram }}</span>
    </n-popover>

    <n-button
      v-if="store.player.canLevelUp()"
      class="levelup-button mv1 w-100"
      color="yellow"
      secondary
      @click="() => store.player.levelUp()"
    >
      + Level +
    </n-button>

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
import icons from '@/icons'

watch(() => store.player.hp, (newValue, oldValue) => {
  const r = document.querySelector('.stats-hp').getBoundingClientRect()
  if (newValue < oldValue) {
    bleed(r.left + (store.player.hp / store.player.maxHp * (r.width - 20)), r.top + 8)
  } else if (newValue > oldValue) {
    life(r.left + (store.player.hp / store.player.maxHp * (r.width - 20)), r.top + 4)
  }
})

const buffs = computed(() => {
  const buffs = []
  store.player.buffs.forEach(b => {
    buffs.push({
      name: buffLabel(b.name),
      icon: icons[buffIcon(b.name)],
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
.levelup-button {
  animation: heartbeat 1.5s ease-in-out infinite both, glowing 1s ease-in-out infinite alternate;
}
</style>
