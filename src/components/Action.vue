<template>
  <n-card
    :class="{
      card: true,
      [`card-${value.id}`]: true,
      selected,
      disabled,
    }"
    :bordered="false"
    :content-style="contentStyle"
    @mousenter="() => { hovered = true }"
    @mouseleave="() => { hovered = false }"
    @click.stop="click"
  >
    <div class="flex flex-column flex-grow-1 h-100" style="overflow: hidden;">
      <div class="flex flex-grow-1 items-center" style="max-height: 32px;">
        <div class="flex flex-grow-1 justify-center">
          <span class="label">{{ action?.label.toUpperCase() }}</span>
        </div>
      </div>

      <div class="flex flex-column self-center">
        <v-icon
          class="icon"
          :icon="action?.icon"
          width="48"
          height="48"
        />

        <div class="flex justify-between">
          <div class="flex relative">
            <v-icon
              class="back-icon"
              icon="uim:squre-shape"
              width="38"
              height="38"
            />
            <v-icon
              class="score-icon"
              :icon="scoreIcon"
              width="20"
              height="20"
            />
            <span class="score">{{ score }}</span>
          </div>

          <div class="flex relative">
            <v-icon
              class="back-icon"
              icon="uim:squre-shape"
              width="38"
              height="38"
            />
            <v-icon
              class="ap-icon"
              icon="ic:round-directions-run"
              width="20"
              height="20"
            />
            <span class="ap">{{ action?.ap }}</span>
          </div>
        </div>
      </div>

      <div class="flex flex-grow-1 items-start">
        <span class="description">{{ action?.description }}</span>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  value: { type: Object },
  combat: { type: Object },
  selected: { type: Boolean },
  disabled: { type: Boolean },
})

const emit = defineEmits(['click'])

const action = ref()

watch([() => props.value, () => props.combat], () => {
  action.value = props.combat?.getAction(props.value?.name)
}, { immediate: true })

const hovered = ref()

const score = computed(() => action.value?.atk || action.value?.def)

const scoreIcon = computed(() => (
  action.value?.def ? 'bxs:shield' : 'jam:sword-f'
))

const contentStyle = computed(() => {
  const style = [
    'padding: 4px',
    'background: whitesmoke',
    'border-radius: 16px',
    'max-height: 200px',
    'box-shadow: black 0 0 8px',
  ]
  style.push(props.selected ? 'border: 8px solid #F19936' : 'border: 8px solid #444')
  return style.join(';')
})

const click = () => {
  if (!props.disabled) {
    emit('click', props.value.id)
  }
}
</script>

<style scoped>
.card {
  width: 150px;
  height: 200px;
  margin-left: -3em;
  background: transparent;
  cursor: pointer;
}
.card.disabled {
  filter: sepia(100%) brightness(50%);
}
.card.selected {
  margin-bottom: 2em;
}
.card:hover {
  box-shadow: black 0 0 24px;
  z-index: 5;
}
.back-icon {
  color: #333;
}
.score-icon {
  position: absolute;
  left: 4px;
  top: 4px;
  color: #ddd;
}
.score {
  position: absolute;
  right: 6px;
  bottom: 4px;
  font-size: 13px;
  text-shadow: black 1px 1px 1px;
  color: #ddd;
}
.ap-icon {
  position: absolute;
  left: 4px;
  top: 4px;
  color: #ddd;
}
.ap {
  position: absolute;
  right: 6px;
  bottom: 4px;
  font-size: 13px;
  text-shadow: black 1px 1px 1px;
  color: #ddd;
}
.label {
  font-size: 16px;
  color: #333;
}
.icon {
  color: #333;
}
.description {
  color: #333;
  font-size: 10px;
  text-align: center;
  word-break: break-word;
  white-space: break-spaces;
  overflow: hidden;
}
</style>
