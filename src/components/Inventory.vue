<template>
  <n-card>
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
      <div class="flex">
        <n-button-group>
          <n-button
            :type="filter === undefined ? 'primary' : undefined"
            @click="setFilter(undefined)"
          >
            <v-icon icon="ci:check-all" width="24" />
          </n-button>
          <n-button
            :type="filter === 'isWeapon' ? 'primary' : undefined"
            @click="setFilter('isWeapon')"
          >
            <v-icon icon="whh:gun" width="24" />
          </n-button>
          <n-button
            :type="filter === 'isArmor' ? 'primary' : undefined"
            @click="setFilter('isArmor')"
          >
            <v-icon icon="bx:bxs-t-shirt" width="24" />
          </n-button>
          <n-button
            :type="filter === 'isFile' ? 'primary' : undefined"
            @click="setFilter('isFile')"
          >
            <v-icon icon="bi:file-earmark-text-fill" width="24" />
          </n-button>
          <n-button
            :type="filter === 'isSoftware' ? 'primary' : undefined"
            @click="setFilter('isSoftware')"
          >
            <v-icon icon="fluent:tetris-app-32-filled" width="24" />
          </n-button>
        </n-button-group>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed, ref } from 'vue'
import { store } from '@/store'
import Item from '@/components/Item.vue'

const filter = ref()

const items = computed(() =>
  store.player.items
    .filter(i => !filter.value || i[filter.value])
)

const setFilter = name => {
  filter.value = name
}
</script>

<style scoped>
.scrollable {
  overflow-y: auto;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
</style>
