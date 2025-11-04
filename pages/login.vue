<template>
  <section class="auth-shell">
    <div class="auth-grid">
      <div class="auth-card glass">
        <h1>Welcome Back</h1>
        <form @submit.prevent="submitLoginForm" class="auth-form">
          <input type="email" v-model="formData.email" placeholder="Email address" required />
          <input type="password" v-model="formData.password" placeholder="Password" required />
          <div class="row between">
            <label class="remember"><input type="checkbox" v-model="rememberMe"/> Remember me</label>
            <a href="#" class="link">Forgot password?</a>
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button>
        </form>

        <div class="muted center small">
          Don’t have an account?
          <NuxtLink to="/register" class="link">Register</NuxtLink>
        </div>

        <div class="social">
          <div class="divider"><span>OR</span></div>
          <button class="btn btn-neutral">Continue with Apple</button>
          <button class="btn btn-neutral">Continue with Google</button>
        </div>
      </div>

      <aside class="auth-side">
        <h2>Dream Team</h2>
        <p>Sign in to manage your children, view schedules, and stay connected with coaches.</p>
      </aside>
    </div>
  </section>
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


<!-- styles moved to assets/auth.css -->
