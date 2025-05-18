<template>
    <div class="fixed bottom-0 right-0 z-50 p-4 space-y-2">
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="flex items-center p-4 rounded-lg shadow-lg transform transition-all duration-300"
        :class="{
          'bg-emerald-500 text-white': toast.type === 'success',
          'bg-red-500 text-white': toast.type === 'error',
          'bg-amber-500 text-white': toast.type === 'warning',
          'bg-blue-500 text-white': toast.type === 'info'
        }"
        v-motion
        :initial="{ opacity: 0, x: 100 }"
        :enter="{ opacity: 1, x: 0 }"
        :leave="{ opacity: 0, x: 100 }"
      >
        <div class="mr-3">
          <CheckCircleIcon v-if="toast.type === 'success'" class="w-5 h-5" />
          <ExclamationCircleIcon v-else-if="toast.type === 'error'" class="w-5 h-5" />
          <ExclamationTriangleIcon v-else-if="toast.type === 'warning'" class="w-5 h-5" />
          <InformationCircleIcon v-else class="w-5 h-5" />
        </div>
        <div>{{ toast.message }}</div>
        <button 
          @click="removeToast(toast.id)" 
          class="ml-3 text-white hover:text-gray-200"
        >
          <XMarkIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { 
    CheckCircleIcon, 
    ExclamationCircleIcon, 
    ExclamationTriangleIcon, 
    InformationCircleIcon,
    XMarkIcon
  } from '@heroicons/vue/24/outline';
  import { useToast } from '@/composables/useToast';
  
  const { toasts, removeToast } = useToast();
  </script>