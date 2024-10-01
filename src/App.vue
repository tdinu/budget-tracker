<script setup lang="ts">
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="bg-violet-200 h-screen">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
