<template>
  <div class="add-child-form">
    <h2>Add a Child</h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model="formData.first_name" required />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model="formData.last_name" required />
      </div>

      <div class="form-group">
        <label for="birthdate">Birthdate</label>
        <input type="date" id="birthdate" v-model="formData.birthdate" required />
      </div>

      <button type="submit" class="submit-btn">Add Child</button>

      <!-- Error message -->
      <p v-if="error" class="error-message">{{ error }}</p>

      <!-- Success message -->
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig(); // Access the API base URL
const formData = ref({
  first_name: '',
  last_name: '',
  birthdate: '',
});
const error = ref('');
const successMessage = ref('');

const submitForm = async () => {
  try {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!token) {
      alert('Authentication token is missing. Please log in again.');
      return;
    }

    const response = await $fetch(`${config.public.apiBaseUrl}/parent/add-child`, {
      method: 'POST',
      body: {
        first_name: formData.value.first_name,
        last_name: formData.value.last_name,
        birthdate: formData.value.birthdate,
      },
      headers: {
        Authorization: `Bearer ${token}`, // Attach token
      },
    });

    successMessage.value = response.message;
  } catch (err) {
    console.error('Error:', err);
    error.value = err.data?.message || 'Failed to add child. Please try again.';
  }
};

</script>

<style scoped>
.add-child-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.submit-btn {
  background-color: #1abc9c;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #16a085;
}

.error-message {
  color: red;
  font-weight: bold;
}

.success-message {
  color: green;
  font-weight: bold;
}
</style>
