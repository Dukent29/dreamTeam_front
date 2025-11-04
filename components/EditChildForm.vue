<template>
    <form @submit.prevent="submitForm">
      <div>
        <label>First Name:</label>
        <input type="text" v-model="childData.first_name" required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" v-model="childData.last_name" required />
      </div>
      <div>
        <label>Birthdate:</label>
        <input type="date" v-model="childData.birthdate" required />
      </div>
      <button type="submit">Save Changes</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRuntimeConfig } from '#app';
  
  const props = defineProps({
    child: {
      type: Object,
      required: true,
    },
  });
  
  const emit = defineEmits(['childUpdated']);
  
  const config = useRuntimeConfig();
  const childData = ref({ ...props.child });
  
  const submitForm = async () => {
    try {
      const { error } = await useFetch(
        `${config.public.apiBaseUrl}/parent/edit-child/${childData.value.child_id}`,
        {
          method: 'PUT',
          body: childData.value,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
          },
        }
      );
  
      if (error.value) {
        console.error('Error updating child:', error.value);
        alert('Failed to update child.');
      } else {
        emit('childUpdated'); // Notify parent about the update
      }
    } catch (err) {
      console.error('Error updating child:', err);
    }
  };
  </script>
  
  <style scoped>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  button {
    background-color: #28a745; /* Green */
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #218838;
  }
  .message {
  margin: 15px 0;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
}
  </style>
  