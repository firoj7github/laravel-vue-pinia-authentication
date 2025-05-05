<template>
    <div v-if="user">
      <div class="profile-info">
        <!-- <img :src="user.image" alt="User Image" class="profile-image" v-if="user.image" /> -->
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <!-- <p><strong>Address:</strong> {{ user.address || 'Not Provided' }}</p> -->
      </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const user = auth.user;
console.log(user);

</script>

<style  scoped>



</style>