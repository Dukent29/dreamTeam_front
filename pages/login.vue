<template>
  <div class="login-container">
    <div class="form-container">
      <h1>Welcome Back!</h1>
      <form @submit.prevent="submitLoginForm">
        <input
            type="email"
            v-model="formData.email"
            placeholder="Email address"
            required
        />
        <input
            type="password"
            v-model="formData.password"
            placeholder="Password"
            required
        />
        <div class="remember-container">
          <input type="checkbox" v-model="rememberMe"/>
          <label for="rememberMe">Remember me</label>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>
        <button type="submit" class="button primary-button">Sign In</button>
      </form>

      <div class="register-link">
        <p>Don't have an account?
          <NuxtLink to="/register">Register here</NuxtLink>
        </p>
      </div>

      <div class="social-login">
        <p>OR</p>
        <button class="button apple-login">Continue with Apple</button>
        <button class="button google-login">Continue with Google</button>
      </div>
    </div>
    <div class="text-container">
      <h1>Welcome to Dream Team</h1>
      <p>Your journey to connecting with the football association continues. Login to stay in touch with us.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { useRuntimeConfig } from '#app';
import { useAuth } from '~/composables/useAuth';

const { login } = useAuth(); // Get login function from the composable

const formData = ref({
  email: '',
  password: '',
});

const rememberMe = ref(false);
const error = ref('');
const config = useRuntimeConfig();
const router = useRouter();

const submitLoginForm = async () => {
  try {
    // Use $fetch to make a login request
    const data = await $fetch(`${config.public.apiBaseUrl}/auth/login`, {
      method: 'POST',
      body: {
        email: formData.value.email,
        password: formData.value.password,
      },
    });

    // Assuming the token and role are returned in the response
    const token = data.token;
    const role = data.role;

    // Debug: Make sure we are getting the right values
    console.log('Token:', token);
    console.log('Role:', role);

    // Use the login function to store the token and role
    login(token, role, rememberMe.value);

    // Force the DOM to update before performing redirection
    await nextTick();

    // Redirect based on role
    if (role === 'parent') {
      await router.push('/parent');
    } else if (role === 'admin') {
      await router.push('/admin');
    } else if (role === 'coach') {
      await router.push('/coach');
    }

    console.log('Login successful! Redirecting...');
  } catch (err) {
    error.value = err.message || 'Login failed';
  }
};
</script>


<style scoped>
/* Add your styling here */
</style>
