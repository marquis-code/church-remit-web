<template>
  <div class="animate-fadeIn">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <div class="mt-4 md:mt-0 flex space-x-3">
        <button class="inline-flex items-center px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-md transition-colors duration-200">
          <RefreshCwIcon class="w-4 h-4 mr-2" />
          Refresh Data
        </button>
        <button class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors duration-200">
          <DownloadIcon class="w-4 h-4 mr-2" />
          Export
        </button>
      </div>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div 
        v-for="(stat, index) in stats" 
        :key="index" 
        class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-emerald-500 group"
      >
        <div class="p-6">
          <div class="flex items-center">
            <div :class="`w-12 h-12 rounded-lg flex items-center justify-center ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`">
              <component :is="stat.icon" class="w-6 h-6 text-white" />
            </div>
            <div class="ml-4">
              <h3 class="text-sm font-medium text-gray-500">{{ stat.title }}</h3>
              <div class="flex items-end">
                <span class="text-2xl font-bold text-gray-800">{{ stat.value }}</span>
                <span 
                  :class="`ml-2 text-xs font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`"
                >
                  <component :is="stat.trend === 'up' ? TrendingUpIcon : TrendingDownIcon" class="w-3 h-3 inline" />
                  {{ stat.trendValue }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Monthly Financial Summary Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 lg:col-span-2">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Monthly Financial Summary</h2>
            <div class="flex items-center space-x-2">
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-emerald-500 mr-1"></div>
                <span class="text-xs text-gray-600">Income</span>
              </div>
              <div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                <span class="text-xs text-gray-600">Expenses</span>
              </div>
            </div>
          </div>
          <div class="h-80">
            <canvas ref="financialChartRef"></canvas>
          </div>
        </div>
      </div>
      
      <!-- Member Growth Analytics -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Member Growth Analytics</h2>
          <div class="h-80">
            <canvas ref="memberGrowthChartRef"></canvas>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions and Pending Transactions -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Quick Actions -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div class="grid grid-cols-1 gap-3">
            <button 
              v-for="(action, index) in quickActions" 
              :key="index"
              @click="openActionModal(action)"
              class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-emerald-50 transition-colors duration-200 group"
            >
              <div :class="`w-10 h-10 rounded-lg flex items-center justify-center ${action.iconBg}`">
                <component :is="action.icon" class="w-5 h-5 text-white" />
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-gray-800 group-hover:text-emerald-600 transition-colors duration-200">
                  {{ action.title }}
                </h3>
                <p class="text-xs text-gray-500">{{ action.description }}</p>
              </div>
              <ArrowRightIcon class="w-4 h-4 ml-auto text-gray-400 group-hover:text-emerald-500 transition-colors duration-200" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- Pending Transactions -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 lg:col-span-2">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Pending Transactions</h2>
            <button class="text-sm text-emerald-600 hover:underline">View All</button>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr v-for="(transaction, index) in pendingTransactions" :key="index" class="hover:bg-gray-50 transition-colors duration-150">
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="flex items-center">
                      <div :class="`w-8 h-8 rounded-full flex items-center justify-center ${transaction.iconBg}`">
                        <component :is="transaction.icon" class="w-4 h-4 text-white" />
                      </div>
                      <div class="ml-3">
                        <div class="text-sm font-medium text-gray-800">{{ transaction.name }}</div>
                        <div class="text-xs text-gray-500">{{ transaction.type }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="text-sm font-medium text-gray-800">{{ transaction.amount }}</div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="text-sm text-gray-600">{{ transaction.date }}</div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${transaction.statusClass}`">
                      {{ transaction.status }}
                    </span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-emerald-600 hover:text-emerald-800 mr-3">
                      Approve
                    </button>
                    <button class="text-red-600 hover:text-red-800">
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Notifications Panel -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-6">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Notifications Panel</h2>
          <button class="text-sm text-emerald-600 hover:underline">Mark all as read</button>
        </div>
        <div class="space-y-4">
          <div 
            v-for="(notification, index) in notifications" 
            :key="index" 
            class="flex p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            :class="{ 'border-l-4 border-emerald-500': !notification.read }"
          >
            <div :class="`w-10 h-10 rounded-full flex items-center justify-center ${notification.iconBg}`">
              <component :is="notification.icon" class="w-5 h-5 text-white" />
            </div>
            <div class="ml-3 flex-1">
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-medium text-gray-800">{{ notification.title }}</h3>
                <span class="text-xs text-gray-500">{{ notification.time }}</span>
              </div>
              <p class="text-sm text-gray-600 mt-1">{{ notification.message }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Action Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="showModal = false"></div>
          
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          
          <div 
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            :class="{ 'animate-modalOpen': showModal }"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div :class="`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full ${currentAction?.iconBg} sm:mx-0 sm:h-10 sm:w-10`">
                  <component :is="currentAction?.icon" class="h-6 w-6 text-white" />
                </div>
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {{ currentAction?.title }}
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{ currentAction?.modalDescription || currentAction?.description }}
                    </p>
                  </div>
                  
                  <div class="mt-4 space-y-4">
                    <div v-if="currentAction?.title === 'Add Event'">
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Event Name</label>
                          <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" placeholder="Enter event name" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Event Date</label>
                          <input type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Description</label>
                          <textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" rows="3" placeholder="Enter event description"></textarea>
                        </div>
                      </div>
                    </div>
                    
                    <div v-if="currentAction?.title === 'Create Payment Link'">
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Payment Purpose</label>
                          <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" placeholder="e.g. Donation, Membership Fee" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Amount</label>
                          <div class="mt-1 relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span class="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input type="text" class="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" placeholder="0.00" />
                          </div>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Expiry Date</label>
                          <input type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                        </div>
                      </div>
                    </div>
                    
                    <div v-if="currentAction?.title === 'View Reports'">
                      <div class="space-y-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Report Type</label>
                          <select class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm">
                            <option>Financial Summary</option>
                            <option>Donation Report</option>
                            <option>Member Activity</option>
                            <option>Event Performance</option>
                          </select>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700">Date Range</label>
                          <div class="flex space-x-2">
                            <input type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                            <input type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button 
                type="button" 
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
                @click="showModal = false"
              >
                Confirm
              </button>
              <button 
                type="button" 
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="showModal = false"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { 
  RefreshCwIcon, 
  DownloadIcon, 
  TrendingUpIcon, 
  TrendingDownIcon,
  HeartIcon,
  ClockIcon,
  UsersIcon,
  CalendarIcon,
  LinkIcon,
  FileTextIcon,
  CreditCardIcon,
  ArrowRightIcon,
  BellIcon,
  AlertCircleIcon,
  CheckCircleIcon
} from 'lucide-vue-next'
import Chart from 'chart.js/auto'

// Stats data
const stats = [
  {
    title: 'Total Donations',
    value: '$24,780',
    trend: 'up',
    trendValue: '12%',
    icon: HeartIcon,
    iconBg: 'bg-emerald-500'
  },
  {
    title: 'Pending Transactions',
    value: '18',
    trend: 'up',
    trendValue: '5%',
    icon: ClockIcon,
    iconBg: 'bg-yellow-500'
  },
  {
    title: 'Member Growth',
    value: '1,240',
    trend: 'up',
    trendValue: '8%',
    icon: UsersIcon,
    iconBg: 'bg-blue-500'
  },
  {
    title: 'Events This Month',
    value: '6',
    trend: 'down',
    trendValue: '3%',
    icon: CalendarIcon,
    iconBg: 'bg-purple-500'
  }
]

// Quick Actions
const quickActions = [
  {
    title: 'Add Event',
    description: 'Create a new fundraising event',
    icon: CalendarIcon,
    iconBg: 'bg-purple-500',
    modalDescription: 'Create a new event for your organization. Fill in the details below to get started.'
  },
  {
    title: 'Create Payment Link',
    description: 'Generate a shareable payment link',
    icon: LinkIcon,
    iconBg: 'bg-blue-500',
    modalDescription: 'Create a payment link that you can share with donors or members.'
  },
  {
    title: 'View Reports',
    description: 'Access detailed financial reports',
    icon: FileTextIcon,
    iconBg: 'bg-emerald-500',
    modalDescription: 'Generate and view detailed reports for your organization.'
  }
]

// Pending Transactions
const pendingTransactions = [
  {
    name: 'John Doe',
    type: 'Donation',
    amount: '$500.00',
    date: 'Today, 10:30 AM',
    status: 'Pending',
    statusClass: 'bg-yellow-100 text-yellow-800',
    icon: HeartIcon,
    iconBg: 'bg-emerald-500'
  },
  {
    name: 'Jane Smith',
    type: 'Membership Fee',
    amount: '$120.00',
    date: 'Today, 9:15 AM',
    status: 'Pending',
    statusClass: 'bg-yellow-100 text-yellow-800',
    icon: UsersIcon,
    iconBg: 'bg-blue-500'
  },
  {
    name: 'Robert Johnson',
    type: 'Event Registration',
    amount: '$75.00',
    date: 'Yesterday',
    status: 'Pending',
    statusClass: 'bg-yellow-100 text-yellow-800',
    icon: CalendarIcon,
    iconBg: 'bg-purple-500'
  },
  {
    name: 'Emily Davis',
    type: 'Donation',
    amount: '$250.00',
    date: 'Yesterday',
    status: 'Pending',
    statusClass: 'bg-yellow-100 text-yellow-800',
    icon: HeartIcon,
    iconBg: 'bg-emerald-500'
  }
]

// Notifications
const notifications = [
  {
    title: 'New Donation',
    message: 'John Doe made a donation of $500',
    time: '5 minutes ago',
    read: false,
    icon: HeartIcon,
    iconBg: 'bg-emerald-500'
  },
  {
    title: 'Payment Link Created',
    message: 'A new payment link for "Annual Fundraiser" has been created',
    time: '1 hour ago',
    read: false,
    icon: LinkIcon,
    iconBg: 'bg-blue-500'
  },
  {
    title: 'New Member',
    message: 'Jane Smith has joined as a new member',
    time: '3 hours ago',
    read: true,
    icon: UsersIcon,
    iconBg: 'bg-purple-500'
  },
  {
    title: 'Event Reminder',
    message: 'The "Community Outreach" event is scheduled for tomorrow',
    time: 'Yesterday',
    read: true,
    icon: CalendarIcon,
    iconBg: 'bg-yellow-500'
  },
  {
    title: 'System Update',
    message: 'The system will undergo maintenance on Sunday at 2 AM',
    time: '2 days ago',
    read: true,
    icon: AlertCircleIcon,
    iconBg: 'bg-red-500'
  }
]

// Modal state
const showModal = ref(false)
const currentAction = ref<any>(null)

const openActionModal = (action: any) => {
  currentAction.value = action
  showModal.value = true
}

// Chart references
const financialChartRef = ref<HTMLCanvasElement | null>(null)
const memberGrowthChartRef = ref<HTMLCanvasElement | null>(null)
let financialChart: Chart | null = null
let memberGrowthChart: Chart | null = null

onMounted(() => {
  // Financial Summary Chart
  if (financialChartRef.value) {
    const ctx = financialChartRef.value.getContext('2d')
    if (ctx) {
      financialChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Income',
              data: [12500, 15000, 18000, 16000, 19000, 22000, 25000, 23000, 26000, 28000, 30000, 32000],
              backgroundColor: 'rgba(16, 185, 129, 0.7)',
              borderColor: 'rgba(16, 185, 129, 1)',
              borderWidth: 1
            },
            {
              label: 'Expenses',
              data: [10000, 12000, 14000, 13000, 15000, 17000, 19000, 18000, 20000, 21000, 22000, 24000],
              backgroundColor: 'rgba(239, 68, 68, 0.7)',
              borderColor: 'rgba(239, 68, 68, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString()
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || ''
                  if (label) {
                    label += ': '
                  }
                  if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y)
                  }
                  return label
                }
              }
            }
          }
        }
      })
    }
  }
  
  // Member Growth Chart
  if (memberGrowthChartRef.value) {
    const ctx = memberGrowthChartRef.value.getContext('2d')
    if (ctx) {
      memberGrowthChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'New Members',
              data: [50, 65, 80, 95, 110, 130, 150, 170, 190, 210, 230, 250],
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              borderColor: 'rgba(79, 70, 229, 1)',
              borderWidth: 2,
              tension: 0.4,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        }
      })
    }
  }
})

definePageMeta({
    layout: 'dashboard'
})
</script>

<style scoped>
.animate-fadeIn {
  animation: fadeIn 0.5s ease-in-out;
}

.animate-modalOpen {
  animation: modalOpen 0.3s ease-out;
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

@keyframes modalOpen {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>