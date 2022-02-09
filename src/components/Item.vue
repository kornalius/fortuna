<template>
  <n-dropdown
    trigger="click"
    :options="value.dropdownOptions"
    :render-icon="renderDropdownIcon"
    :render-label="renderDropdownLabel"
    @select="handleSelect"
  >
    <n-popover :delay="1000" style="width: 250px" trigger="hover" placement="top">
      <template #trigger>
        <n-button strong quaternary :style="buttonStyle">
          <div class="inline-flex items-end">
            <v-icon
              v-if="value.icon"
              :icon="value.icon"
              width="20"
            />

            <span class="ml2">{{ name }}</span>

            <v-icon v-if="value.isBusy" class="ml2" icon="eos-icons:loading" width="20" />

            <div v-if="value.isInInventory" class="qty">{{ value.qty }}</div>

            <v-icon
              v-if="value.isInInventory && value.isEquipped"
              icon="bx:bxs-check-circle"
              class="equipped"
              width="16"
            />
          </div>
        </n-button>
      </template>

      <n-grid cols="6">
        <n-gi span="2">
          <v-icon
            v-if="value.icon"
            :icon="value.icon"
            width="44"
          />
        </n-gi>

        <n-gi span="4">
          <n-grid cols="6">
            <n-gi span="5">
              <span>{{ name }}</span>
            </n-gi>
            <n-gi span="1">
              <div class="badge">{{ value.qty }}</div>
            </n-gi>
          </n-grid>

          <div class="flex w-100">
            <div class="flex items-center">
              <v-icon :icon="weightIcon" width="15" />
              <span class="ml1 mt1">{{ value.weight }}</span>
            </div>
          </div>
        </n-gi>
      </n-grid>

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

const handleSelect = key => {
  props.value.exec(key)
}

const buttonStyle = computed(() => {
  if (props.value.isInInventory) {
    return 'padding-left: 0; display: flex; width: 100%; justify-content: start'
  }
  return ''
})

const showVersion = computed(() => (
  props.value.isFile || props.value.isSoftware || props.value.isServer
))

const name = computed(() => (
  `${props.value.name}${showVersion.value ? ` v${props.value.version}` : ''}`
))

const weightIcon = computed(() => {
  if (props.value.isFile) {
    return 'whh:harddrivealt'
  }
  if (props.value.isSoftware) {
    return 'whh:cpualt'
  }
  return 'mdi:weight'
})
</script>

<style scoped>
.badge {
  border-radius: 50%;
  padding: 2px;
  min-width: 2em;
  color: #333;
  background: #F19936;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.qty {
  position: absolute;
  bottom: 2px;
  right: 2px;
  display: inline-flex;
  font-size: small;
  color: #F19936;
  text-align: end;
}
.equipped {
  position: absolute;
  top: 2px;
  right: 4px;
  color: #CBE54A;
}
</style>
