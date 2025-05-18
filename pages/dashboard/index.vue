<template>
  <div class="animate-fadeIn">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink to="/dashboard/admin" class="group">
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg group-hover:border-emerald-500 h-full">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
              <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 transition-transform duration-300 group-hover:rotate-12">
                <UserIcon class="w-5 h-5" />
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              Access administrative tools and monitor organization performance with real-time analytics.
            </p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center text-gray-600">
                <CheckCircleIcon class="w-5 h-5 text-emerald-500 mr-2" />
                <span>Total Donations Received</span>
              </li>
              <li class="flex items-center text-gray-600">
                <CheckCircleIcon class="w-5 h-5 text-emerald-500 mr-2" />
                <span>Pending Transactions</span>
              </li>
              <li class="flex items-center text-gray-600">
                <CheckCircleIcon class="w-5 h-5 text-emerald-500 mr-2" />
                <span>Member Growth Analytics</span>
              </li>
            </ul>
            <div class="flex justify-end">
              <span class="inline-flex items-center text-emerald-600 font-medium group-hover:underline">
                Go to Admin Dashboard
                <ArrowRightIcon class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>
      
      <NuxtLink to="/dashboard/finance" class="group">
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg group-hover:border-purple-500 h-full">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-800">Finance Dashboard</h2>
              <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 transition-transform duration-300 group-hover:rotate-12">
                <DollarSignIcon class="w-5 h-5" />
              </div>
            </div>
            <p class="text-gray-600 mb-4">
              Track financial metrics, manage payments, and generate detailed reports.
            </p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center text-gray-600">
                <CheckCircleIcon class="w-5 h-5 text-purple-500 mr-2" />
                <span>Donation Trends</span>
              </li>
              <li class="flex items-center text-gray-600">
                <CheckCircleIcon class="w-5 h-5 text-purple-500 mr-2" />
                <span>Remittance Reports</span>
              </li>
              <li class="flex items-center text-gray-600">
                <CheckCircleIcon class="w-5 h-5 text-purple-500 mr-2" />
                <span>Payroll Overview</span>
              </li>
            </ul>
            <div class="flex justify-end">
              <span class="inline-flex items-center text-purple-600 font-medium group-hover:underline">
                Go to Finance Dashboard
                <ArrowRightIcon class="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
    
    <div class="mt-8 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(activity, index) in recentActivities" :key="index" class="hover:bg-gray-50 transition-colors duration-150">
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <div :class="`w-8 h-8 rounded-full flex items-center justify-center ${activity.iconBg}`">
                    <component :is="activity.icon" class="w-4 h-4 text-white" />
                  </div>
                  <span class="ml-2 text-sm font-medium text-gray-700">{{ activity.type }}</span>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{{ activity.description }}</td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium" :class="activity.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'">
                {{ activity.amount }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-600">{{ activity.date }}</td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${activity.statusClass}`">
                  {{ activity.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  UserIcon, 
  DollarSignIcon, 
  CheckCircleIcon, 
  ArrowRightIcon,
  HeartIcon,
  UsersIcon,
  CalendarIcon,
  CreditCardIcon,
  FileTextIcon
} from 'lucide-vue-next'

const recentActivities = ref([
  {
    type: 'Donation',
    description: 'Donation from John Doe',
    amount: '+$500.00',
    date: 'Today, 10:30 AM',
    status: 'Completed',
    statusClass: 'bg-green-100 text-green-800',
    icon: HeartIcon,
    iconBg: 'bg-emerald-500'
  },
  {
    type: 'Member',
    description: 'New member registration',
    amount: '-',
    date: 'Today, 9:15 AM',
    status: 'Verified',
    statusClass: 'bg-blue-100 text-blue-800',
    icon: UsersIcon,
    iconBg: 'bg-blue-500'
  },
  {
    type: 'Event',
    description: 'Created new fundraising event',
    amount: '-',
    date: 'Yesterday',
    status: 'Scheduled',
    statusClass: 'bg-purple-100 text-purple-800',
    icon: CalendarIcon,
    iconBg: 'bg-purple-500'
  },
  {
    type: 'Payment',
    description: 'Monthly service fee',
    amount: '-$29.99',
    date: '2 days ago',
    status: 'Processed',
    statusClass: 'bg-yellow-100 text-yellow-800',
    icon: CreditCardIcon,
    iconBg: 'bg-yellow-500'
  },
  {
    type: 'Report',
    description: 'Generated monthly financial report',
    amount: '-',
    date: '3 days ago',
    status: 'Completed',
    statusClass: 'bg-green-100 text-green-800',
    icon: FileTextIcon,
    iconBg: 'bg-gray-500'
  }
])

definePageMeta({
    layout: 'dashboard'
})
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>