<template>
  <aside v-if="isAuthenticated" class="sidebar">
    <h2>{{ role }} Dashboard</h2>
    <nav>
      <ul>
        <!-- Admin Links -->
        <template v-if="role === 'admin'">
          <li><NuxtLink to="/admin">Admin Home</NuxtLink></li>
          <li><NuxtLink to="/admin/manage-users">Manage Users</NuxtLink></li>
          <li><NuxtLink to="/admin/reports">Reports</NuxtLink></li>
        </template>

        <!-- Parent Links -->
        <template v-else-if="role === 'parent'">
          <li><NuxtLink to="/parent">Parent Home</NuxtLink></li>
          <li><NuxtLink to="/parent/child-profile">Child Profiles</NuxtLink></li>
          <li><NuxtLink to="/parent/schedule">Schedules</NuxtLink></li>
        </template>

        <!-- Coach Links -->
        <template v-else-if="role === 'coach'">
          <li><NuxtLink to="/coach">Coach Home</NuxtLink></li>
          <li><NuxtLink to="/coach/team-management">Team Management</NuxtLink></li>
          <li><NuxtLink to="/coach/training-schedule">Training Schedule</NuxtLink></li>
        </template>

        <!-- Fallback for Unknown Roles -->
        <template v-else>
          <li>No Links Available</li>
        </template>
      </ul>
    </nav>
  </aside>
  <div v-else class="sidebar-message">
    <p>Please log in to access the sidebar.</p>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';

// Get reactive states from `useAuth`
const { isAuthenticated, role } = useAuth();
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: red;
  color: white;
  padding: 20px;
  min-height: 100vh;
  text-align: center;
  border-radius: 20px;

}

.sidebar h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.sidebar nav ul li {
  margin-bottom: 10px;
}

.sidebar nav ul li a {
  color: white;
  text-decoration: none;
}

.sidebar nav ul li a:hover {
  color: #1abc9c;
}

.sidebar-message {
  color: #ff4d4d;
  font-weight: bold;
  padding: 20px;
}
</style>
