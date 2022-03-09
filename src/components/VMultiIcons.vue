<template>
<!--  Example-->
<!--  <v-multi-icons-->
<!--    v-if="value.isNew"-->
<!--    class="new"-->
<!--  >-->
<!--    <v-icon icon="fontisto:rectangle" width="16" />-->
<!--    <v-icon icon="bi:exclamation-lg" width="18" color="black" />-->
<!--  </v-multi-icons>-->

  <div class="v-multi-icons">
    <slot />
  </div>
</template>

<script setup>
</script>

<style>
.v-multi-icons {
  display: inline-grid;
}
.v-multi-icons .iconify {
  grid-area: 1/1/2/2;
  margin: auto;
}
</style>
