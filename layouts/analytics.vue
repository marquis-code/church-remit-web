<template>
    <div class="min-h-screen bg-gray-50">
    <AppSidebar />
      <div class="lg:pl-64">
        <header class="sticky top-0 z-10 bg-white shadow-sm">
          <div class="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div class="flex items-center gap-x-3">
              <button 
                type="button" 
                class="lg:hidden -m-2.5 p-2.5 text-gray-700"
                @click="$emit('toggle-sidebar')"
              >
                <span class="sr-only">Open sidebar</span>
                <Menu class="h-6 w-6" aria-hidden="true" />
              </button>
              <h1 class="text-xl font-semibold text-gray-900">Analytics & Reporting</h1>
            </div>
            <div class="flex items-center gap-x-4">
              <div class="relative">
                <button 
                  @click="showNotifications = !showNotifications"
                  class="relative rounded-full bg-white p-1 text-gray-700 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <span class="sr-only">View notifications</span>
                  <Bell class="h-6 w-6" />
                  <span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">3</span>
                </button>
                
                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-95"
                >
                  <div v-if="showNotifications" class="absolute right-0 mt-2 w-80 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div class="px-4 py-2 text-sm font-medium text-gray-700 border-b">Notifications</div>
                    <div v-for="(notification, index) in notifications" :key="index" class="px-4 py-2 hover:bg-gray-100">
                      <p class="text-sm font-medium text-gray-900">{{ notification.title }}</p>
                      <p class="text-xs text-gray-500">{{ notification.time }}</p>
                    </div>
                  </div>
                </transition>
              </div>
              
              <div class="relative">
                <button 
                  @click="showUserMenu = !showUserMenu"
                  class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/men/42.jpg" alt="User avatar" />
                </button>
                
                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="opacity-0 scale-95"
                  enter-to-class="opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-150"
                  leave-from-class="opacity-100 scale-100"
                  leave-to-class="opacity-0 scale-95"
                >
                  <div v-if="showUserMenu" class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </header>
        
        <main class="p-4 sm:p-6 lg:p-8">
          <slot />
        </main>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { Menu, Bell } from 'lucide-vue-next';
  
  const showNotifications = ref(false);
  const showUserMenu = ref(false);
  
  const notifications = [
    { title: 'New donation received', time: '5 minutes ago' },
    { title: 'Monthly financial report ready', time: '1 hour ago' },
    { title: 'Unusual expense pattern detected', time: '3 hours ago' }
  ];
  
  // Close dropdowns when clicking outside
  const closeDropdowns = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.relative')) {
      showNotifications.value = false;
      showUserMenu.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', closeDropdowns);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdowns);
  });
  </script>