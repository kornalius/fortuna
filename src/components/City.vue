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
          class="button"
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
              :scale="2.5"
            />

            <div class="ws-normal" v-html="value.name" />

            <icon
              v-if="value.isNew"
              class="new"
              :icon="icons.new"
              color="#F19936"
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
            :scale="2.5"
          />
        </div>

        <div class="flex flex-column w-100">
          <span class="pr2" v-html="value.name" />
        </div>
      </div>

      <div>
        <span>{{ value.description }}</span>
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
.button {
  filter: drop-shadow(2px 2px 1px black);
}
.new {
  position: absolute;
  top: 0;
  right: 0;
  filter: drop-shadow(2px 2px 1px #333);
}
</style>
