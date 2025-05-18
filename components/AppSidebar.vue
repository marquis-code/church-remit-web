<template>
  <div
    :class="[
      'fixed inset-y-0 z-50 flex w-64 flex-col transition-all duration-300 lg:left-0',
      isOpen ? 'left-0' : '-left-64'
    ]"
  >
    <!-- Sidebar backdrop for mobile -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-gray-900/80 lg:hidden"
      @click="isOpen = false"
    ></div>

    <!-- Sidebar content -->
    <div class="flex h-full flex-col overflow-y-auto bg-white shadow-lg">
      <!-- Logo -->
      <div class="flex h-16 items-center border-b border-gray-200 px-6">
        <div class="flex items-center gap-2">
          <div class="rounded-full bg-purple-600 p-1.5">
            <Church class="h-5 w-5 text-white" />
          </div>
          <span class="text-xl font-semibold text-gray-900">ChurchRemit</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 space-y-1 px-4 py-4 overflow-y-auto">
        <div v-for="(section, i) in navigation" :key="i" class="py-2">
          <!-- Section header with toggle button and navigation -->
          <div class="flex w-full items-center justify-between">
            <NuxtLink 
              :to="section.href || '#'"
              class="flex-grow px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700"
              :class="[isActiveSectionRoute(section.href) ? 'text-purple-700' : '']"
              @click.prevent="navigateToSection(section, i)"
            >
              <span>{{ section.name }}</span>
            </NuxtLink>
            <button 
              @click.stop="toggleSection(i)"
              class="px-2 py-2"
            >
              <ChevronDown 
                :class="[
                  'h-4 w-4 transition-transform duration-200',
                  expandedSectionIndex === i ? 'rotate-180' : ''
                ]" 
              />
            </button>
          </div>
          
          <!-- Dropdown content with animation -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="transform translate-y-0 opacity-100"
            leave-to-class="transform -translate-y-2 opacity-0"
          >
            <div v-show="expandedSectionIndex === i" class="mt-1 space-y-1 overflow-hidden">
              <NuxtLink
                v-for="item in section.items"
                :key="item.name"
                :to="item.href"
                class="group flex items-center px-3 py-2 text-sm font-medium rounded-md ml-2"
                :class="[
                  isActiveRoute(item.href)
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                ]"
              >
                <component :is="item.icon" class="mr-3 h-5 w-5 flex-shrink-0" :class="[
                  isActiveRoute(item.href)
                    ? 'text-purple-600'
                    : 'text-gray-500'
                ]" />
                {{ item.name }}
              </NuxtLink>
            </div>
          </transition>
        </div>
      </nav>

      <!-- User profile -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/men/42.jpg"
            alt="User avatar"
            class="h-10 w-10 rounded-full"
          />
          <div>
            <p class="text-sm font-medium text-gray-900">Pastor John Doe</p>
            <p class="text-xs text-gray-500">Admin</p>
          </div>

          <div>
            <button
              @click="showBLogoutModal = true"
              class="flex items-center px-4 py-3 text-[#1D2739]  space-x-3"
            >
            <img :src="dynamicIcons('logout-icon')" alt="" />
              <!-- <span>Logout</span> -->
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile menu button -->
  <button
    type="button"
    class="fixed bottom-4 right-4 z-50 rounded-full bg-purple-600 p-3 text-white shadow-lg lg:hidden"
    @click="isOpen = !isOpen"
  >
    <Menu v-if="!isOpen" class="h-6 w-6" />
    <X v-else class="h-6 w-6" />
  </button>

  <CoreModal
    :isOpen="showBLogoutModal"
    @close="showBLogoutModal = false"
    >
    <div class="bg-white rounded-xl max-w-sm w-full text-center">
      <!-- Icon -->
      <div class="flex justify-center items-center bg-yellow-500 rounded-full w-16 h-16 mx-auto mb-4">
        <svg width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.921875" width="63.1513" height="64" rx="31.5756" fill="#F3A218"/>
          <path d="M42.2031 32.375C42.2031 26.8521 37.7259 22.375 32.2031 22.375C26.6803 22.375 22.2031 26.8521 22.2031 32.375C22.2031 37.8978 26.6803 42.375 32.2031 42.375C37.7259 42.375 42.2031 37.8978 42.2031 32.375Z" stroke="white" stroke-width="1.5"/>
          <path d="M32.4453 37.375V32.375C32.4453 31.9036 32.4453 31.6679 32.2988 31.5214C32.1524 31.375 31.9167 31.375 31.4453 31.375" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M32.1953 28.377H32.2043" stroke="white" stroke-width="3.25" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          
      </div>
      
      <!-- Title -->
      <h2 class="text-lg font-semibold text-gray-700 mb-2">Logout</h2>

      <!-- Message -->
      <p class="text-gray-500 mb-6">Are you sure you want to logout?</p>

      <!-- Buttons -->
      <div class="space-y-3">
        <button
          type="button"
          class="w-full disabled:cursor-not-allowed text-sm disabled:opacity-25 bg-[#292929] text-white py-3.5 rounded-md font-semibold"
          @click="onConfirm"
          :disabled="loading"
        >
          Yes, log out
        </button>
        <button
        type="button"
          class="w-full bg-[#EBE5E0] text-gray-700 text-sm py-3.5 rounded-md font-semibold"
          @click="onCancel"
        >
          Cancel
        </button>
      </div>
    </div>
    </CoreModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { dynamicIcons } from "@/utils/assets";
