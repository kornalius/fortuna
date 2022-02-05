<template>
  <n-card>
    <div class="flex flex-column h-100">
      <div class="flex">
        <n-button type="primary" size="small" @click="addItem">Add Item</n-button>
      </div>

      <div class="relative flex h-100">
        <div class="scrollable">
          <n-grid
            v-for="item in items"
            :key="item.id"
            class="pv1"
            :cols="3"
          >
            <n-gi :span="2">
              {{ item.name }} ({{ item.qty }})
            </n-gi>

            <n-gi class="flex justify-end">
              <n-button
                type="error"
                size="tiny"
                secondary
                round
                @click="() => {
                  store.game.playSound('test-sound')
                  item.remove()
                }"
              >
                x
              </n-button>
            </n-gi>
          </n-grid>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed } from 'vue';
import { store } from '../store';
import Item from '../classes/items/item';
import random from 'lodash/random'

const items = computed(() => store.player.items)

const addItem = () => {
  store.items.update(new Item({
    qty: random(20),
    locationStore: 'player',
  }))
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
