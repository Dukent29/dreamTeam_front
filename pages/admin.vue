<!-- pages/admin.vue -->
<template>
  <div>
    <!-- Only show content if authenticated -->
    <div v-if="isAuthenticated" class="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin section. Here you can manage your child’s activities and communicate with the coach and admin.</p>
    </div>
    <!-- Message for unauthenticated users -->
    <div v-else>
      <p>Please log in to access the dashboard.</p>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';

definePageMeta({
  layout: 'dashboard', // Use the dashboard layout
  middleware: 'role-based-redirect',
});

// Get `isAuthenticated` from the `useAuth` composable
const { isAuthenticated } = useAuth();
</script>

<style scoped>
/* Add any additional styles here */
</style>
