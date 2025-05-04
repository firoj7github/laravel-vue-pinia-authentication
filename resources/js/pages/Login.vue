<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login Page</h2>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <input
            type="email"
            v-model="email"
            placeholder="Email"
            class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div v-if="auth.error?.email" class="text-red-500 text-sm mt-0.5">
      {{ auth.error.email[0] }}
        </div>
        <div>
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            class="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div v-if="auth.error?.password" class="text-red-500 text-sm mt-0.5">
      {{ auth.error.password[0] }}
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>


<script setup>
import {ref} from 'vue'
import {useAuthStore} from '../stores/auth'
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const router = useRouter();
const toast = useToast();
const email = ref('');
const password = ref('');
const auth = useAuthStore();

const login = async ()=>{
  await auth.login(email.value, password.value)
  if (auth.token){
    toast.success('Login Successful');
    await router.push('/profile');
  }
}
</script>

<style lang="scss" scoped>

</style>