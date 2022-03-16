<template>
  <n-dropdown
    trigger="click"
    :options="value.dropdownOptions"
    :render-icon="renderDropdownIcon"
    :render-label="renderDropdownLabel"
    @select="handleSelect"
  >
    <n-popover
      style="min-width: 250px; max-width: 350px;"
      :delay="250"
      trigger="hover"
      placement="top"
    >
      <template #trigger>
        <n-button
          :style="buttonStyle"
          :disabled="disabled"
          size="small"
          quaternary
          @mouseover.once="() => value.hovered = true"
        >
          <div class="relative">
            <div class="inline-flex items-end">
              <icon
                :icon="icons[value?.isOpened ? 'door-open' : 'door-close']"
                :scale="1.5"
              />

              <icon
                v-if="value.isLocked"
                class="lock"
                :icon="icons.lock"
                :scale="0.75"
              />

              <span
                v-if="!hideLabel"
                class="ml1"
              >
                {{ label }}
              </span>
            </div>
          </div>

          <icon
            v-if="value.isNew"
            class="new"
            :icon="icons.new"
            color="#F19936"
          />
        </n-button>
      </template>

      <div class="flex w-100">
        <div class="flex items-center">
          <icon
            :icon="icons[value?.isOpened ? 'door-open' : 'door-close']"
            :scale="2.5"
          />

          <icon
            v-if="value.isLocked"
            class="lock large"
            :icon="icons.lock"
            :scale="1.25"
          />
        </div>

        <span class="pr2" v-html="label" />
      </div>

      <span>{{ value.description }}</span>
    </n-popover>
  </n-dropdown>
</template>

<script setup>
import { computed, h } from 'vue'
import Icon from '@/components/Icon'
import icons from '@/icons'

const props = defineProps({
  value: { type: Object },
  disabled: { type: Boolean },
  hideLabel: { type: Boolean },
  position: { type: String },
})

const renderDropdownIcon = option => h(Icon, { icon: icons[option.icon], scale: option.scale || 1.5, class: option.class })
const renderDropdownLabel = option => h('span', { class: 'flex self-center' }, option.label)

const handleSelect = async key => {
  const action = props.value.findAction(key)
  if (action && action.click) {
    await action.click(this)
  }
}

const label = computed(() => {
  switch (props.value.direction) {
    case 'N': return 'North door'
    case 'S': return 'South door'
    case 'E': return 'East door'
    case 'W': return 'West door'
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
.lock.large {
  position: absolute;
  top: 17px;
  left: 23px;
}
.new {
  position: absolute;
  top: 0;
  right: 0;
  filter: drop-shadow(2px 2px 1px #333);
}
</style>
