

<template>
  <div v-if="user" class="max-w-md mx-auto mt-10">
    <div class="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">👤 User Profile</h2>
      <p class="text-gray-600"><span class="font-semibold">Name:</span> {{ user.name }}</p>
      <p class="text-gray-600"><span class="font-semibold">Email:</span> {{ user.email }}</p>
      <button @click="handleUpdate"
        class="w-full bg-blue-600 text-white py-2 px-4 mt-3 rounded-lg hover:bg-blue-700 transition">
        ✏️ Update Profile
      </button>
    </div>
  </div>

  <!-- 🔽 Update Modal -->
<div
  v-if="showModal"
  class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
>
  <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
    <h3 class="text-xl font-semibold mb-4 text-gray-800">Update Profile</h3>

    <form @submit.prevent="updateProfile">
      <label class="block mb-2">
        <span class="text-gray-700">Name</span>
        <input v-model="editName" type="text" class="w-full mt-1 p-2 border rounded" />
      </label>

      <label class="block mb-4">
        <span class="text-gray-700">Email</span>
        <input v-model="editEmail" type="email" class="w-full mt-1 p-2 border rounded" />
      </label>

      <div class="flex justify-end space-x-2">
        <button type="button" @click="showModal = false" class="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
        <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
      </div>
    </form>

    
  </div>
</div>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';


const auth = useAuthStore();
const { user } = storeToRefs(auth);
onMounted(async ()=>{
  await auth.init();
});

const showModal = ref(false);
const editName = ref('');
const editEmail = ref('');
const handleUpdate= ()=>{
  showModal.value = true;
  editName.value = user.value.name;
  editEmail.value = user.value.email;
}

const updateProfile = async()=>{
  await auth.profileUpdate({
    name: editName.value,
    email: editEmail.value
  })
  showModal.value= false;
}


</script>
