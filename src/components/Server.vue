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
            <div
              v-for="(c, index) of displayed"
              :key="index"
              :class="{ chartext: true, char: true, cr: c === '<br>' }"
              v-html="c"
            />
            <div class="caret" :style="caretStyle(value.caret)" />
          </div>
        </div>

        <div class="flex flex-column files">
          <div class="flex pb1">
            <span class="chartext tc w-100">---- FILES ON SERVER ----</span>
          </div>
          <div class="flex flex-grow-1 relative">
            <div class="scrollable">
              <div
                v-for="item in value.visibleFiles"
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
        @click="() => {
          store.game.playSound('click')
          value.disconnect()
        }"
      >
        <v-icon icon="websymbol:logout" width="16" />
      </n-button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import random from 'lodash/random'
import { store } from '@/store'
import Item from '@/components/Item.vue'

const scroller = ref()

let timeout

const props = defineProps({
  value: { type: Object },
})

const displayed = computed(() => (
  props.value?.display || []
))

const charToPos = index => {
  let p = 0
  let x = 0
  let y = 0

  while (p < index) {
    if (displayed.value[p] === '<br>') {
      x = -1
      y += 1
    }
    x += 1
    p += 1
  }

  return { x, y }
}

const caretStyle = index => {
  const pos = charToPos(index)
  return {
    left: `${pos.x * 10}px`,
    top: `${pos.y * 23}px`,
  }
}

const posToChar = (x, y) => {
  let p = 0
  let nx = 0
  let ny = 0

  while (p < displayed.value.length) {
    if (displayed.value[p] === '<br>') {
      nx = -1
      ny += 1
    }
    nx += 1
    if (nx === x && ny === y) {
      break
    }
    p += 1
  }

  return p
}

const process = () => {
  setTimeout(() => {
    props.value.processBuffer()
    process()
  }, random(store.config.serverSpeed))
}

onMounted(() => {
  process()
})

onUnmounted(() => {
  clearTimeout(timeout)
})

watch(displayed, () => {
  timeout = setTimeout(() => {
    if (scroller?.value) {
      scroller.value.scrollTop = scroller.value.scrollHeight
    }
  }, 100);
}, { immediate: true, deep: true })
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
  position: absolute;
  width: 8px;
  height: 22px;
  animation: blink .75s linear infinite;
  z-index: 1;
}
.chartext {
  font-family: pixeled,sans-serif;
  font-size: 24px;
  line-height: 20px;
  color: #F5BB06;
  animation: textShadow 1.6s infinite;
  z-index: 1;
}
.char {
  display: inline-block;
  text-align: center;
  width: 10px;
}
.cr {
  display: inline;
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
