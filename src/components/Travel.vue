<template>
  <div
    class="back"
    :style="`animation: scroll ease-out ${window.store.config.travelTime}ms;`"
  />
</template>

<script setup>

setTimeout(() => {
  window.store.player.travelling = false
}, window.store.config.travelTime)
</script>

<style>
@keyframes scroll {
  0% {
    background-position-x: -300px;
    background-size: 100%;
    opacity: 0;
  }
  15% {
    opacity: .95;
  }
  100% {
    background-position-x: -500px;
    background-size: 140%;
    opacity: 0;
  }
}
</style>

<style scoped>
.back {
  width: 100%;
  height: 300px;
  opacity: 0;
  background-image: url("/images/street.png");
  background-attachment: fixed;
  background-position-y: -400px;
}
</style>
