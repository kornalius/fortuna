<template>
<!--  Example-->
<!--  <multi-icons>-->
<!--    <icon icon="fontisto:rectangle" />-->
<!--    <icon icon="bi:exclamation-lg" :scale="2" />-->
<!--  </multi-icons>-->

  <div class="multi-icons">
    <slot />
  </div>
</template>

<script setup>
</script>

<style>
.multi-icons {
  display: inline-grid;
}
.multi-icons .iconify {
  grid-area: 1/1/2/2;
  margin: auto;
}
</style>
