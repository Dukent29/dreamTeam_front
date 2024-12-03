<!-- layouts/dashboard.vue -->
<template>
  <div class="dashboard-layout">
    <!-- Sidebar Component -->
    <Navbar />
    <div class="main-content">
      <Sidebar />
       <!-- Navbar Component -->
      <div class="content-area">
        <!-- Render page content conditionally -->
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue'; // Sidebar component
import Navbar from '~/components/Navbar.vue'; // Navbar component
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.main-content {
  flex: 1;
  display: flex;
  gap: .9rem;
}

.content-area {
  flex: 1;
  border-radius: 5px;
}
</style>
