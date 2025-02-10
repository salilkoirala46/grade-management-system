import { defineStore } from 'pinia';
import { ref } from 'vue';
import { supabase } from '../supabase/client';
import type { User } from '@supabase/supabase-js';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const loading = ref(false);

  async function initializeAuth() {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error fetching session:', error)
      return
    }
    user.value = data.session?.user ?? null
  }

  async function login(email: string, password: string) {
    try {
      loading.value = true;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      user.value = data.user;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function register(email: string, password: string) {
    try {
      loading.value = true;
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) throw error;
      user.value = data.user;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    try {
      loading.value = true;
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      user.value = null;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  }

  return {
    user,
    loading,
    login,
    register,
    logout,
    initializeAuth
  };
});