<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
            <div class="flex flex-col gap-1">
              <InputText 
                  id="email-address"
                  v-model="email"
                  type="email"
                  required
                  placeholder="Email address"
                />
          </div>
          <div class="flex flex-col gap-1">
              <InputText 
                id="password"
                v-model="password"
                required
                placeholder="Password"
                :feedback="false"
                />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            label="Sign in"
            class="w-full"
            :loading="authStore.loading"
          />
        </div>
      </form>
      <div class="text-center">
        <router-link to="/register" class="text-sm text-blue-600 hover:text-blue-500">
          Don't have an account? Sign up
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
    await authStore.login(email.value, password.value);
    router.push('/');
  } catch (error) {
    console.error('Login error:', error);
  }
}
</script>