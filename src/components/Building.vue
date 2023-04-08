<template>
  <n-dropdown
    trigger="click"
    :options="value.dropdownOptions"
    :render-icon="renderDropdownIcon"
    :render-label="renderDropdownLabel"
    @select="handleSelect"
  >
    <n-popover
      style="min-width: 250px"
      :delay="1000"
      trigger="hover"
      placement="top"
    >
      <template #trigger>
        <n-button
          :style="style"
          :disabled="disabled"
          quaternary
          strong
          @mouseover.once="() => value.hovered = true"
        >
          <div class="flex flex-grow-1 flex-column items-center">
            <icon
              class="mb2"
              :icon="icons[value.icon]"
              :color="value.color"
              :scale="2"
            />

            <div class="ws-normal" v-html="value.nameProper" />

            <icon
              v-if="value.isNew"
              class="new"
              :icon="icons.new"
            />
          </div>
        </n-button>
      </template>

      <div class="flex w-100">
        <div class="flex items-center">
          <icon
            v-if="value.icon"
            class="pr2 pb2"
            :icon="icons[value.icon]"
            :scale="3"
          />
        </div>

        <div class="flex flex-column w-100">
          <span class="pr2" v-html="value.nameProper" />
        </div>
      </div>

      <div>
        <span>{{ value.description }}</span>
      </div>

      <div v-if="value.tooltip()">
        <span>{{ value.tooltip() }}</span>
      </div>
    </n-popover>
  </n-dropdown>
</template>

<script setup>
import { h } from 'vue'
import Icon from '@/components/Icon'
import icons from '@/icons'

const props = defineProps({
  value: { type: Object },
  style: { type: [Object, String] },
  disabled: { type: Boolean },
})

const renderDropdownIcon = option => h(Icon, { icon: option.icon, scale: option.scale || 1.5, class: option.class })
const renderDropdownLabel = option => h('span', { class: 'flex self-center' }, option.label)

const handleSelect = async key => {
  const action = props.value.findAction(key)
  if (action && action.click) {
    await action.click(this)
  }
}
</script>

<style scoped>
.new {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
