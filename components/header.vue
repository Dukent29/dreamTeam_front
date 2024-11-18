<template>
  <header class="main-header">
    <div class="container">
      <NuxtLink to="/" class="logo">Dream Team</NuxtLink>

      <nav>
        <ul>
          <li v-if="!isAuthenticated">
            <NuxtLink to="/login">Login</NuxtLink>
          </li>
          <li v-if="!isAuthenticated">
            <NuxtLink to="/register">Register</NuxtLink>
          </li>
          <li v-if="isAuthenticated">
            <button @click="logout" class="logout-button">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';

const { isAuthenticated, logout } = useAuth(); // Use global auth state and logout function
</script>

<style scoped>
/* Add your styling here */
</style>
