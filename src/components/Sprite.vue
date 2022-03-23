<template>
  <span
    class="sprite"
    :style="style"
  >
    <canvas
      :width="canvasSize.width"
      :height="canvasSize.height"
      ref="spriteCanvas"
    />
  </span>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const emit = defineEmits(['ready', 'animationStarted', 'animationStopped', 'animationReset', 'animationOver'])

const props = defineProps({
  image: { type: String, required: true },
  json: { type: Object, default: () => ([]), required: true },
  frame: { type: String },
  frames: { type: Array },
  scaleX: { type: Number, default: 1 },
  scaleY: { type: Number, default: 1 },
  offsetX: { type: Number, default: 0 },
  offsetY: { type: Number, default: 0 },
  rotation: { type: Number },
  dropShadow: { type: Boolean },
  filter: { type: String },
  autoplay: { type: Boolean },
  loop: { type: Boolean },
  speed: { type: Number, default: 0 },
})

const animation = ref({
  regions: [],
  region: undefined,
  frameIndex: undefined,
  running: false,
})

const spriteCanvas = ref()

let lastTime = 0
let sprite = undefined
let context = undefined
let timerRequestID = undefined

const canvasSize = computed(() => {
  const a = animation.value
  const keys = Object.keys(a.regions)
  if (keys.length > 0) {
    const firstKey = keys[0]
    return {
      width: a.regions[firstKey].width * props.scaleX + props.offsetX,
      height: a.regions[firstKey].height * props.scaleY + props.offsetX,
    }
  }
  return undefined
})

const style = computed(() => {
  const s = []
  if (props.rotation) {
    s.push(`transform: rotate(${props.rotation}deg)`)
  }
  if (props.dropShadow) {
    s.push(`filter: drop-shadow(2px 2px 1px #333)`)
  }
  if (props.filter) {
    s.push(`filter: ${props.filter}`)
  }
  return s.join('; ')
})

const hasFrames = computed(() => props.frames && props.frames.length > 0)

const regionFromFrameIndex = frameIndex => (
  animation.value.regions[
    props.frames && frameIndex >= 0 && frameIndex < props.frames.length
      ? props.frames[frameIndex]
      : props.frame
  ]
)

watch([() => props.frame, () => props.frames], () => {
  animation.value.region = regionFromFrameIndex(0)
  animation.value.frameIndex = 0
  render()
}, { deep: true })

const play = () => {
  if (hasFrames.value) {
    animation.value.running = true
    emit('animationStarted', animation.value.region.name)
    timerRequestID = window.requestAnimationFrame(animationLoop)
  }
}

const stop = () => {
  window.cancelAnimationFrame(timerRequestID)
  animation.value.running = false
  emit('animationStopped', animation.value.region.name)
}

const reset = () => {
  if (animation.value.running) {
    stop()
  }
  animation.value.region = regionFromFrameIndex(0)
  animation.value.frameIndex = 0
  render()
  emit('animationReset', animation.value.region.name)
}

const spriteInit = () => {
  context = spriteCanvas.value.getContext('2d')
  context.imageSmoothingEnabled = false
  emit('ready')
  animation.value.region = regionFromFrameIndex(0)
  animation.value.frameIndex = 0
  if (props.autoplay && hasFrames.value) {
    play()
  } else {
    render()
  }
}

const animationLoop = () => {
  if (!hasFrames.value) {
    return
  }
  render()
  const now = Date.now()
  if (now - lastTime >= props.speed) {
    lastTime = now
    animation.value.frameIndex += 1
    if (animation.value.frameIndex >= props.frames.length) {
      emit('animationOver', animation.value.region.name)
      if (props.loop) {
        animation.value.region = regionFromFrameIndex(0)
        animation.value.frameIndex = 0
        timerRequestID = window.requestAnimationFrame(animationLoop)
      }
    } else {
      animation.value.region = regionFromFrameIndex(animation.value.frameIndex)
      timerRequestID = window.requestAnimationFrame(animationLoop)
    }
  } else {
    timerRequestID = window.requestAnimationFrame(animationLoop)
  }
}

const render = () => {
  const a = animation.value
  if (!context || !a.region) {
    return
  }
  const c = canvasSize.value
  context.clearRect(0, 0, c.width, c.height)
  context.drawImage(
    sprite,
    a.region.x,
    a.region.y,
    a.region.width,
    a.region.height,
    props.offsetX,
    props.offsetY,
    c.width,
    c.height,
  )
}

const setRegions = () => {
  let x = 0
  props.json.regions.sort((a, b) => {
    if (a.idx < b.idx) {
      return -1
    } else if (a.idx > b.idx) {
      return 1
    }
    return 0
  }).forEach(region => {
    animation.value.regions[region.name] = {
      x: region.rect[0],
      y: region.rect[1],
      width: region.rect[2],
      height: region.rect[3],
    }
    x += 1
  })
}

setRegions()
animation.value.region = regionFromFrameIndex(0)
sprite = new Image()
sprite.src = props.image
sprite.onload = () => spriteInit()
</script>
