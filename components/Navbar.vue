<!-- components/Navbar.vue -->
<template>
  <header class="navbar">
    <h1>Dashboard</h1>
    <!-- Add user profile, notifications, etc. -->
    <nav>
      <ul>
        <li v-if="!isAuthenticated">
          <NuxtLink to="/login">Login</NuxtLink>
        </li>
        <li v-if="!isAuthenticated">
          <NuxtLink to="/register">Register</NuxtLink>
        </li>
        <li class="navbarlinks" v-if="isAuthenticated">
            <a href="">search icon</a>
            <a href="">preference</a>
            <a href="">profile picture</a>
          <button @click="logout" class="logout-button">Logout</button>
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
  background-color: #2e2e2e;
  color: white;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  padding-right: 40px;
}
.navbarlinks{
  gap: 1rem;
  display: flex;
}
</style>
