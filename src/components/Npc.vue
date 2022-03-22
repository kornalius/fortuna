<template>
  <n-dropdown
    trigger="click"
    :disabled="disabled"
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
          class="fade-in"
          :style="buttonStyle"
          :disabled="disabled"
          quaternary
          strong
          @mouseover.once="() => value.hovered = true"
        >
          <div class="flex flex-grow-1 items-center">
            <img
              v-if="value.img"
              :src="value.img"
              alt="crt.png"
              width="20"
              height="20"
            />

            <icon
              v-else-if="value.icon"
              :icon="icons[value.icon]"
              :scale="1.5"
            />

            <div class="flex flex-column w-100">
              <div
                v-if="!hideLabel"
                class="ml2"
                v-html="name"
              />
            </div>

            <icon
              v-if="value.isNew"
              class="new"
              :icon="icons.new"
            />

            <icon
              v-if="value.isAggresive"
              class="aggresive"
              :icon="icons.angry"
              drop-shadow
            />
          </div>
        </n-button>
      </template>

      <div class="flex w-100">
        <div class="flex items-center">
          <img
            v-if="value.img"
            class="pr2 pb2"
            :src="value.img"
            alt="crt.png"
            width="44"
            height="44"
          />

          <icon
            v-else-if="value.icon"
            class="pr2 pb2"
            :icon="icons[value.icon]"
            :scale="3"
          />
        </div>

        <div class="flex flex-column w-100">
          <div class="flex w-100">
            <div class="flex flex-grow-1 items-center">
              <span class="pr2" v-html="name" />
            </div>
          </div>

          <div class="flex w-100">
            <div class="flex items-center" />
          </div>
        </div>
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
})

const renderDropdownIcon = option => h(Icon, { icon: icons[option.icon], scale: option.scale || 1.5, class: option.class })
const renderDropdownLabel = option => h('span', { class: 'flex self-center' }, option.label)

const handleSelect = async key => {
  const action = props.value.findAction(key)
  if (action && action.click) {
    await action.click(this)
  }
}

const buttonStyle = computed(() => {
  const s = ['padding: 0 2px;']
  return s.join(' ')
})

const name = computed(() => props.value.name)
</script>

<style scoped>
.new {
  position: absolute;
  top: 0;
  right: 0;
}
.aggresive {
  position: absolute;
  bottom: 2px;
  left: 11px;
  padding: 2px;
  background-color: #333;
  border-radius: 50%;
  color: #D12E2E;
}
</style>
