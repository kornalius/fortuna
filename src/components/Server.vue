<template>
  <div class="flex w-100" style="height: 300px;">
    <div class="relative flex w-100 h-100">
      <img
        class="crt"
        src="/images/crt.png"
        alt="crt.png"
      />

      <div class="screen" />

      <div class="flex w-100 ph5 pv4">
        <div class="relative inline-flex w-100">
          <div ref="scroller" class="scrollable">
            <span
              v-for="(c, index) of displayed"
              :key="index"
              class="char"
              v-html="c"
            />
            <span class="caret">&nbsp;&nbsp;</span>
          </div>
        </div>

        <div class="flex flex-column files">
          <div class="flex pb1">
            <span class="char tc w-100">---- FILES ON SERVER ----</span>
          </div>
          <div class="flex flex-grow-1 relative">
            <div class="scrollable">
              <div
                v-for="item in value.files"
                :key="item.id"
                class="inline mr1"
              >
                <Item :value="item" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <n-button
        class="disconnect"
        size="small"
        type="warning"
        @click="() => value.disconnect()"
      >
        <v-icon icon="websymbol:logout" width="16" />
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import random from 'lodash/random'
import { store } from '@/store'
import Item from '@/components/Item.vue'

const props = defineProps({
  value: { type: Object },
})

const displayed = computed(() => (
  props.value?.display || []
))

const process = () => {
  setTimeout(() => {
    props.value.processBuffer()
    process()
  }, random(store.config.serverSpeed))
}

onMounted(() => {
  process()
})
</script>

<style>
@keyframes blink {
  0% { opacity: 0 }
  50% { opacity: 1 }
  100% { opacity: 0 }
}
</style>

<style scoped>
.crt {
  object-fit: fill;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 2;
  pointer-events: none;
}
.screen {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #211C0F;
}
.caret {
  background: #F5BB06;
  width: 8px;
  height: 16px;
  animation: blink .75s linear infinite;
  z-index: 1;
}
.char {
  font-family: pixeled,sans-serif;
  font-size: 24px;
  line-height: .5em;
  color: #F5BB06;
  animation: textShadow 1.6s infinite;
  z-index: 1;
}
.scrollable {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.disconnect {
  position: absolute;
  right: 3px;
  top: 266px;
  width: 0;
  z-index: 3;
}
.files {
  border-left: 1px dashed #F5BB06;
  padding-left: 8px;
  width: 300px;
  z-index: 1;
}
</style>
