<template>
  <div class="parent-dashboard">
    <h1>Parent Dashboard</h1>
    <p>Welcome to the parent section. Add your child’s details below.</p>

    <!-- Add Child Button -->
    <button @click="openModal" class="add-child-btn">Add a Child</button>

    <!-- Modal Component -->
    <Modal v-if="isModalOpen" @close="closeModal">
      <template #title>Add a Child</template>
      <template #body>
        <AddChildForm @childAdded="closeModal" />
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
import AddChildForm from '~/components/AddChildForm.vue';
import Modal from '~/components/Modal.vue';

// Auth composable to check if the user is authenticated
const { isAuthenticated } = useAuth();

// Modal state management
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

// Ensure layout and middleware are set up
definePageMeta({
  layout: 'dashboard', // Use the dashboard layout
  middleware: 'role-based-redirect', // Check role before displaying the page
});
</script>

<style scoped>
.add-child-btn {
  background-color: #1abc9c;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.add-child-btn:hover {
  background-color: #16a085;
}
</style>
