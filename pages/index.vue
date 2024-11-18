<!-- pages/index.vue -->
<template>
    <div class="container">
      <h1>Welcome to DreamTeam</h1>
      <p>Your gateway to the football association app for kids.</p>
      <div class="buttons">
        <NuxtLink to="/register" class="button">Register</NuxtLink>
        <NuxtLink to="/login" class="button">Login</NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  /* Simple styling for the page */
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f0f2f5;
    text-align: center;
  }
  
  h1 {
    font-size: 3rem;
    color: #2c3e50;
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .buttons {
    display: flex;
    gap: 1rem;
  }
  
  .button {
    padding: 10px 20px;
    font-size: 1.1rem;
    background-color: #3498db;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s;
  }
  
  .button:hover {
    background-color: #2980b9;
  }
  </style>
  