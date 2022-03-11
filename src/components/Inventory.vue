<template>
  <n-card style="opacity: .95">
    <div class="flex flex-column h-100">
      <div class="relative flex h-100">
        <div class="scrollable">
          <item
            v-for="item in items"
            :key="item.id"
            :value="item"
            class="pv1"
          />
        </div>
      </div>

      <div class="flex flex-grow-1 justify-center">
        <n-button-group>
          <n-popover trigger="hover" placement="top">
            <template #trigger>
              <n-button
                :type="filter === undefined ? 'primary' : undefined"
                @click="setFilter(undefined)"
              >
                <v-icon :icon="icons.checkAll" width="24" />
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
                <v-icon :icon="icons.file" width="24" />
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
                <v-icon :icon="icons.software" width="24" />
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
                <v-icon :icon="icons.dice" width="24" />
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
                  <v-icon :icon="icons.sort" width="24" />
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
import Item from '@/components/Item.vue'
import { Icon } from '@iconify/vue'
import icons from '@/icons'

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
    ? h(Icon, { icon: icons.check, width: 20, color: '#63e2b7' })
    : h('span', { style: 'width: 24px' })
)

const renderDropdownLabel = option => (
  h('div', { class: 'flex items-center' }, [
    h('span', { class: 'flex mr2' }, option.label),
    h(Icon, { icon: icons[option.key], width: 20, color: '#888' }),
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
