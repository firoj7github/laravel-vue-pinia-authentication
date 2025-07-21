<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
      <h2 class="text-xl font-semibold mb-4" v-if="title">{{ title }}</h2>

      <!-- Default slot for custom content -->
      <slot />

      <!-- Footer slot or default button -->
      <div class="mt-6 flex justify-end space-x-2">
        <slot name="footer">
          <button @click="$emit('close')" class="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
        </slot>
      </div>
    </div>
  </div>
</template>


<script setup>
defineProps({
  title: String
})
defineEmits(['close'])
</script>
