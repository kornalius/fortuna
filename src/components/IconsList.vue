<template>
  <n-card
    style="width: 600px; height: 924px; opacity: .95;"
  >
    <n-input
      v-model:value="search"
      class="mb2"
      placeholder="Type to search"
      clearable
    />

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
import { computed, h, ref } from 'vue'
import json from '/images/icons.json'
import Sprite from '@/components/Sprite'

const search = ref('')

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

const regions = computed(() => {
  const s = search.value !== '' && search.value !== undefined
    ? new RegExp(search.value)
    : undefined

  return json.regions
    .filter(r => s ? s.test(r.name) : true)
    .sort((a, b) => {
      if (a.name < b.name) {
        return -1
      }
      if (a.name > b.name) {
        return 1
      }
      return 0
    })
})
</script>
