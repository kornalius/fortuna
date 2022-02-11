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
        <n-button strong quaternary :style="buttonStyle">
          <div class="inline-flex items-center">
            <v-icon
              v-if="value.icon"
              :icon="value.icon"
              width="20"
              height="20"
            />

            <span
              :class="[
                value.qty > 1 ? 'ml3' : 'ml2',
              ]"
              v-html="name"
            />

            <v-icon v-if="value.isBusy" class="ml2" icon="eos-icons:loading" width="20" />

            <div v-if="value.qty > 1" class="qty">{{ value.qty }}</div>

            <v-icon
              v-if="value.isInInventory && value.isEquipped"
              icon="bx:bxs-check-circle"
              class="equipped"
              width="14"
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
              <span v-html="name" />
            </n-gi>
            <n-gi span="1">
              <div class="badge">{{ value.qty }}</div>
            </n-gi>
          </n-grid>

          <div class="flex w-100">
            <div class="flex items-center">
              <v-icon :icon="weightIcon" width="16" />
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

const handleSelect = async key => {
  const action = props.value.findAction(key)
  if (action && action.click) {
    await action.click(this)
  }
}

const buttonStyle = computed(() => {
  const s = ['padding: 0 2px;']
  if (props.value.isInInventory) {
    s.push('display: flex; width: 100%; justify-content: start;')
  }
  return s.join(' ')
})

const showVersion = computed(() => (
  props.value.isSoftware || props.value.isServer
))

const name = computed(() => (
  `${props.value.name}${showVersion.value ? ` <span class="blue f7">v${props.value.version}</span>` : ''}`
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
  padding: 3px 0 1px 1px;
  min-width: 1.75em;
  font-size: smaller;
  color: #333;
  background: #F19936;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.qty {
  position: absolute;
  bottom: 2px;
  left: 21px;
  display: inline-flex;
  font-size: small;
  color: #F19936;
  text-align: end;
}
.equipped {
  position: absolute;
  bottom: 0;
  left: -1px;
  background-color: #333;
  border-radius: 50%;
  color: #CBE54A;
}
</style>
