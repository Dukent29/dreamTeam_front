<template>
  <div class="register-container">
    <div class="form-container">
      <h1>Create Your Account</h1>
      <form @submit.prevent="submitForm">
        <input
            type="text"
            v-model="formData.first_name"
            placeholder="First Name"
            required
        />
        <input
            type="text"
            v-model="formData.last_name"
            placeholder="Last Name"
            required
        />
        <input
            type="text"
            v-model="formData.name"
            placeholder="Username"
            required
        />
        <input
            type="email"
            v-model="formData.email"
            placeholder="Email"
            required
        />
        <input
            type="password"
            v-model="formData.password"
            placeholder="Password"
            required
        />
        <input
            type="password"
            v-model="confirmPassword"
            placeholder="Confirm Password"
            required
        />
        <div v-if="passwordMismatch" class="error">
          Passwords do not match.
        </div>
        <div class="gdpr-container">
          <input type="checkbox" v-model="acceptGdpr" required />
          <label for="acceptGdpr">I accept the RGPD rules</label>
        </div>
        <button type="submit" class="button primary-button">Register</button>
      </form>

      <div class="login-link">
        <p>Already have an account? <NuxtLink to="/login">Login here</NuxtLink></p>
      </div>

      <div class="social-login">
        <p>OR</p>
        <button class="button apple-login">Continue with Apple</button>
        <button class="button google-login">Continue with Google</button>
      </div>
    </div>
    <div class="text-container">
      <h1>Welcome to Dream Team</h1>
      <p>Your journey to connecting with the football association starts here. Join us and be part of the Dream Team family.</p>
    </div>
  </div>
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

