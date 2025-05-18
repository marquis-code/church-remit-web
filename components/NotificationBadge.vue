<template>
    <div class="relative">
      <button 
        @click="isOpen = !isOpen"
        class="relative rounded-full bg-white p-1 text-gray-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <span class="sr-only">{{ label }}</span>
        <component :is="icon" class="h-6 w-6" />
        <span v-if="count > 0" class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
          {{ count > 99 ? '99+' : count }}
        </span>
      </button>
      
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div v-if="isOpen" class="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div class="px-4 py-2 text-sm font-medium text-gray-700 border-b">{{ title }}</div>
          <div v-if="items.length === 0" class="px-4 py-6 text-center text-sm text-gray-500">
            No notifications
          </div>
          <div v-else v-for="(item, index) in items" :key="index" class="px-4 py-2 hover:bg-gray-100">
            <p class="text-sm font-medium text-gray-900">{{ item.title }}</p>
            <p class="text-xs text-gray-500">{{ item.time }}</p>
          </div>
          <div v-if="items.length > 0" class="border-t px-4 py-2">
            <button class="text-sm text-purple-600 hover:text-purple-800 font-medium">
              View all
            </button>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  interface NotificationItem {
    title: string;
    time: string;
  }
  
  interface Props {
    icon: any;
    count: number;
    items: NotificationItem[];
    label?: string;
    title?: string;
  }
  
  const props = withDefaults(defineProps<Props>(), {
    label: 'View notifications',
    title: 'Notifications'
  });
  
  const isOpen = ref(false);
  
  // Close dropdown when clicking outside
  const closeDropdown = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative')) {
      isOpen.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', closeDropdown);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdown);
  });
  </script>