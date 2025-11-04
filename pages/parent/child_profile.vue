<template>
  <div class="child-profile">
    <div class="header-row">
      <div>
        <h1>Child Profiles</h1>
        <p class="sub">Manage your children’s information and assigned coaches.</p>
      </div>
      <div class="header-actions">
        <button class="btn-secondary">Import</button>
        <button class="btn-primary">+ Add Child</button>
      </div>
    </div>

    <!-- Display Messages -->
    <div v-if="message" class="message" :class="message.type">
      {{ message.text }}
    </div>

    <div v-if="children.length > 0" class="children-grid" :class="{ single: children.length === 1 }">
      <div v-for="child in children" :key="child.child_id" class="child-card glass">
        <div class="card-head">
          <div class="avatar">{{ child.first_name?.charAt(0) }}{{ child.last_name?.charAt(0) }}</div>
          <div class="person">
            <h3>{{ child.first_name }} {{ child.last_name }}</h3>
            <p class="muted">Coach: {{ child.coach_first_name }} {{ child.coach_last_name }}</p>
          </div>
        </div>
        <div class="meta">
          <div class="meta-item"><span>Birthdate</span><strong>{{ formatDate(child.birthdate) }}</strong></div>
          <div class="meta-item"><span>Age</span><strong>{{ child.age }} yrs</strong></div>
          <div class="meta-item"><span>Category</span><strong>#{{ child.category_id }}</strong></div>
        </div>

        <div class="action-buttons">
          <button class="chip" @click="openEditModal(child)">Edit</button>
          <button class="chip danger" @click="confirmDelete(child.child_id)">Delete</button>
        </div>
      </div>
    </div>

    <p v-else class="empty">No children found. Please add a child.</p>

    <!-- Modal for Editing -->
    <Modal v-if="isEditModalOpen" @close="closeEditModal">
      <template #title>Edit Child</template>
      <template #body>
        <EditChildForm :child="selectedChild" @childUpdated="onChildUpdated" />
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRuntimeConfig } from '#app';
import Modal from '~/components/Modal.vue'; // Reusable Modal Component
import EditChildForm from '~/components/EditChildForm.vue'; // Form Component for Editing

const config = useRuntimeConfig();
const children = ref([]); // Array to store the list of children
const message = ref(null); // For displaying success/error messages
const isEditModalOpen = ref(false); // Boolean to track if the edit modal is open
const selectedChild = ref(null); // Object to store the currently selected child for editing

// Fetch children data
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
      message.value = { type: 'error', text: 'Failed to load children.' };
    } else {
      children.value = data.value; // Assign fetched children data to the state
    }
  } catch (err) {
    console.error('Error fetching children:', err);
  }
};

// Format date for display
const formatDate = (date) => new Date(date).toLocaleDateString();

// Open the Edit Modal and set the selected child
const openEditModal = (child) => {
  selectedChild.value = child; // Set the child to be edited
  isEditModalOpen.value = true; // Open the modal
};

// Close the Edit Modal
const closeEditModal = () => {
  isEditModalOpen.value = false;
  selectedChild.value = null; // Clear the selected child
};

// Callback when a child is updated
const onChildUpdated = () => {
  fetchChildren(); // Refresh children list after editing
  message.value = { type: 'success', text: 'Child updated successfully!' };
  closeEditModal();
};

// Delete a child with confirmation
const confirmDelete = async (childId) => {
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
      message.value = { type: 'error', text: 'Failed to delete child.' };
    } else {
      message.value = { type: 'success', text: 'Child deleted successfully!' };
      fetchChildren(); // Refresh children list after deletion
    }
  } catch (err) {
    console.error('Error deleting child:', err);
  }
};

onMounted(() => {
  fetchChildren();
});

definePageMeta({
  layout: 'dashboard', // Use the dashboard layout
});
</script>

<style scoped>
/* Page header */
.header-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
.sub { color: var(--muted, #64748b); margin: 4px 0 0; }
.header-actions { display: flex; gap: 10px; }
.btn-primary { background: var(--accent, #16a34a); color: #fff; border: none; padding: 10px 14px; border-radius: 10px; }
.btn-secondary { background: var(--surface-2, #f3f4f6); color: var(--text, #0f172a); border: 1px solid rgba(15,23,42,0.06); padding: 10px 14px; border-radius: 10px; }

/* Grid */
.children-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  gap: 16px;
  width: 100%;
}

/* When only one card exists, center it and give it a comfortable width */
.children-grid.single { grid-template-columns: 1fr; max-width: 720px; margin-inline: auto; }

/* Glassmorphic card with mirror blur effect */
.child-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid rgba(255,255,255,0.28);
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 10px 30px rgba(16, 24, 40, 0.12);
  color: #0f172a;
  width: 100%;
  box-sizing: border-box;
}

/* backdrop filter to blur the background content under the card */
.glass { backdrop-filter: blur(14px) saturate(140%); -webkit-backdrop-filter: blur(14px) saturate(140%); }

/* subtle reflective sheen (mirror) */
.child-card::before {
  content: '';
  position: absolute;
  inset: -40% -20% auto -20%;
  height: 60%;
  background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 60%, transparent 100%);
  transform: rotate(-8deg);
  pointer-events: none;
}

.card-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.avatar { height: 40px; width: 40px; border-radius: 10px; display: grid; place-items: center; font-weight: 700; color: #fff; background: linear-gradient(135deg, var(--accent, #16a34a), #0ea5e9); }
.person { min-width: 0; }
.person h3 { margin: 0; font-size: 1.05rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.muted { color: var(--muted, #64748b); margin: 2px 0 0; }

.meta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin: 10px 0 12px; }
.meta-item { background: rgba(255,255,255,0.6); border: 1px solid rgba(15,23,42,0.06); border-radius: 10px; padding: 10px; text-align: center; }
.meta-item span { display: block; color: var(--muted, #64748b); font-size: 12px; }
.meta-item strong { font-size: 14px; color: var(--text, #0f172a); }

.action-buttons { display: flex; gap: 8px; flex-wrap: wrap; }
.chip { background: var(--surface-2, rgba(255,255,255,0.8)); border: 1px solid rgba(15,23,42,0.08); padding: 8px 10px; border-radius: 999px; cursor: pointer; color: var(--text, #0f172a); }
.chip.danger { border-color: rgba(220,38,38,0.2); color: #b91c1c; background: rgba(254,242,242,0.8); }

.message { margin: 12px 0; padding: 10px 12px; border-radius: 12px; font-size: 14px; }
.message.success { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
.message.error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; }

.empty { color: var(--muted, #64748b); }

@media (min-width: 640px) { .meta { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 480px) { .meta { grid-template-columns: 1fr; } }
</style>
