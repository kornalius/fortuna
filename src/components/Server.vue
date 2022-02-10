<template>
  <div class="flex flex-column w-100 h-100">
    <div class="relative flex w-100 h-100" style="height: 300px;">
      <img
        class="crt"
        src="/images/crt.png"
        alt="crt.png"
      />

      <div class="screen" />

      <div ref="scroller" class="scrollable ph5 pv4">
        <span
          v-for="(c, index) of displayed"
          :key="index"
          class="char"
          v-html="c"
        />
        <span class="caret">&nbsp;&nbsp;</span>
      </div>
    </div>

    <div class="flex flex-wrap items-center mt1">
      <span class="yellow mr2">FILES:</span>

      <span
        v-for="item in value.files"
        :key="item.id"
        class="inline mr1"
      >
        <Item :value="item" />
      </span>
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
@keyframes textShadow {
  0% {
    text-shadow: 0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  5% {
    text-shadow: 2.7928974010788217px 0 1px rgba(0,30,255,0.5), -2.7928974010788217px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  10% {
    text-shadow: 0.02956275843481219px 0 1px rgba(0,30,255,0.5), -0.02956275843481219px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  15% {
    text-shadow: 0.40218538552878136px 0 1px rgba(0,30,255,0.5), -0.40218538552878136px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  20% {
    text-shadow: 3.4794037899852017px 0 1px rgba(0,30,255,0.5), -3.4794037899852017px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  25% {
    text-shadow: 1.6125630401149584px 0 1px rgba(0,30,255,0.5), -1.6125630401149584px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  30% {
    text-shadow: 0.7015590085143956px 0 1px rgba(0,30,255,0.5), -0.7015590085143956px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  35% {
    text-shadow: 3.896914047650351px 0 1px rgba(0,30,255,0.5), -3.896914047650351px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  40% {
    text-shadow: 3.870905614848819px 0 1px rgba(0,30,255,0.5), -3.870905614848819px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  45% {
    text-shadow: 2.231056963361899px 0 1px rgba(0,30,255,0.5), -2.231056963361899px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  50% {
    text-shadow: 0.08084290417898504px 0 1px rgba(0,30,255,0.5), -0.08084290417898504px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  55% {
    text-shadow: 2.3758461067427543px 0 1px rgba(0,30,255,0.5), -2.3758461067427543px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  60% {
    text-shadow: 2.202193051050636px 0 1px rgba(0,30,255,0.5), -2.202193051050636px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  65% {
    text-shadow: 2.8638780614874975px 0 1px rgba(0,30,255,0.5), -2.8638780614874975px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  70% {
    text-shadow: 0.48874025155497314px 0 1px rgba(0,30,255,0.5), -0.48874025155497314px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  75% {
    text-shadow: 1.8948491305757957px 0 1px rgba(0,30,255,0.5), -1.8948491305757957px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  80% {
    text-shadow: 0.0833037308038857px 0 1px rgba(0,30,255,0.5), -0.0833037308038857px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  85% {
    text-shadow: 0.09769827255241735px 0 1px rgba(0,30,255,0.5), -0.09769827255241735px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  90% {
    text-shadow: 3.443339761481782px 0 1px rgba(0,30,255,0.5), -3.443339761481782px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  95% {
    text-shadow: 2.1841838852799786px 0 1px rgba(0,30,255,0.5), -2.1841838852799786px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
  100% {
    text-shadow: 2.6208764473832513px 0 1px rgba(0,30,255,0.5), -2.6208764473832513px 0 1px rgba(255,0,80,0.3), 0 0 3px;
  }
}
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
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}
.screen {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
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
  line-height: .25em;
  color: #F5BB06;
  animation: textShadow 1.6s infinite;
  z-index: 1;
}
.scrollable {
  overflow-y: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.disconnect {
  position: absolute;
  right: 6px;
  top: 266px;
  width: 0;
  z-index: 3;
}
</style>
