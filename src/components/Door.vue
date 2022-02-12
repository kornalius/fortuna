<template>
  <n-dropdown
    trigger="click"
    :options="value.dropdownOptions"
    :render-icon="renderDropdownIcon"
    :render-label="renderDropdownLabel"
    @select="handleSelect"
  >
    <n-button
      :style="buttonStyle"
      size="small"
      quaternary
      @mouseover.once="() => value.hovered = true"
    >
      <div class="relative">
        <div class="inline-flex items-end">
          <v-icon
            :icon="`bi:door-${value?.isOpened ? 'open' : 'closed'}-fill`"
            width="20"
            color="#926839"
          />
          <v-icon
            v-if="value.isLocked"
            class="lock"
            icon="fa-solid:lock"
            width="10"
            color="#000"
          />
          <span class="ml1">{{ label }}</span>
        </div>
      </div>

      <v-icon
        v-if="value.isNew"
        icon="bx:bxs-badge"
        class="new"
        width="14"
        type="error"
      />
    </n-button>
  </n-dropdown>
</template>

<script setup>
import { computed, h } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  value: { type: Object },
  position: { type: String },
})

const renderDropdownIcon = option => h(Icon, { icon: option.icon, width: 20, class: option.class })
const renderDropdownLabel = option => h('span', { class: 'flex self-center' }, option.label)

const handleSelect = async key => {
  const action = props.value.findAction(key)
  if (action && action.click) {
    await action.click(this)
  }
}

const label = computed(() => {
  switch (props.value.direction) {
    case 'N': return 'North'
    case 'S': return 'South'
    case 'E': return 'East'
    case 'W': return 'West'
    default: return ''
  }
})

const buttonStyle = computed(() => {
  const s = ['padding: 0 2px;']
  return s.join(' ')
})
</script>

<style scoped>
.lock {
  position: absolute;
  top: 5px;
  left: 5px;
}
.new {
  position: absolute;
  top: 0;
  right: 0;
  color: #D12E2E;
}
</style>
