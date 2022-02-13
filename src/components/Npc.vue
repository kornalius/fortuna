<template>
  <n-dropdown
    trigger="click"
    :options="value.dropdownOptions"
    :render-icon="renderDropdownIcon"
    :render-label="renderDropdownLabel"
    @select="handleSelect"
  >
    <n-popover :delay="1000" style="min-width: 250px" trigger="hover" placement="top">
      <template #trigger>
        <n-button
          :style="buttonStyle"
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

            <v-icon
              v-else-if="value.icon"
              :icon="value.icon"
              width="20"
              height="20"
            />

            <div class="flex flex-column w-100">
              <div
                class="ml2"
                v-html="name"
              />
            </div>

            <v-icon
              v-if="value.isNew"
              icon="bx:bxs-badge"
              class="new"
              width="14"
              type="error"
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

          <v-icon
            v-else-if="value.icon"
            class="pr2 pb2"
            :icon="value.icon"
            width="44"
            height="44"
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
import { Icon } from '@iconify/vue'

const props = defineProps({
  value: { type: Object },
})

const renderDropdownIcon = option => h(Icon, { icon: option.icon, width: 20, class: option.class })
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
  color: #D12E2E;
}
</style>