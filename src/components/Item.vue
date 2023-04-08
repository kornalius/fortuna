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
      :placement="value.isInInventory || value.isFile ? 'left' : 'top'"
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
          <div class="flex flex-grow-1 flex-column">
            <div class="flex flex-grow-1 items-center">
              <icon
                v-if="value.icon"
                :icon="icons[value.icon]"
                :scale="1.5"
              />

              <icon
                v-if="value.isInInventory && value.isInstalled"
                :icon="icons.checkCircle"
                class="installed"
              />

              <div
                v-if="!hideLabel"
                :class="[
                    value.qty > 1 ? 'ml3' : 'ml2',
                  ]"
                v-html="name"
              />

              <div v-if="value.qty > 1" class="qty">{{ value.qty }}</div>
            </div>

            <n-progress
              v-if="value.operation"
              class="mt1 ml-5 w-100"
              type="line"
              status="error"
              :percentage="value.operation.pos / value.operation.total * 100"
              :height="2"
              :show-indicator="false"
            />

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
            drop-shadow
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
              <icon :icon="weightIcon" />

              <span class="ml1 mt1">{{ value.weight }}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <span>{{ value.description }}</span>
      </div>

      <div v-if="value.tooltip()">
        <span>{{ value.tooltip() }}</span>
      </div>

      <div class="flex mt1 w-100">
        <div class="flex items-center">
          <div
            v-for="buff in groupedBuffs"
            :key="`buffs-${buff.name}`"
            class="inline flex items-center"
          >
            <icon :icon="buff.icon" />

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
import { buffIcon, buffNames } from '@/buffs'
import Icon from '@/components/Icon'
import icons from '@/icons'

const props = defineProps({
  value: { type: Object },
  disabled: { type: Boolean },
  hideLabel: { type: Boolean },
})

const renderDropdownIcon = option => h(Icon, { icon: icons[option.icon], scale: option.scale || 1.5, class: option.class })
const renderDropdownLabel = option => h('span', { class: 'flex self-center' }, [option.label])

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
  `${props.value.nameProper}${showVersion.value ? ` <span class="blue f7">v${props.value.version}</span>` : ''}`
))

const weightIcon = computed(() => {
  if (props.value.isFile) {
    return icons.harddrive
  }
  if (props.value.isSoftware) {
    return icons.cpu
  }
  return icons.weight
})

const groupedBuffs = computed(() => {
  const buffs = []
  buffNames.forEach(name => {
    if (props.value.sumOfBuffs) {
      const sum = props.value.sumOfBuffs(name)
      if (sum !== 0) {
        buffs.push({ name, value: sum, icon: icons[buffIcon(name)] })
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
