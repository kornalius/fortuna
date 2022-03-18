<template>
  <div class="wrapper" :class="sizeClass">
    <div ref="element" class="die" :class="sizeClass">
      <div class="die-face die-face-1" :class="faceClass(faces[0])" :style="dieFaceStyle">
        <div class="content">
          <icon
            class="icon"
            :class="sizeClass"
            :icon="icons[faces[0].icon]"
            :scale="scale"
          />
          <span v-if="faces[0].number" class="number" :class="sizeClass" v-text="faces[0].number" />
        </div>
      </div>
      <div class="die-face die-face-2" :class="faceClass(faces[1])" :style="dieFaceStyle">
        <div class="content">
          <icon
            class="icon"
            :class="sizeClass"
            :icon="icons[faces[1].icon]"
            :scale="scale"
          />
          <span v-if="faces[1].number" class="number" :class="sizeClass" v-text="faces[1].number" />
        </div>
      </div>
      <div class="die-face die-face-3" :class="faceClass(faces[2])" :style="dieFaceStyle">
        <div class="content">
          <icon
            class="icon"
            :class="sizeClass"
            :icon="icons[faces[2].icon]"
            :scale="scale"
          />
          <span v-if="faces[2].number" class="number" :class="sizeClass" v-text="faces[2].number" />
        </div>
      </div>
      <div class="die-face die-face-4" :class="faceClass(faces[3])" :style="dieFaceStyle">
        <div class="content">
          <icon
            class="icon"
            :class="sizeClass"
            :icon="icons[faces[3].icon]"
            :scale="scale"
          />
          <span v-if="faces[3].number" class="number" :class="sizeClass" v-text="faces[3].number" />
        </div>
      </div>
      <div class="die-face die-face-5" :class="faceClass(faces[4])" :style="dieFaceStyle">
        <div class="content">
          <icon
            class="icon"
            :class="sizeClass"
            :icon="icons[faces[4].icon]"
            :scale="scale"
          />
          <span v-if="faces[4].number" class="number" :class="sizeClass" v-text="faces[4].number" />
        </div>
      </div>
      <div class="die-face die-face-6" :class="faceClass(faces[5])" :style="dieFaceStyle">
        <div class="content">
          <icon
            class="icon"
            :class="sizeClass"
            :icon="icons[faces[5].icon]"
            :scale="scale"
          />
          <span v-if="faces[5].number" class="number" :class="sizeClass" v-text="faces[5].number" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import icons from '@/icons'

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
  xsmall: props.size === 'xsmall',
  large: props.size === 'large',
}))

const faceClass = face => ({ ...sizeClass.value, [face.color]: true })

const scale = computed(() => {
  switch (props.size) {
    case 'small': return 1
    case 'xsmall': return 1
    case 'large': return 3
    default: return 2
  }
})

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
  width: 32px;
  height: 32px;
  margin: 4px;
}
.wrapper.xsmall {
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
  transform: translateZ(-16px);
}
.die.xsmall {
  cursor: unset;
  transform: translateZ(-8px);
}

.die-face  {
  position: absolute;
  width: 48px;
  height: 48px;
  background: #ddd;
  border-radius: 3px;
  box-shadow: inset 0 0 12px #111;
}
.die-face.red  {
  background: darkred;
}
.die-face.blue  {
  background: midnightblue;
}
.die-face.green  {
  background: darkolivegreen;
}
.die-face.orange  {
  background: darkorange;
}
.die-face.purple  {
  background: mediumpurple;
}
.die-face.yellow  {
  background: yellow;
}
.die-face.black  {
  background: slategrey;
}
.die-face.small  {
  width: 32px;
  height: 32px;
  border-radius: 2px;
  box-shadow: inset 0 0 6px #111;
}
.die-face.xsmall  {
  width: 24px;
  height: 24px;
  border-radius: 2px;
  box-shadow: inset 0 0 6px #111;
}

.number {
  position: absolute;
  left: 4px;
  top: 2px;
  font-size: 14px;
  text-shadow: 2px 2px 2px white;
  color: #333;
  z-index: 1;
}
.number.small {
  font-size: 12px;
  text-shadow: 1px 1px 1px white;
}
.number.xsmall {
  font-size: 8px;
  text-shadow: 1px 1px 0 white;
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
  /*-webkit-filter: drop-shadow(-1px -1px 1px #333) drop-shadow(1px 1px 1px #fff);*/
}
.icon.small {
  padding: 4px;
  /*-webkit-filter: drop-shadow(-1px -1px 1px #333) drop-shadow(1px 1px 1px #fff);*/
}
.icon.xsmall {
  padding: 4px;
  /*-webkit-filter: drop-shadow(-1px -1px 1px #333) drop-shadow(1px 1px 1px #ddd );*/
}

.die-face-1 { transform: rotateY(0deg) translateZ(24px); }
.die-face-2 { transform: rotateY(180deg) translateZ(24px); }
.die-face-3 { transform: rotateY(90deg) translateZ(24px); }
.die-face-4 { transform: rotateY(-90deg) translateZ(24px); }
.die-face-5 { transform: rotateX(90deg) translateZ(24px); }
.die-face-6 { transform: rotateX(-90deg) translateZ(24px); }

.die-face-1.small { transform: rotateY(0deg) translateZ(16px); }
.die-face-2.small { transform: rotateY(180deg) translateZ(16px); }
.die-face-3.small { transform: rotateY(90deg) translateZ(16px); }
.die-face-4.small { transform: rotateY(-90deg) translateZ(16px); }
.die-face-5.small { transform: rotateX(90deg) translateZ(16px); }
.die-face-6.small { transform: rotateX(-90deg) translateZ(16px); }

.die-face-1.xsmall { transform: rotateY(0deg) translateZ(8px); }
.die-face-2.xsmall { transform: rotateY(180deg) translateZ(8px); }
.die-face-3.xsmall { transform: rotateY(90deg) translateZ(8px); }
.die-face-4.xsmall { transform: rotateY(-90deg) translateZ(8px); }
.die-face-5.xsmall { transform: rotateX(90deg) translateZ(8px); }
.die-face-6.xsmall { transform: rotateX(-90deg) translateZ(8px); }

.show-1 { transform: translateZ(-24px) rotateY(0deg); }
.show-2 { transform: translateZ(-24px) rotateY(-180deg); }
.show-3 { transform: translateZ(-24px) rotateY(-90deg); }
.show-4 { transform: translateZ(-24px) rotateY(90deg); }
.show-5 { transform: translateZ(-24px) rotateX(-90deg); }
.show-6 { transform: translateZ(-24px) rotateX(90deg); }

.show-1.small { transform: translateZ(-16px) rotateY(0deg); }
.show-2.small { transform: translateZ(-16px) rotateY(-180deg); }
.show-3.small { transform: translateZ(-16px) rotateY(-90deg); }
.show-4.small { transform: translateZ(-16px) rotateY(90deg); }
.show-5.small { transform: translateZ(-16px) rotateX(-90deg); }
.show-6.small { transform: translateZ(-16px) rotateX(90deg); }

.show-1.xsmall { transform: translateZ(-8px) rotateY(0deg); }
.show-2.xsmall { transform: translateZ(-8px) rotateY(-180deg); }
.show-3.xsmall { transform: translateZ(-8px) rotateY(-90deg); }
.show-4.xsmall { transform: translateZ(-8px) rotateY(90deg); }
.show-5.xsmall { transform: translateZ(-8px) rotateX(-90deg); }
.show-6.xsmall { transform: translateZ(-8px) rotateX(90deg); }
</style>
