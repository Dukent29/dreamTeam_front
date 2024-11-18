<template>
  <div>
    <div v-if="isAuthenticated" class="dashboard">
      <h1>Parent Dashboard</h1>
      <p>Welcome to the parent section. Here you can manage your children’s activities.</p>

      <!-- Add Child Form -->
      <AddChildForm />
    </div>

    <div v-else>
      <p>Please log in to access the dashboard.</p>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
import AddChildForm from '~/components/AddChildForm.vue'; // Import the form component

definePageMeta({
  layout: 'dashboard', // Use the dashboard layout
  middleware: 'role-based-redirect',
});

const { isAuthenticated } = useAuth();
</script>

<style scoped>
/* Additional styling */
</style>
