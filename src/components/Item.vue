<template>
  <n-dropdown
    trigger="click"
    :options="value.dropdownOptions"
    :render-icon="renderDropdownIcon"
    :render-label="renderDropdownLabel"
    @select="handleSelect"
  >
    <n-button strong quaternary>
      <div class="inline-flex items-end">
        <v-icon
          v-if="value.icon"
          :icon="value.icon"
          width="20"
        />
        <span class="ml2">{{ value.name }}</span>
      </div>
    </n-button>
  </n-dropdown>
</template>

<script setup>
import { h } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  value: { type: Object },
})

const renderDropdownIcon = option => h(Icon, { icon: option.icon, width: 20, class: option.class })
const renderDropdownLabel = option => h('span', { class: 'flex self-center' }, option.label)

const handleSelect = key => {
  props.value.exec(key)
}
</script>
