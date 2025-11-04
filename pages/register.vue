<template>
  <section class="auth-shell">
    <div class="auth-grid">
      <div class="auth-card glass">
        <h1>Create Your Account</h1>
        <form @submit.prevent="submitForm" class="auth-form">
          <input type="text" v-model="formData.first_name" placeholder="First Name" required />
          <input type="text" v-model="formData.last_name" placeholder="Last Name" required />
          <input type="text" v-model="formData.name" placeholder="Username" required />
          <input type="email" v-model="formData.email" placeholder="Email" required />
          <input type="password" v-model="formData.password" placeholder="Password" required />
          <input type="password" v-model="confirmPassword" placeholder="Confirm Password" required />
          <div v-if="passwordMismatch" class="error-text">Passwords do not match.</div>
          <label class="remember"><input type="checkbox" v-model="acceptGdpr" required /> I accept the RGPD rules</label>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>

        <div class="muted center small">
          Already have an account? <NuxtLink to="/login" class="link">Login</NuxtLink>
        </div>

        <div class="social">
          <div class="divider"><span>OR</span></div>
          <button class="btn btn-neutral">Continue with Apple</button>
          <button class="btn btn-neutral">Continue with Google</button>
        </div>
      </div>

      <aside class="auth-side">
        <h2>Join Dream Team</h2>
        <p>Create an account to add children, follow schedules, and collaborate with coaches.</p>
      </aside>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

const formData = ref({
  first_name: '',
  last_name: '',
  name: '',
  email: '',
  password: '',
  role: 'parent',
});

const confirmPassword = ref(''); // Track the confirm password field
const acceptGdpr = ref(false);   // Track GDPR checkbox state
const passwordMismatch = ref(false); // Track if passwords match
const error = ref('');
const success = ref('');
const config = useRuntimeConfig();

const submitForm = async () => {
  if (!acceptGdpr.value) {
    error.value = 'You must accept the RGPD rules to register.';
    return;
  }

  // Check if passwords match
  if (formData.value.password !== confirmPassword.value) {
    passwordMismatch.value = true;
    return;
  } else {
    passwordMismatch.value = false;
  }

  try {
    const {data, error: fetchError} = await useFetch(
        `${config.public.apiBaseUrl}/auth/register`,
        {
          method: 'POST',
          body: formData.value,
        }
    );

    if (fetchError.value) {
      throw new Error(fetchError.value.message);
    }

    success.value = 'Registration successful!';
    error.value = '';
  } catch (err) {
    error.value = err.message || 'Registration failed';
  }
};
</script>
<!-- styles moved to assets/auth.css -->
