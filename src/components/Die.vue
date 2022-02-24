<template>
  <div class="wrapper" :class="sizeClass">
    <div ref="element" class="die" :class="sizeClass">
      <div class="die-face die-face-1" :class="sizeClass" :style="dieFaceStyle">
        <div class="content">
          <v-icon
            class="icon"
            :class="sizeClass"
            :icon="faces[0].icon"
            :width="faces[0].size"
            :height="faces[0].size"
            :rotate="faces[0].rotate"
            :color="faces[0].color"
          />
        </div>
      </div>
      <div class="die-face die-face-2" :class="sizeClass" :style="dieFaceStyle">
        <div class="content">
          <v-icon
            class="icon"
            :class="sizeClass"
            :icon="faces[1].icon"
            :width="faces[1].size"
            :height="faces[1].size"
            :rotate="faces[1].rotate"
            :color="faces[1].color"
          />
        </div>
      </div>
      <div class="die-face die-face-3" :class="sizeClass" :style="dieFaceStyle">
        <div class="content">
          <v-icon
            class="icon"
            :class="sizeClass"
            :icon="faces[2].icon"
            :width="faces[2].size"
            :height="faces[2].size"
            :rotate="faces[2].rotate"
            :color="faces[2].color"
          />
        </div>
      </div>
      <div class="die-face die-face-4" :class="sizeClass" :style="dieFaceStyle">
        <div class="content">
          <v-icon
            class="icon"
            :class="sizeClass"
            :icon="faces[3].icon"
            :width="faces[3].size"
            :height="faces[3].size"
            :rotate="faces[3].rotate"
            :color="faces[3].color"
          />
        </div>
      </div>
      <div class="die-face die-face-5" :class="sizeClass" :style="dieFaceStyle">
        <div class="content">
          <v-icon
            class="icon"
            :class="sizeClass"
            :icon="faces[4].icon"
            :width="faces[4].size"
            :height="faces[4].size"
            :rotate="faces[4].rotate"
            :color="faces[4].color"
          />
        </div>
      </div>
      <div class="die-face die-face-6" :class="sizeClass" :style="dieFaceStyle">
        <div class="content">
          <v-icon
            class="icon"
            :class="sizeClass"
            :icon="faces[5].icon"
            :width="faces[5].size"
            :height="faces[5].size"
            :rotate="faces[5].rotate"
            :color="faces[5].color"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const props = defineProps({
  faces: { type: Array },
  face: { type: Number },
  selected: { type: Boolean },
  done: { type: Boolean },
  size: { type: String },
})

const element = ref()

let currentClass

const setFace = face => {
  const showClass = `show-${face}`
  if (currentClass) {
    element.value.classList.remove(currentClass)
  }
  element.value.classList.add(showClass)
  currentClass = showClass
}

watch(() => props.face, newValue => {
  if (element.value) {
    setFace(newValue)
  }
}, { immediate: true })

const sizeClass = computed(() => ({
  small: props.size === 'small',
  large: props.size === 'large',
}))

const dieFaceStyle = computed(() => {
  const style = []
  if (props.selected) {
    style.push('outline: 3px solid #E79940; box-shadow: inset 0 0 10px #E79940;')
  }
  if (props.done) {
    style.push('filter: brightness(.5) grayscale(75%)')
  }
  return style.join('; ')
})

onMounted(() => {
  setFace(props.face)
})
</script>

<style scoped>
.wrapper {
  width: 48px;
  height: 48px;
  margin: 10px;
  perspective: 600px;
  perspective-origin: 300% 300%;
}
.wrapper.small {
  width: 24px;
  height: 24px;
  margin: 2px;
}

.die {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  transform-style: preserve-3d;
  transform: translateZ(-24px);
  transition: transform 200ms;
}
.die.small {
  cursor: unset;
  transform: translateZ(-12px);
}

.die-face  {
  position: absolute;
  width: 48px;
  height: 48px;
  background: #ddd;
  border-radius: 3px;
  box-shadow: inset 0 0 12px #111;
}
.die-face.small  {
  width: 24px;
  height: 24px;
  border-radius: 2px;
  box-shadow: inset 0 0 4px #111;
}

.content  {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.icon {
  padding: 8px;
  width: 100%;
  height: 100%;
  -webkit-filter: drop-shadow(-1px -1px 1px #333) drop-shadow(1px 1px 1px #fff);
}
.icon.small {
  padding: 2px;
  -webkit-filter: drop-shadow(-1px -1px 0 #333) drop-shadow(1px 1px 0  #fff);
}

.die-face-1 { transform: rotateY(0deg) translateZ(24px); }
.die-face-2 { transform: rotateY(180deg) translateZ(24px); }
.die-face-3 { transform: rotateY(90deg) translateZ(24px); }
.die-face-4 { transform: rotateY(-90deg) translateZ(24px); }
.die-face-5 { transform: rotateX(90deg) translateZ(24px); }
.die-face-6 { transform: rotateX(-90deg) translateZ(24px); }

.die-face-1.small { transform: rotateY(0deg) translateZ(12px); }
.die-face-2.small { transform: rotateY(180deg) translateZ(12px); }
.die-face-3.small { transform: rotateY(90deg) translateZ(12px); }
.die-face-4.small { transform: rotateY(-90deg) translateZ(12px); }
.die-face-5.small { transform: rotateX(90deg) translateZ(12px); }
.die-face-6.small { transform: rotateX(-90deg) translateZ(12px); }

.show-1 { transform: translateZ(-24px) rotateY(0deg); }
.show-2 { transform: translateZ(-24px) rotateY(-180deg); }
.show-3 { transform: translateZ(-24px) rotateY(-90deg); }
.show-4 { transform: translateZ(-24px) rotateY(90deg); }
.show-5 { transform: translateZ(-24px) rotateX(-90deg); }
.show-6 { transform: translateZ(-24px) rotateX(90deg); }

.show-1.small { transform: translateZ(-12px) rotateY(0deg); }
.show-2.small { transform: translateZ(-12px) rotateY(-180deg); }
.show-3.small { transform: translateZ(-12px) rotateY(-90deg); }
.show-4.small { transform: translateZ(-12px) rotateY(90deg); }
.show-5.small { transform: translateZ(-12px) rotateX(-90deg); }
.show-6.small { transform: translateZ(-12px) rotateX(90deg); }
</style>
