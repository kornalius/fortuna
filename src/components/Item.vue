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
      :placement="value.isInInventory ? 'left' : 'top'"
    >
      <template #trigger>
        <n-button
          :style="buttonStyle"
          quaternary
          strong
          @mouseover.once="() => value.hovered = true"
        >
          <div class="flex flex-grow-1 items-center">
            <v-icon
              v-if="value.icon"
              :icon="value.icon"
              width="20"
              height="20"
            />

            <v-icon
              v-if="value.isInInventory && value.isEquipped"
              icon="bx:bxs-check-circle"
              class="equipped"
              width="14"
            />

            <div class="flex flex-column w-100">
              <div
                :class="[
                  value.qty > 1 ? 'ml3' : 'ml2',
                ]"
                v-html="name"
              />

              <n-progress
                v-if="value.operation"
                class="mt1 w-100"
                :class="[
                  value.qty > 1 ? 'ml3' : 'ml2',
                ]"
                type="line"
                status="error"
                :percentage="value.operation.pos / value.operation.total * 100"
                :height="2"
                :show-indicator="false"
              />
            </div>

<!--            <v-icon-->
<!--              v-if="value.isBusy && !value.operation"-->
<!--              class="ml2"-->
<!--              icon="eos-icons:loading"-->
<!--              width="20"-->
<!--            />-->

            <div v-if="value.qty > 1" class="qty">{{ value.qty }}</div>

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
          <v-icon
            v-if="value.icon"
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

            <div class="inline-flex items-center">
              <div class="badge">{{ value.qty }}</div>
            </div>
          </div>

          <div class="flex w-100">
            <div class="flex items-center">
              <v-icon :icon="weightIcon" width="16" />
              <span class="ml1 mt1">{{ value.weight }}</span>
            </div>
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
  if (props.value.isFile && props.value.isOnServer) {
    s.push('font-size: 12px; color: #F19936;')
  }
  if (props.value.isInInventory || props.value.isFile) {
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
.new {
  position: absolute;
  top: 0;
  right: 0;
  color: #D12E2E;
}
</style>
