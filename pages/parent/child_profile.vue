<template>
  <div class="child-profile">
    <h1>My Children</h1>

    <div v-if="children.length > 0" class="children-grid">
      <div v-for="child in children" :key="child.child_id" class="child-card">
        <h3>{{ child.first_name }} {{ child.last_name }}</h3>
        <p><strong>Birthdate:</strong> {{ new Date(child.birthdate).toLocaleDateString() }}</p>
        <p><strong>Age:</strong> {{ child.age }} years</p>
        <p><strong>Category:</strong> {{ child.category_id }}</p>
        <p><strong>Coach:</strong> {{ child.coach_first_name }} {{ child.coach_last_name }}</p>

        <div class="action-buttons">
          <button class="edit-btn" @click="editChild(child)">Edit</button>
          <button class="delete-btn" @click="deleteChild(child.child_id)">Delete</button>
        </div>
      </div>
    </div>

    <p v-else>No children found. Please add a child.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from '#app';


const config = useRuntimeConfig(); // Runtime config for API base URL
const children = ref([]);

// Fetch children from the backend
const fetchChildren = async () => {
  try {
    const { data, error } = await useFetch(
      `${config.public.apiBaseUrl}/parent/my-children`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
        },
      }
    );

    if (error.value) {
      console.error('Error fetching children:', error.value);
    } else {
      children.value = data.value;
    }
  } catch (err) {
    console.error('Error fetching children:', err);
  }
};

// Trigger edit action
const editChild = (child) => {
  alert(`Editing child: ${child.first_name} ${child.last_name}`);
  // You can replace this with opening a modal or redirecting to an edit page
};

// Trigger delete action
const deleteChild = async (childId) => {
  const confirmation = confirm('Are you sure you want to delete this child?');
  if (!confirmation) return;

  try {
    const { error } = await useFetch(
      `${config.public.apiBaseUrl}/parent/delete-child/${childId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`,
        },
      }
    );

    if (error.value) {
      console.error('Error deleting child:', error.value);
    } else {
      alert('Child deleted successfully!');
      fetchChildren(); // Refresh the children list
    }
  } catch (err) {
    console.error('Error deleting child:', err);
  }
};

// Fetch children on mount
onMounted(() => {
  fetchChildren();
});
</script>

<style scoped>
.child-profile {
  padding: 20px;
}

.children-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.child-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
}

.child-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.child-card h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
}

.child-card p {
  margin: 5px 0;
  font-size: 1rem;
  color: #555;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.edit-btn {
  background-color: #ffc107; /* Yellow color */
  border: none;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545; /* Red color */
  border: none;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-btn:hover {
  background-color: #c82333;
}
</style>
