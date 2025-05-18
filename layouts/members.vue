<template>
    <div class="min-h-screen flex flex-col bg-gray-50">
      <header class="bg-white shadow-md">
        <div class="container mx-auto px-4">
          <div class="flex justify-between items-center py-4">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <Icon name="mdi:church" class="text-indigo-600 text-3xl" />
              <span class="text-xl font-bold text-indigo-800">ChurchConnect</span>
            </NuxtLink>
            
            <div class="hidden md:flex items-center space-x-6">
              <NuxtLink to="/" class="nav-link">Home</NuxtLink>
              <NuxtLink to="/group-management" class="nav-link">Group Management</NuxtLink>
              <NuxtLink to="/automated-followups" class="nav-link">Automated Follow-ups</NuxtLink>
            </div>
            
            <div class="flex items-center space-x-4">
              <button class="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Icon name="mdi:bell" class="text-gray-600 text-xl" />
              </button>
              <div class="relative">
                <button class="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                    JD
                  </div>
                  <span class="hidden md:inline text-gray-700">John Doe</span>
                </button>
              </div>
            </div>
            
            <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2">
              <Icon name="mdi:menu" class="text-gray-700 text-2xl" />
            </button>
          </div>
        </div>
      </header>
      
      <!-- Mobile menu -->
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 z-50 animate-slide-down">
        <div class="container mx-auto px-4 py-4">
          <div class="flex flex-col space-y-3">
            <NuxtLink to="/" class="mobile-nav-link" @click="isMobileMenuOpen = false">Home</NuxtLink>
            <NuxtLink to="/group-management" class="mobile-nav-link" @click="isMobileMenuOpen = false">Group Management</NuxtLink>
            <NuxtLink to="/automated-followups" class="mobile-nav-link" @click="isMobileMenuOpen = false">Automated Follow-ups</NuxtLink>
          </div>
        </div>
      </div>
      
      <main class="flex-grow">
        <slot />
      </main>
      
      <footer class="bg-indigo-900 text-white py-8">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-xl font-bold mb-4">ChurchConnect</h3>
              <p class="text-indigo-200">Empowering churches to build stronger communities through technology.</p>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
              <ul class="space-y-2">
                <li><NuxtLink to="/" class="text-indigo-200 hover:text-white transition-colors">Dashboard</NuxtLink></li>
                <li><NuxtLink to="/group-management" class="text-indigo-200 hover:text-white transition-colors">Group Management</NuxtLink></li>
                <li><NuxtLink to="/automated-followups" class="text-indigo-200 hover:text-white transition-colors">Automated Follow-ups</NuxtLink></li>
              </ul>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4">Contact</h3>
              <p class="text-indigo-200">support@churchconnect.com</p>
              <p class="text-indigo-200">+1 (555) 123-4567</p>
            </div>
          </div>
          <div class="mt-8 pt-6 border-t border-indigo-800 text-center text-indigo-300">
            <p>© 2025 ChurchConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup lang="ts">
  const isMobileMenuOpen = ref(false);
  
  // Close mobile menu when route changes
  watch(() => useRoute().path, () => {
    isMobileMenuOpen.value = false;
  });
  </script>
  
  <style scoped>
  .nav-link {
    @apply text-gray-700 hover:text-indigo-600 font-medium transition-colors;
  }
  
  .nav-link.router-link-active {
    @apply text-indigo-600 font-semibold;
  }
  
  .mobile-nav-link {
    @apply block py-2 px-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors;
  }
  
  .animate-slide-down {
    animation: slideDown 0.3s ease-out;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>