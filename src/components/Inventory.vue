<template>
  <n-card style="opacity: .95">
    <div class="flex flex-column h-100">
      <div class="relative flex h-100">
        <div class="scrollable">
          <item
            v-for="item in items"
            :key="item.id"
            class="pv1"
            :value="item"
            :disabled="disabled"
          />
        </div>
      </div>

      <div class="flex justify-end">
        <icon class="mr2" :icon="icons.weightWhite" />
        <span>{{ store.player.carryWeight }} / {{ store.player.maxWeight }}</span>
      </div>

      <div class="flex flex-grow-1 justify-center">
        <n-button-group>
          <n-popover trigger="hover" placement="top">
            <template #trigger>
              <n-button
                :type="filter === undefined ? 'primary' : undefined"
                @click="setFilter(undefined)"
              >
                <icon
                  :icon="icons.checkAllWhite"
                  :scale="1.5"
                />
              </n-button>
            </template>
            <span>All</span>
          </n-popover>

          <n-popover trigger="hover" placement="top">
            <template #trigger>
              <n-button
                :type="filter === 'isFile' ? 'primary' : undefined"
                @click="setFilter('isFile')"
              >
                <icon
                  :icon="icons.file"
                  :scale="1.75"
                />
              </n-button>
            </template>
            <span>Files</span>
          </n-popover>

          <n-popover trigger="hover" placement="top">
            <template #trigger>
              <n-button
                :type="filter === 'isSoftware' ? 'primary' : undefined"
                @click="setFilter('isSoftware')"
              >
                <icon
                  :icon="icons.software"
                  :scale="1.5"
                />
              </n-button>
            </template>
            <span>Softwares</span>
          </n-popover>

          <n-popover trigger="hover" placement="top">
            <template #trigger>
              <n-button
                :type="filter === 'isBattle' ? 'primary' : undefined"
                @click="setFilter('isBattle')"
              >
                <icon
                  :icon="icons.dice"
                  :scale="2"
                />
              </n-button>
            </template>
            <span>Battle</span>
          </n-popover>

          <n-dropdown
            trigger="click"
            :options="sortOptions"
            :render-icon="renderDropdownIcon"
            :render-label="renderDropdownLabel"
            @select="setSort"
          >
            <n-popover trigger="hover" placement="top">
              <template #trigger>
                <n-button>
                  <icon
                    :icon="icons.sort"
                    :scale="2"
                  />
                </n-button>
              </template>
              <span>Sort Inventory</span>
            </n-popover>
          </n-dropdown>
        </n-button-group>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed, h, ref } from 'vue'
import { store } from '@/store'
import Icon from '@/components/Icon'
import Item from '@/components/Item.vue'
import icons from '@/icons'

const props = defineProps({
  disabled: { type: Boolean },
})

const filter = ref()
const sort = ref()

const items = computed(() =>
  store.player.items
    .filter(i => !filter.value || i[filter.value])
    .sort((a, b) => {
      if (sort.value) {
        const key = sort.value
        if (a[key] < b[key]) {
          return -1
        } else if (a[key] > b[key]) {
          return 1
        }
      }
      return 0
    })
)

const setFilter = name => {
  filter.value = name
}

const sortOptions = ref([
  { key: '', label: 'None' },
  { key: 'name', label: 'Name' },
  { key: 'weight', label: 'Weight' },
  { key: 'qty', label: 'Quantity' },
])

const renderDropdownIcon = option => (
  sort.value === option.key || (sort.value === undefined && option.key === '')
    ? h(Icon, { icon: icons.checkWhite, scale: option.scale || 1 })
    : h('span', { style: 'width: 24px' })
)

const renderDropdownLabel = option => (
  h('div', { class: 'flex items-center justify-between' }, [
    h('span', { class: 'flex mr2' }, option.label),
    h(Icon, { icon: icons[option.key] }),
  ])
)

const setSort = async key => {
  sort.value = key === '' ? undefined : key
}
</script>

<style scoped>
.scrollable {
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
</style>
