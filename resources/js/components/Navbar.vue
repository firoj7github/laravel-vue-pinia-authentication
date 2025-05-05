<template>
    <nav class="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <!-- Logo -->
          <div class="text-xl font-bold text-blue-600">
            MyApp
          </div>
  
          <!-- Desktop Menu -->
          <div class="hidden md:flex space-x-6">
            
            <RouterLink v-if="!auth.token" to="/login" class="text-gray-700 hover:text-blue-600 transition">About</RouterLink>
            <button v-if="auth.token" @click="handleLogout" class="bg-red-500 text-white px-4 py-2 rounded-xl">
            Logout
           </button>
          </div>
  
          <!-- Mobile Menu Button -->
          <button @click="menuOpen = !menuOpen" class="md:hidden text-gray-600 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
              <path v-if="!menuOpen" d="M4 6h16M4 12h16M4 18h16"/>
              <path v-else d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
  
      <!-- Mobile Menu -->
      <div v-if="menuOpen" class="md:hidden bg-white shadow-md">
        
        <RouterLink to="/login" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">login</RouterLink>
        <button v-if="auth.token" @click="handleLogout" class="bg-red-500 text-white px-4 py-2 rounded-xl">
            Logout
           </button>
        
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref } from 'vue'
import { useAuthStore } from '../stores/auth';
import { useToast } from 'vue-toastification';
  
  const auth = useAuthStore();
  const toast = useToast();
  
  const menuOpen = ref(false)

  const handleLogout = async()=>{
    auth.logout();
    toast.success(auth.success)
    await router.push('/login');
  }
  </script>
  
  <style scoped>
  /* Optional padding for layout */
  body {
    padding-top: 4rem;
  }
  </style>
  