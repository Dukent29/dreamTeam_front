<!-- pages/parent/schedule.vue -->
<template>
    <div>
      <h1>Schedules</h1>
      <p>This is the schedules page for parents.</p>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'dashboard', // Use the dashboard layout
    middleware: 'role-based-redirect', // Ensure only authorized users access
  });
  </script>
  