import {
  Calendar,
  Video,
  Users,
  UserCheck,
  BookOpen,
  Bell,
  Building,
  Package,
  FileText,
  AlertTriangle,
  DollarSign,
  Receipt,
  Menu,
  X,
  Church,
  ChevronDown,
  BarChart2,
  Database,
  CreditCard,
  Briefcase,
  Settings,
  User,
  UserPlus,
  GitBranch,
  Mail,
  MessageSquare,
  Brain
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const isOpen = ref(false);
const showBLogoutModal = ref(false);
const loading = ref(false)

// Track which section is expanded (-1 means none)
const expandedSectionIndex = ref<number>(-1);

// Toggle section expansion
const toggleSection = (index: number) => {
  // If clicking on the already expanded section, close it
  if (expandedSectionIndex.value === index) {
    expandedSectionIndex.value = -1;
  } else {
    // Otherwise, open the clicked section (and close any other)
    expandedSectionIndex.value = index;
  }
};

// Navigate to section and handle dropdown
const navigateToSection = (section: any, index: number) => {
  // If section has a default href, navigate to it
  if (section.href) {
    router.push(section.href);
  } 
  // If no specific href, navigate to the first item in the section
  else if (section.items && section.items.length > 0) {
    router.push(section.items[0].href);
  }
  
  // Always expand the section when navigating to it
  expandedSectionIndex.value = index;
};

// Check if a route is active
const isActiveRoute = (href: string): boolean => {
  return route.path.includes(href);
};

// Check if a section route is active
const isActiveSectionRoute = (href: string): boolean => {
  if (!href) return false;
  return route.path.includes(href);
};

// Find and expand the section containing the active route
const expandActiveSection = () => {
  for (let i = 0; i < navigation.length; i++) {
    if (
      (navigation[i].href && isActiveSectionRoute(navigation[i].href)) || 
      navigation[i].items.some(item => isActiveRoute(item.href))
    ) {
      expandedSectionIndex.value = i;
      break;
    }
  }
};

// Updated navigation data with href properties for sections
const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard', // Parent route for the section
    items: [
      { name: 'Admin Dashboard', href: '/dashboard/admin', icon: Settings },
      { name: 'Finance Dashboard', href: '/dashboard/finance', icon: BarChart2 },
    ],
  },
  {
    name: 'Member Management',
    href: '/dashboard/church', // Parent route for the section
    items: [
      { name: 'Church Profile Setup', href: '/dashboard/church/profile', icon: Church },
      { name: 'Member & Staff Management', href: '/dashboard/members', icon: User },
      { name: 'Branch Management', href: '/dashboard/church/branches', icon: GitBranch },
    ],
  },
  {
    name: 'Event Management',
    href: '/dashboard/events', // Parent route for the section
    items: [
      { name: 'Event Scheduling', href: '/dashboard/events', icon: Calendar },
      { name: 'Live Streaming & Media', href: '/dashboard/events/media', icon: Video },
    ],
  },
  {
    name: 'Volunteer Management',
    href: '/dashboard/volunteer', // Parent route for the section
    items: [
      { name: 'Volunteer Assignments', href: '/dashboard/volunteer/assignments', icon: Users },
      { name: 'Training & Certification', href: '/dashboard/volunteer/training', icon: UserCheck },
    ],
  },
  {
    name: 'Facility Management',
    href: '/dashboard/facilities', // Parent route for the section
    items: [
      { name: 'Facility Booking', href: '/dashboard/facilities', icon: Building },
      { name: 'Asset Tracking', href: '/dashboard/facilities/assets', icon: Package },
    ],
  },
  {
    name: 'Member Engagement',
    href: '/dashboard/members', // Parent route for the section
    items: [
      { name: 'Group Management', href: '/dashboard/members', icon: BookOpen },
      { name: 'Automated Follow-ups', href: '/dashboard/members/automated-followups', icon: Bell },
    ],
  },
  {
    name: 'Legal Management',
    href: '/dashboard/legal', // Parent route for the section
    items: [
      { name: 'Document Storage', href: '/dashboard/legal', icon: FileText },
      { name: 'Regulatory Compliance', href: '/dashboard/legal/compliance', icon: AlertTriangle },
    ],
  },
  {
    name: 'Payments & Donations',
    href: '/dashboard/payments', // Parent route for the section
    items: [
      { name: 'Payment Collection', href: '/dashboard/payments/collection', icon: DollarSign },
      { name: 'Payment History', href: '/dashboard/payments/history', icon: Receipt },
    ],
  },
  {
    name: 'Corporate Banking',
    href: '/dashboard/banking', // Parent route for the section
    items: [
      { name: 'Bank Account Management', href: '/dashboard/banking/accounts', icon: Briefcase },
      { name: 'Fund Transfers & Bills', href: '/dashboard/banking/transfers', icon: CreditCard },
    ],
  },
  {
    name: 'Analytics & Reporting',
    href: '/dashboard/analytics', // Parent route for the section
    items: [
      { name: 'Financial Reports', href: '/dashboard/analytics/financial', icon: BarChart2 },
      { name: 'AI-Powered Insights', href: '/dashboard/analytics/insights', icon: Brain },
    ],
  },
  {
    name: 'Notifications & Alerts',
    href: '/dashboard/notifications', // Parent route for the section
    items: [
      { name: 'Email & SMS Alerts', href: '/dashboard/notifications/email-sms-alerts', icon: Mail },
      { name: 'In-app Notifications', href: '/dashboard/notifications/in-app-notification', icon: MessageSquare },
    ],
  },
];

// Initialize expanded section on component creation
onMounted(() => {
  expandActiveSection();
});

const onCancel = () => {
  showBLogoutModal.value = false
  // Logic to close the modal
  console.log("Cancelled");
};

const onConfirm = () => {
  // Logic for logout
  loading.value = true
  localStorage.clear()
  showBLogoutModal.value = false
  router.push('/')
  window.location.href="/"
  console.log("Logging out...");
};
</script>

