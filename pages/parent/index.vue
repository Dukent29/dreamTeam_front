<template>
  <div>
    <div v-if="isAuthenticated" class="parent-dash">
      <!-- Header -->
      <div class="header-row">
        <div>
          <h1>Parent Dashboard</h1>
          <p class="sub">Plan, track, and manage your children with ease.</p>
        </div>
        <div class="header-actions">
          <button class="btn-secondary">Import</button>
          <button class="btn-primary" @click="openModal">+ Add Child</button>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid">
        <section class="main">
          <!-- Metrics row -->
          <div class="metrics">
            <div class="metric emphasis">
              <div class="metric-top">
                <span class="metric-title">Total Children</span>
                <span class="metric-badge">↗</span>
              </div>
              <div class="metric-value">{{ totalChildren }}</div>
              <div class="metric-sub">From all your registrations</div>
            </div>
            <div class="metric glass">
              <div class="metric-top">
                <span class="metric-title">Categories</span>
                <span class="metric-badge">#</span>
              </div>
              <div class="metric-value">{{ uniqueCategories }}</div>
              <div class="metric-sub">Unique categories</div>
            </div>
            <div class="metric glass">
              <div class="metric-top">
                <span class="metric-title">Avg Age</span>
                <span class="metric-badge">👤</span>
              </div>
              <div class="metric-value">{{ averageAge }}</div>
              <div class="metric-sub">Years old on average</div>
            </div>
            <div class="metric glass">
              <div class="metric-top">
                <span class="metric-title">Coaches</span>
                <span class="metric-badge">⚽</span>
              </div>
              <div class="metric-value">{{ uniqueCoaches }}</div>
              <div class="metric-sub">Assigned coaches</div>
            </div>
          </div>

          <!-- Stats / analytics placeholder (glass) -->
          <div class="glass card analytics">
            <div class="card-title">Children Stats</div>
            <div class="bars">
              <div v-for="(v, i) in barHeights" :key="i" class="bar" :style="{ height: v + '%' }" />
            </div>
            <div class="legend">
              <span v-for="l in ['S','M','T','W','T','F','S']" :key="l">{{ l }}</span>
            </div>
          </div>

          <!-- Reminders -->
          <div class="glass card reminders">
            <div class="card-title">Reminders</div>
            <div class="reminder">
              <div>
                <div class="rem-title">Meeting with Coach</div>
                <div class="rem-sub">Today • 2:00pm – 4:00pm</div>
              </div>
              <button class="btn-primary">Start</button>
            </div>
          </div>
        </section>

        <!-- Side column: children list -->
        <aside class="side">
          <div class="glass card list">
            <div class="card-title-row">
              <div class="card-title">Children</div>
              <button class="chip" @click="openModal">+ New</button>
            </div>
            <ul class="child-list" v-if="children.length">
              <li v-for="child in children" :key="child.child_id">
                <div class="avatar small">{{ child.first_name?.charAt(0) }}{{ child.last_name?.charAt(0) }}</div>
                <div class="info">
                  <div class="name">{{ child.first_name }} {{ child.last_name }}</div>
                  <div class="note">Coach: {{ child.coach_first_name }} {{ child.coach_last_name }}</div>
                </div>
              </li>
            </ul>
            <div v-else class="empty">No children yet.</div>
          </div>
        </aside>
      </div>

      <!-- Add Child Modal -->
      <Modal v-if="isModalOpen" @close="closeModal">
        <template #title>Add a Child</template>
        <template #body>
          <AddChildForm @childAdded="afterAdd" />
        </template>
      </Modal>
    </div>

    <div v-else>
      <p>Please log in to access the dashboard.</p>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
import AddChildForm from '~/components/AddChildForm.vue';
import Modal from '~/components/Modal.vue';
import { useRuntimeConfig } from '#app';

definePageMeta({
  layout: 'dashboard', // Use the dashboard layout
  middleware: 'role-based-redirect',
});

// Auth and data
const { isAuthenticated } = useAuth();
const config = useRuntimeConfig();
const isModalOpen = ref(false);
const children = ref([]);

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
    if (!error.value) children.value = data.value || [];
  } catch (e) {
    // noop
  }
};

onMounted(fetchChildren);

const openModal = () => { isModalOpen.value = true; };
const closeModal = () => { isModalOpen.value = false; };
const afterAdd = () => { closeModal(); fetchChildren(); };

// Derived metrics
const totalChildren = computed(() => children.value.length);
const uniqueCategories = computed(() => new Set(children.value.map(c => c.category_id)).size || 0);
const uniqueCoaches = computed(() => new Set(children.value.map(c => `${c.coach_first_name} ${c.coach_last_name}`.trim())).size || 0);
const averageAge = computed(() => {
  if (!children.value.length) return 0;
  const sum = children.value.reduce((acc, c) => acc + (Number(c.age) || 0), 0);
  return Math.round((sum / children.value.length) * 10) / 10;
});

