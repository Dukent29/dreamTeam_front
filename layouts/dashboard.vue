<!-- layouts/dashboard.vue -->
<template>
  <!-- Bind theme to role so we can vary accents per role later -->
  <div class="dashboard-layout" :data-theme="theme">
    <Navbar />
    <div class="main-content">
      <Sidebar />
      <div class="content-area">
        <NuxtPage />
      </div>
    </div>
  </div>
  
  
</template>

<script setup>
import Sidebar from '~/components/Sidebar.vue';
import Navbar from '~/components/Navbar.vue';
import { useAuth } from '~/composables/useAuth';

const { role } = useAuth();
const theme = computed(() => role.value || 'default');
</script>

<style scoped>
/* Layout shell uses a modern light surface while keeping role accents configurable */
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: var(--app-bg, #f5f7fa);
}

.main-content {
  flex: 1;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 20px;
  padding: 100px;
}

.content-area {
  flex: 1;
  background: var(--surface, #ffffff);
  border-radius: 16px;
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 6px 24px rgba(16, 24, 40, 0.06);
  padding: 40px!important;
}

/* Role-aware theme hooks; colors can be tuned per brand later */
:host, .dashboard-layout[data-theme="default"] {
  --accent: #16a34a; /* green */
  --surface: #ffffff;
  --surface-2: #f9fafb;
  --text: #0f172a;
  --muted: #64748b;
  --app-bg: #f5f7fa;
}
.dashboard-layout[data-theme="parent"] {
  --accent: #16a34a;
}
.dashboard-layout[data-theme="coach"] {
  --accent: #2563eb; /* blue */
}
.dashboard-layout[data-theme="admin"] {
  --accent: #9333ea; /* purple */
}

@media (max-width: 1024px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}
</style>
