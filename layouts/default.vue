<!-- layouts/default.vue -->
<template>
  <div>
    <Header />  <!-- Make sure this is correctly imported -->
    <NuxtPage />
    <footer>Footer</footer>
  </div>
</template>

<script setup>
import Header from '~/components/header.vue';  // Import Header correctly here
</script>

<style scoped>
/* Basic styles */
header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  text-align: center;
}

footer {
  background-color: #34495e;
  color: white;
  padding: 1rem;
  text-align: center;
}

body {
  padding: 0;
  margin: 0;
}
</style>
