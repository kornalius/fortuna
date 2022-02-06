<template>
  <n-dropdown
    trigger="click"
    :options="door.dropdownOptions"
    :render-icon="renderDropdownIcon"
    @select="handleSelect"
  >
    <n-button
      :style="style"
      quaternary
      size="large"
    >
      <div class="relative">
        <v-icon
          :icon="`bi:door-${door?.isOpened ? 'open' : 'closed'}-fill`"
          width="44"
          color="#926839"
        />
        <v-icon
          v-if="door.isLocked"
          class="lock"
          icon="fa-solid:lock"
          width="16"
          color="#000"
        />
      </div>
    </n-button>
  </n-dropdown>
</template>

<script setup>
import { computed, h } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  door: { type: Object },
  position: { type: String },
})

const renderDropdownIcon = option => h(Icon, { icon: option.icon })

const handleSelect = key => {
  props.door.execAction(key)
}

const style = computed(() => {
  switch (props.position) {
    case 'north':
      return 'position: absolute; top: 0; left: 47%;'
    case 'south':
      return 'position: absolute; bottom: 0; left: 47%;'
    case 'east':
      return 'position: absolute; right: 0; top: 47%; '
    case 'west':
      return 'position: absolute; left: 0; top: 47%;'
  }
})
</script>

<style scoped>
.lock {
  position: absolute;
  top: 33%;
  left: 33%;
}
</style>
