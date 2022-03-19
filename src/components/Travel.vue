<template>
  <div class="back w-100" style="height: 300px; opacity: .95;">
  </div>
</template>

<script setup>
setTimeout(() => {
  store.player.travelling = false
}, 5000)
</script>

<style scoped>
@keyframes scroll-city {
  0% {
    background-position-x: -300px;
    background-size: 100%;
    opacity: .95;
  }
  100% {
    background-position-x: -500px;
    background-size: 140%;
    opacity: 0;
  }
}
.back {
  background-image: url("/images/street.png");
  background-attachment: fixed;
  background-position-y: -400px;
  animation: scroll-city ease-out 5s;
}
</style>
