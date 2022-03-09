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
      :delay="1000"
      trigger="hover"
      placement="top"
    >
      <template #trigger>
        <n-button
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
              class="new"
              icon="clarity:warning-standard-solid"
              color="#F19936"
              width="16"
            />

            <v-icon
              v-if="value.isAggresive"
              icon="fa6-solid:face-angry"
              class="aggresive"
              width="14"
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
  disabled: { type: Boolean },
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
  filter: drop-shadow(2px 2px 1px #333);
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
