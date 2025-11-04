<template>
  <aside v-if="isAuthenticated" class="sidebar">
    <div class="sidebar-head">
      <div class="logo">🏆</div>
      <div class="title">{{ capitalizedRole }} Dashboard</div>
    </div>
    <nav class="menu">
      <ul>
        <!-- Admin Links -->
        <template v-if="role === 'admin'">
          <li><NuxtLink to="/admin">Dashboard</NuxtLink></li>
          <li><NuxtLink to="/admin/manage-users">Manage Users</NuxtLink></li>
          <li><NuxtLink to="/admin/reports">Reports</NuxtLink></li>
        </template>

        <!-- Parent Links -->
        <template v-else-if="role === 'parent'">
          <li><NuxtLink to="/parent">Overview</NuxtLink></li>
          <li><NuxtLink to="/parent/child_profile">Child Profiles</NuxtLink></li>
          <li><NuxtLink to="/parent/schedule">Schedules</NuxtLink></li>
        </template>

        <!-- Coach Links -->
        <template v-else-if="role === 'coach'">
          <li><NuxtLink to="/coach">Overview</NuxtLink></li>
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
const capitalizedRole = computed(() => (role.value ? role.value.charAt(0).toUpperCase() + role.value.slice(1) : ''));
</script>

<style scoped>
.sidebar {
  width: 100%;
  height: calc(100vh - 68px);
  position: sticky;
  top: 68px; /* matches navbar height */
  align-self: start;
  background: var(--surface, #fff);
  border-radius: 16px;
  border: 1px solid rgba(15,23,42,0.06);
  box-shadow: 0 8px 24px rgba(16,24,40,0.06);
  color: var(--text, #0f172a);
  padding: 18px;
}

.sidebar-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.logo { height: 36px; width: 36px; border-radius: 10px; display: grid; place-items: center; background: rgba(22,163,74,0.12); color: var(--accent, #16a34a); }
.title { font-weight: 700; }

.menu ul { list-style: none; padding: 8px; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.menu a { display: block; padding: 10px 12px; color: var(--text, #0f172a); text-decoration: none; border-radius: 10px; border: 1px solid transparent; }
.menu a.router-link-active { background: var(--surface-2, #f9fafb); border-color: rgba(15,23,42,0.06); }

.sidebar-message { color: #ff4d4d; font-weight: bold; padding: 20px; }
</style>
