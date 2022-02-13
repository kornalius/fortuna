<template>
  <div class="flex w-100" style="height: 300px;">
    <div class="flex h-100" style="width: 300px">
      <img
        v-if="value.npc?.img"
        style="max-width: 300px"
        :src="value.npc.img"
        :alt="value.npc.img"
      />
    </div>

    <div class="flex flex-grow-1 flex-column h-100 ml3">
      <div class="flex">
        <div v-html="value.text" />
      </div>

      <div class="relative flex flex-column flex-grow-1 mt4">
        <div class="scrollable">
          <div
            v-for="answer of value.answers"
            :key="`${answer.code}-${value.code}-${value.id}`"
            class="flex"
          >
            <n-button
              class="flex w-100 mv1"
              tertiary
              v-text="answer.text"
              @click="() => {
                store.game.playSound('button')
                value.answer(answer.code)
              }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { store } from '@/store'

const props = defineProps({
  value: { type: Object },
})
</script>

<style scoped>
.scrollable {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