// Simple analytics placeholder heights
const barHeights = computed(() => {
  const base = [48, 72, 64, 80, 50, 62, 70];
  const factor = Math.min(1.5, 0.8 + totalChildren.value * 0.05);
  return base.map(v => Math.min(100, Math.round(v * factor)));
});
</script>

<style scoped>
/* Header */
.header-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 16px; }
.sub { color: var(--muted, #64748b); margin: 4px 0 0; }
.header-actions { display: flex; gap: 10px; }
.btn-primary { background: var(--accent, #16a34a); color: #fff; border: none; padding: 10px 14px; border-radius: 10px; }
.btn-secondary { background: var(--surface-2, #f3f4f6); color: var(--text, #0f172a); border: 1px solid rgba(15,23,42,0.06); padding: 10px 14px; border-radius: 10px; }
.chip { background: var(--surface-2, rgba(255,255,255,0.8)); border: 1px solid rgba(15,23,42,0.08); padding: 6px 10px; border-radius: 999px; cursor: pointer; color: var(--text, #0f172a); }

/* Grid */
.grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
.main { display: grid; gap: 20px; }
.side { display: grid; gap: 20px; }

/* Metric cards */
.metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.metric { position: relative; border-radius: 16px; padding: 16px; background: rgba(255,255,255,0.55); border: 1px solid rgba(255,255,255,0.28); box-shadow: 0 10px 30px rgba(16,24,40,0.12); color: #0f172a; backdrop-filter: blur(14px) saturate(140%); -webkit-backdrop-filter: blur(14px) saturate(140%); }
.metric.emphasis { 
  /* Accent gradient for importance, works with any role accent */
  background: linear-gradient(135deg, var(--accent, #16a34a) 0%, rgba(0,0,0,0.25) 100%);
  color: #fff;
  border-color: rgba(255,255,255,0.2);
  backdrop-filter: none; /* solid accent focus */
}
.metric.emphasis .metric-title,
.metric.emphasis .metric-sub { color: rgba(255,255,255,0.85); }
.metric.emphasis .metric-badge { background: rgba(255,255,255,0.22); border-color: rgba(255,255,255,0.25); color: #fff; }
.metric-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.metric-title { color: var(--muted, #64748b); font-size: 12px; }
.metric-badge { height: 28px; width: 28px; border-radius: 999px; display: grid; place-items: center; background: var(--surface-2, #f3f4f6); border: 1px solid rgba(15,23,42,0.06); }
.metric-value { font-size: 28px; font-weight: 800; }
.metric-sub { color: var(--muted, #64748b); font-size: 12px; margin-top: 6px; }

/* Cards */
.card { border-radius: 16px; padding: 16px; border: 1px solid rgba(255,255,255,0.28); background: rgba(255,255,255,0.55); box-shadow: 0 10px 30px rgba(16,24,40,0.12); }
.glass { backdrop-filter: blur(14px) saturate(140%); -webkit-backdrop-filter: blur(14px) saturate(140%); position: relative; overflow: hidden; }
.glass::before { content: ''; position: absolute; inset: -40% -20% auto -20%; height: 60%; background: linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 60%, transparent 100%); transform: rotate(-8deg); pointer-events: none; }
.card-title { font-weight: 700; margin-bottom: 10px; }
.card-title-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }

/* Analytics */
.analytics { min-height: 180px; }
.bars { display: grid; grid-auto-flow: column; align-items: end; gap: 12px; height: 120px; margin-top: 8px; }
.bar { width: 24px; border-radius: 12px; background: linear-gradient(180deg, var(--accent,#16a34a), rgba(22,163,74,0.2)); }
.legend { display: grid; grid-auto-flow: column; gap: 12px; color: var(--muted,#64748b); font-size: 12px; justify-content: start; margin-top: 10px; }

/* Reminders */
.reminders .reminder { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.rem-title { font-weight: 700; }
.rem-sub { color: var(--muted,#64748b); font-size: 12px; }

/* Children list */
.child-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 12px; }
.child-list li { display: grid; grid-template-columns: 40px 1fr; align-items: center; gap: 10px; padding: 8px; border-radius: 12px; border: 1px solid rgba(15,23,42,0.06); background: rgba(255,255,255,0.6); }
.avatar.small { height: 36px; width: 36px; border-radius: 10px; display: grid; place-items: center; font-weight: 700; color: #fff; background: linear-gradient(135deg, var(--accent, #16a34a), #0ea5e9); }
.info .name { font-weight: 600; }
.note { color: var(--muted,#64748b); font-size: 12px; }

@media (max-width: 1024px) {
  .grid { grid-template-columns: 1fr; }
  .metrics { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .metrics { grid-template-columns: 1fr; }
}
</style>
