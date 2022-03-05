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
      :placement="value.isInInventory ? 'left' : 'top'"
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
            <v-icon
              v-if="value.icon"
              :icon="value.icon"
              width="20"
              height="20"
            />

            <v-icon
              v-if="value.isInInventory && value.isInstalled"
              icon="bx:bxs-check-circle"
              class="installed"
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
              icon="noto-v1:white-exclamation-mark"
              class="new"
              width="16"
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
              <div
                v-if="value.qty > 1"
                class="badge"
              >
                {{ value.qty }}
              </div>
            </div>
          </div>

          <div class="flex w-100">
            <div
              v-if="value.weight"
              class="flex items-center"
            >
              <v-icon :icon="weightIcon" width="16" />
              <span class="ml1 mt1">{{ value.weight }}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span>{{ value.description }}</span>
      </div>

      <div class="flex mt1 w-100">
        <div class="flex items-center">
          <div
            v-for="buff in groupedBuffs"
            :key="`buffs-${buff.name}`"
            class="inline flex items-center"
          >
            <v-icon :icon="buff.icon" width="16" height="16" />
            <span class="ml1 mr2">{{ `${buff.value < 0 ? '-' : '+'}${buff.value}` }}</span>
          </div>
        </div>
      </div>

      <span v-if="value.isUsable && !value.hasUnlimitedUses" class="uses-left ml1">{{ value.uses }} left</span>
    </n-popover>
  </n-dropdown>
</template>

<script setup>
import { computed, h } from 'vue'
import { Icon } from '@iconify/vue'
import { buffIcon, buffNames } from '@/buffs'

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

const groupedBuffs = computed(() => {
  const buffs = []
  buffNames().forEach(name => {
    if (props.value.sumOfBuffs) {
      const sum = props.value.sumOfBuffs(name)
      if (sum !== 0) {
        buffs.push({ name, value: sum, icon: buffIcon(name) })
      }
    }
  })
  return buffs
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
.installed {
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
  padding: 2px;
  background-color: #333;
  border-radius: 50%;
}
.uses-left {
  position: absolute;
  bottom: -14px;
  right: 4px;
  padding: 0 4px;
  background-color: #333;
  border-radius: 8px;
  color: #F19936;
}
</style>
