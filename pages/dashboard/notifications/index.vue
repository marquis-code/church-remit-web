<template>
  <div class="space-y-8">
    <!-- Welcome Section -->
    <section 
      class="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl p-8 shadow-lg text-white appear-animation"
    >
      <h2 class="text-3xl font-bold">Welcome to the Notifications & Alerts Dashboard</h2>
      <p class="mt-4 text-lg max-w-3xl">
        Manage all your notification settings and preferences from one central location. 
        Use the sidebar to navigate between different notification types.
      </p>
      <div class="mt-6 flex flex-wrap gap-4">
        <NuxtLink 
          to="/dashboard/notifications/email-sms-alerts" 
          class="inline-flex items-center px-6 py-3 bg-white text-emerald-700 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
        >
          <Icon name="heroicons:envelope" class="mr-2 h-5 w-5" />
          Email & SMS Alerts
        </NuxtLink>
        <NuxtLink 
          to="/dashboard/notifications/in-app-notification"
          class="inline-flex items-center px-6 py-3 bg-white text-emerald-700 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300"
        >
          <Icon name="heroicons:bell" class="mr-2 h-5 w-5" />
          In-app Notifications
        </NuxtLink>
      </div>
    </section>
    
    <!-- Stats Overview -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        v-for="(stat, index) in stats" 
        :key="index"
        :icon="stat.icon"
        :title="stat.title"
        :value="stat.value"
        :change="stat.change"
        :color="stat.color"
        :style="{ animationDelay: `${index * 100}ms` }"
        class="appear-animation"
      />
    </section>
    
    <!-- Quick Access Links -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-6 appear-animation" style="animation-delay: 200ms">
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Email & SMS Alerts</h3>
        
        <ul class="space-y-3">
          <li v-for="(item, index) in emailSmsFeatures" :key="index" 
              class="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors duration-150">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg" :class="item.color">
              <Icon :name="item.icon" class="h-5 w-5 text-white" />
            </div>
            <div class="ml-4">
              <h4 class="text-base font-medium text-gray-900">{{ item.title }}</h4>
              <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
            </div>
          </li>
        </ul>
        
        <div class="mt-6">
          <NuxtLink 
            to="/dashboard/notifications/email-sms-alerts" 
            class="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <span>Manage Email & SMS Alerts</span>
            <Icon name="heroicons:arrow-right" class="ml-2 h-4 w-4" />
          </NuxtLink>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">In-app Notifications</h3>
        
        <ul class="space-y-3">
          <li v-for="(item, index) in inAppFeatures" :key="index" 
              class="flex items-start p-3 hover:bg-gray-50 rounded-md transition-colors duration-150">
            <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg" :class="item.color">
              <Icon :name="item.icon" class="h-5 w-5 text-white" />
            </div>
            <div class="ml-4">
              <h4 class="text-base font-medium text-gray-900">{{ item.title }}</h4>
              <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
            </div>
          </li>
        </ul>
        
        <div class="mt-6">
          <NuxtLink 
            to="/dashboard/notifications/in-app-notification" 
            class="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <span>Manage In-app Notifications</span>
            <Icon name="heroicons:arrow-right" class="ml-2 h-4 w-4" />
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- Recent Activity -->
    <section class="bg-white rounded-xl shadow-md border border-gray-100 p-6 appear-animation" style="animation-delay: 300ms">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      
      <div class="overflow-hidden">
        <ul class="divide-y divide-gray-200">
          <li v-for="(activity, index) in recentActivities" :key="index" 
              class="py-4 flex items-start space-x-4 animate-slide-in" 
              :style="{ animationDelay: `${index * 100}ms` }">
            <div class="flex-shrink-0">
              <div class="w-10 h-10 flex items-center justify-center rounded-full" :class="activity.color">
                <Icon :name="activity.icon" class="h-5 w-5 text-white" />
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">{{ activity.title }}</p>
              <p class="text-sm text-gray-500">{{ activity.description }}</p>
            </div>
            <div class="flex-shrink-0 text-sm text-gray-500">
              {{ activity.time }}
            </div>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Define types for our data
interface Stat {
  icon: string;
  title: string;
  value: string;
  change: string;
  color: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
  color: string;
}

interface Activity {
  icon: string;
  title: string;
  description: string;
  time: string;
  color: string;
}

// Dashboard statistics
const stats = ref<Stat[]>([
  {
    icon: 'heroicons:envelope',
    title: 'Email Alerts',
    value: '245',
    change: '+12% from last month',
    color: 'text-emerald-500'
  },
  {
    icon: 'heroicons:device-phone-mobile',
    title: 'SMS Alerts',
    value: '132',
    change: '+5% from last month',
    color: 'text-blue-500'
  },
  {
    icon: 'heroicons:bell',
    title: 'In-app Notifications',
    value: '387',
    change: '+18% from last month',
    color: 'text-purple-500'
  },
  {
    icon: 'heroicons:user-group',
    title: 'Subscribers',
    value: '1,284',
    change: '+8% from last month',
    color: 'text-amber-500'
  }
])

// Email & SMS features
const emailSmsFeatures = ref<Feature[]>([
  {
    icon: 'heroicons:credit-card',
    title: 'Donation Alerts',
    description: 'Receive notifications when new donations are made',
    color: 'bg-emerald-500'
  },
  {
    icon: 'heroicons:banknotes',
    title: 'Payment Notifications',
    description: 'Get alerts for successful and failed payments',
    color: 'bg-blue-500'
  },
  {
    icon: 'heroicons:document-text',
    title: 'Payroll Alerts',
    description: 'Stay informed about payroll processing and completion',
    color: 'bg-indigo-500'
  }
])

// In-app features
const inAppFeatures = ref<Feature[]>([
  {
    icon: 'heroicons:exclamation-circle',
    title: 'Pending Approvals',
    description: 'System-generated alerts for items requiring your approval',
    color: 'bg-amber-500'
  },
  {
    icon: 'heroicons:arrow-path',
    title: 'Fund Transfers',
    description: 'Get notified about remittances and fund transfers',
    color: 'bg-purple-500'
  },
  {
    icon: 'heroicons:cog-6-tooth',
    title: 'System Updates',
    description: 'Important notifications about system maintenance and updates',
    color: 'bg-gray-500'
  }
])

// Recent activities
const recentActivities = ref<Activity[]>([
  {
    icon: 'heroicons:envelope',
    title: 'Email Alert Sent',
    description: 'Monthly donation report was emailed to john.doe@example.com',
    time: '10 minutes ago',
    color: 'bg-emerald-500'
  },
  {
    icon: 'heroicons:device-phone-mobile',
    title: 'SMS Alert Delivered',
    description: 'Payment confirmation sent to +1-555-123-4567',
    time: '45 minutes ago',
    color: 'bg-blue-500'
  },
  {
    icon: 'heroicons:bell',
    title: 'New In-app Notification',
    description: 'Funds transfer of $1,250.00 requires your approval',
    time: '2 hours ago',
    color: 'bg-purple-500'
  },
  {
    icon: 'heroicons:cog-6-tooth',
    title: 'Preferences Updated',
    description: 'Notification settings were updated by Administrator',
    time: '1 day ago',
    color: 'bg-gray-500'
  }
])

definePageMeta({
    layout: 'dashboard'
})
</script>

<style scoped>
.animate-slide-in {
  animation: slideIn 0.5s ease-out forwards;
  opacity: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

