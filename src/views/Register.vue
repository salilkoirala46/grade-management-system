<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <InputText
              id="email-address"
              v-model="email"
              type="email"
              required
              class="w-full"
              placeholder="Email address"
            />
          </div>
          <div class="mt-4">
            <label for="password" class="sr-only">Password</label>
            <Password
              id="password"
              v-model="password"
              required
              class="w-full"
              placeholder="Password"
              :feedback="false"
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            label="Sign up"
            class="w-full"
            :loading="authStore.loading"
          />
        </div>
      </form>
      <div class="text-center">
        <router-link to="/login" class="text-sm text-blue-600 hover:text-blue-500">
          Already have an account? Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

const router = useRouter();
const authStore = useAuthStore();
const email = ref('');
const password = ref('');

async function handleSubmit() {
  try {
    await authStore.register(email.value, password.value);
    router.push('/');
  } catch (error) {
    console.error('Registration error:', error);
  }
}
</script>