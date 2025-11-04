<!-- components/Navbar.vue -->
<template>
  <header class="navbar">
    <div class="brand">
      <span class="brand-mark">◎</span>
      <h1>Dashboard</h1>
    </div>

    <div class="search">
      <input type="search" placeholder="Search task" aria-label="Search" />
    </div>

    <nav class="actions">
      <ul>
        <li v-if="!isAuthenticated">
          <NuxtLink to="/login" class="btn btn-text">Login</NuxtLink>
        </li>
        <li v-if="!isAuthenticated">
          <NuxtLink to="/register" class="btn">Register</NuxtLink>
        </li>
        <li v-if="isAuthenticated" class="user-actions">
          <button class="icon-btn" title="Notifications">🔔</button>
          <button class="icon-btn" title="Preferences">⚙️</button>
          <div class="avatar" title="Profile">TM</div>
          <button @click="logout" class="btn">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';

const { isAuthenticated, logout } = useAuth(); // Use global auth state and logout function
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 220px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  min-height: 64px;
  background: var(--surface, #fff);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
}

.brand { display: flex; align-items: center; gap: 10px; }
.brand h1 { font-size: 18px; color: var(--text, #0f172a); margin: 0; }
.brand-mark { color: var(--accent, #16a34a); font-size: 18px; }

.search { align-self: stretch; display: flex; align-items: center; }
.search input {
  width: 100%;
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: var(--surface-2, #f9fafb);
  color: var(--text, #0f172a);
}

.actions { display: flex; justify-content: flex-end; }
.actions ul { display: flex; align-items: center; gap: 10px; list-style: none; margin: 0; padding: 0; }
.user-actions { display: flex; align-items: center; gap: 10px; }
.btn { background: var(--accent, #16a34a); color: #fff; border: none; padding: 8px 14px; border-radius: 10px; cursor: pointer; }
.btn-text { background: transparent; color: var(--text, #0f172a); padding: 8px 10px; border-radius: 8px; }
.icon-btn { background: var(--surface-2, #f3f4f6); border: 1px solid rgba(15,23,42,0.08); height: 40px; width: 40px; border-radius: 12px; cursor: pointer; display: grid; place-items: center; }
.avatar { background: linear-gradient(135deg, var(--accent, #16a34a), #0ea5e9); color: #fff; height: 40px; width: 40px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-weight: 700; }

@media (max-width: 640px) {
  .navbar { grid-template-columns: 1fr auto; gap: 10px; }
  .brand { display: none; }
}
</style>
