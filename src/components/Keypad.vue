<template>
  <n-card style="opacity: .95; width: 400px;">
    <div class="flex flex-column items-center">
      <div
        class="success flex flex-column flex-grow-1 items-center justify-center w-100"
      >
        <v-icon icon="bi:check-circle-fill" width="64" />
        <span>SUCCESS</span>
      </div>

      <div class="title mb2">{{ title }}</div>

      <div class="text w-100 mb2">
        {{ displayText }}
      </div>

      <div class="flex">
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="keyClick('1')"
        >
          1
        </n-button>
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="keyClick('2')"
        >
          2
        </n-button>
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="keyClick('3')"
        >
          3
        </n-button>
      </div>
      <div class="flex">
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="keyClick('4')"
        >
          4
        </n-button>
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="keyClick('5')"
        >
          5
        </n-button>
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="keyClick('6')"
        >
          6
        </n-button>
      </div>
      <div class="flex">
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="keyClick('7')"
        >
          7
        </n-button>
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="keyClick('8')"
        >
          8
        </n-button>
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="keyClick('9')"
        >
          9
        </n-button>
      </div>
      <div class="flex">
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="reset()"
        >
          C
        </n-button>
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="keyClick('0')"
        >
          0
        </n-button>
        <n-button
          class="button"
          color="#96ccff"
          :disabled="correct"
          size="large"
          ghost
          @click="erase()"
        >
          &lt;
        </n-button>
      </div>
      <div class="flex">
        <n-button
          class="button"
          color="#D12E2E"
          :disabled="correct"
          size="large"
          ghost
          @click="cancel()"
        >
          X
        </n-button>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import anime from 'animejs'

const props = defineProps({
  value: { type: Object },
  title: { type: String },
})

const text = ref('')

const displayText = computed(() => (
  new Array(text.value.length).fill('*').join('')
))

const correct = ref(false)

watch(displayText, async newValue => {
  if (newValue.length === 4) {
    if (text.value === props.value.code) {
      store.game.playSound('success')
      correct.value = true
      await anime.timeline({
        targets: `.success`,
      })
        .add({
          scale: 2.75,
          opacity: 1,
        })
        .add({
          scale: 0,
          opacity: 0,
        })
        .finished

      store.game.showKeypad = false
      await props.value.success()
    } else {
      store.game.playSound('error_keypad')
      text.value = ''
    }
  }
})

const keyClick = key => {
  store.game.playSound('keypad')
  text.value = `${text.value}${key}`
}

const reset = () => {
  store.game.playSound('keypad')
  text.value = ''
}

const erase = () => {
  store.game.playSound('keypad')
  text.value = text.value.substring(0, text.value.length - 1)
}

const cancel = () => {
  store.game.playSound('keypad')
  store.game.showKeypad = false
}
</script>

<style scoped>
.title {
  font-size: 22px;
  text-shadow: 0 0 12px  #fff;
  text-transform: uppercase;
}
.text {
  width: 100%;
  text-align: center;
  font-size: 20px;
  padding: .25em;
  color: #96ccff;
  border: 2px solid #96ccff;
  border-radius: 4px;
  min-height: 55px;
  line-height: 41px;
  background: #333;
  box-shadow: 0 0 4px 2px #96ccff, inset 2px 2px 8px 1px #777;
}
.button {
  min-width: 80px;
  min-height: 80px;
  margin: 2px;
  border-radius: 6px;
  font-size: 20px;
  box-shadow: inset 4px 4px 8px 1px #999, inset -4px -4px 8px 0 #96ccff;
}
.success {
  position: absolute;
  margin-top: 220px;
  color: #87B93D;
  opacity: 0;
  scale: 0;
  filter: drop-shadow(0 0 16px #87B93D);
  pointer-events: none;
  z-index: 2;
}
</style>
