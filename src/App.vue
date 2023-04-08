<template>
  <n-config-provider :theme="darkTheme" style="height: 100%;">
    <Main v-if="window.store.game.isStarted" class="fade-in" />

    <div v-show="showDialog || showOptions">
      <div v-if="!window.store.game.isStarted" class="title smoke">FORTUNA</div>

      <img src="/images/menu-background.png" class="background-image" alt="menu-background.png" />

      <div class="bg background-anim">
        <n-modal :show="showDialog" role="dialog" aria-modal="true">
          <Menu class="fade-in" />
        </n-modal>

        <n-modal :show="showOptions" role="dialog" aria-modal="true">
          <Options class="fade-in" />
        </n-modal>

        <n-modal :show="window.store.game.showIconsList" role="dialog" aria-modal="true">
          <IconsList class="fade-in" />
        </n-modal>
      </div>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import Main from '@/components/Main.vue'
import Menu from '@/components/Menu.vue'
import Options from '@/components/Options.vue'
import IconsList from '@/components/IconsList.vue'
import { darkTheme } from 'naive-ui'

const showDialog = computed(() => window.store.game.isPaused || !window.store.game.isStarted)
const showOptions = computed(() => window.store.game.showOptions)

watch(() => window.store.game.volume, newValue => {
  Howler.volume(newValue)
}, { immediate: true })

watch(() => window.store.game.crt, newValue => {
  const el = document.querySelector('#app')
  if (el) {
    if (newValue) {
      el.classList.add('scanlines')
    } else {
      el.classList.remove('scanlines')
    }
  }
}, { immediate: true })

const keyup = e => {
  if (e.keyCode === 27) { // ESC
    if (window.store.game.showIconsList) {
      window.store.game.showIconsList = false
      return
    }
    if (window.store.game.showOptions) {
      window.store.game.showOptions = false
      return
    }
    if (window.store.game.isStarted) {
      if (!window.store.game.isPaused) {
        window.store.game.pause()
      } else {
        window.store.game.resume()
      }
    }
  }
  else if (e.keyCode === 73 && e.ctrlKey && !e.shiftKey) { // CTRL+I
    window.store.game.showIconsList = true
  }
  e.stopImmediatePropagation()
  e.preventDefault()
}

onMounted(() => {
  window.document.addEventListener('keyup', keyup)
})

onUnmounted(() => {
  window.document.removeEventListener('keyup', keyup)
})
</script>

<style scoped>
.title {
  font-family: hacked,sans-serif;
  font-size: 80px;
  text-align: center;
  position: absolute;
  top: 15%;
  width: 100%;
  z-index: 1;
}
</style>

<style lang="scss">
@import "/public/styles/scanlines";
@import "/public/styles/menu-background";
@import "/public/styles/glow";
@import "/public/styles/smoke-background";
@import "/public/styles/misconvergence";
@import "/public/styles/blur-out";
@import "/public/styles/heartbeat";
@import "/public/styles/wobble-bottom";
@import "/public/styles/jello-vertical";
@import "/public/styles/drop-rotate";
@import "/public/styles/split-diagonal";
@import "/public/styles/bounce-top";
@import "/public/styles/swirl-out";
@import "/public/styles/puff-out";
@import "/public/styles/slide-in-left";
@import "/public/styles/slide-out-right";
@import "/public/styles/text-tracking-top";
@import "/public/styles/text-tracking-bottom";
@import "/public/styles/glitch";
@import "/public/styles/click";
@import "/public/styles/glowing";
@import "/public/styles/freeze";
@import "/public/styles/fade-in";
@import "/public/styles/log";

@font-face{
  font-family: nokia;
  src: url('/fonts/nokiafc22.ttf');
  font-weight: normal;
  font-style: normal;
}
@font-face{
  font-family: hacked;
  src: url('/fonts/Hacked.ttf');
  font-weight: normal;
  font-style: normal;
}
@font-face{
  font-family: pixeled;
  src: url('/fonts/Pixeltype.ttf');
  font-weight: normal;
  font-style: normal;
}
#app {
  height: 100%;
}
::selection {
  color: white;
  background: #2293E1;
}
body {
  font-family: nokia,sans-serif;
  height: 100vh;
  background: #18181c;
  overflow: hidden;
}

.background-anim {
  position: absolute;
}
.background-image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: fill;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(0, 0, 0, 0);
  -webkit-border-radius: 100px;
}
::-webkit-scrollbar:hover {
  background-color: rgba(0, 0, 0, .25);
}
::-webkit-scrollbar-thumb:vertical:hover {
  background-color: rgba(250, 250, 250, .5);
}
::-webkit-scrollbar-thumb:vertical {
  background-color: rgba(100, 100, 100, .5);
  -webkit-border-radius: 100px;
}
::-webkit-scrollbar-thumb:vertical:active {
}

// These mixup with fade-in animation

//.n-button:hover {
//  animation: glitch .1s
//}

//.n-button:active {
//  animation: click .15s
//}
</style>
