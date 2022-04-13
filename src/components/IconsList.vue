<template>
  <n-card
    style="width: 600px; opacity: .95;"
  >
    <n-data-table
      :columns="columns"
      :data="regions"
      :max-height="800"
      :row-key="row => row.name"
      size="small"
      virtual-scroll
    />
  </n-card>
</template>

<script setup>
import { computed, h } from 'vue'
import json from '/images/icons.json'
import Sprite from '@/components/Sprite'

const columns = [
  {
    title: 'Icon',
    key: 'idx',
    width: 60,
    render: row => h('div', {
      class: 'flex justify-center align-center w-100',
    },
      h(Sprite, {
        image: '/images/icons.png',
        json,
        frame: row.name,
        scaleX: 2,
        scaleY: 2,
      })
    )
  },
  {
    title: 'Name',
    key: 'name',
    render: row => h('span', {
      class: 'pointer',
      onClick: () => navigator.clipboard.writeText(row.name),
    }, row.name)
  }
]
const regions = computed(() => json.regions.sort((a, b) => {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}))
</script>
