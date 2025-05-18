<template>
    <div class="space-y-8">
      <!-- Page header -->
      <div>
        <h2 class="text-2xl font-bold leading-7 text-gray-900">Payments & Donations Dashboard</h2>
        <p class="mt-1 text-sm text-gray-500">Manage all your church donations and payment activities</p>
      </div>

      <!-- Stats overview -->
      <div>
        <dl class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(stat, index) in stats" :key="stat.name" 
            class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            :class="{'animate-fade-in': true}"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <dt>
              <div :class="[
                'absolute rounded-md p-3',
                stat.bgColor
              ]">
                <component :is="stat.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p class="ml-16 truncate text-sm font-medium text-gray-500">{{ stat.name }}</p>
            </dt>
            <dd class="ml-16 flex items-baseline">
              <p class="text-2xl font-semibold text-gray-900">{{ stat.value }}</p>
              <p :class="[
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                'ml-2 flex items-baseline text-sm font-semibold'
              ]">
                <component :is="stat.changeType === 'increase' ? TrendingUp : TrendingDown" 
                  class="h-5 w-5 flex-shrink-0 self-center" 
                  aria-hidden="true" 
                />
                <span class="sr-only">
                  {{ stat.changeType === 'increase' ? 'Increased' : 'Decreased' }} by
                </span>
                {{ stat.change }}
              </p>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Navigation Cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <NuxtLink to="/dashboard/payments/collection" 
          class="group relative overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="p-6 relative">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600">
                  <CreditCard class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Payment Collection</h3>
                <p class="mt-1 text-sm text-gray-500">
                  Accept donations through multiple payment methods and set up recurring donations
                </p>
              </div>
            </div>
            <div class="mt-6">
              <div class="flex items-center justify-between">
                <div class="flex space-x-2">
                  <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Multiple Methods
                  </span>
                  <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Recurring
                  </span>
                </div>
                <ArrowRight class="h-5 w-5 text-indigo-600 transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/dashboard/payments/history" 
          class="group relative overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in animation-delay-100"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="p-6 relative">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-purple-600">
                  <History class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Payment History</h3>
                <p class="mt-1 text-sm text-gray-500">
                  View transaction history, generate receipts, and manage refunds
                </p>
              </div>
            </div>
            <div class="mt-6">
              <div class="flex items-center justify-between">
                <div class="flex space-x-2">
                  <span class="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    Receipts
                  </span>
                  <span class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    Refunds
                  </span>
                </div>
                <ArrowRight class="h-5 w-5 text-purple-600 transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Recent Transactions -->
      <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-200">
        <div class="px-4 py-5 sm:p-6">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Recent Transactions</h3>
              <p class="mt-2 text-sm text-gray-700">
                A list of recent payments and donations
              </p>
            </div>
            <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <NuxtLink
                to="/dashboard/payments/history"
                class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                View All
              </NuxtLink>
            </div>
          </div>
          <div class="mt-6 flow-root">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Reference</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Donor</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Category</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date</th>
                      <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr v-for="transaction in recentTransactions" :key="transaction.id" class="hover:bg-gray-50">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {{ transaction.reference }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div class="flex items-center">
                          <img :src="transaction.donor.avatar" alt="" class="h-8 w-8 rounded-full" />
                          <div class="ml-3">
                            <p class="font-medium text-gray-900">{{ transaction.donor.name }}</p>
                          </div>
                        </div>
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.category }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                        {{ formatCurrency(transaction.amount) }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ transaction.date }}</td>
                      <td class="whitespace-nowrap px-3 py-4 text-sm">
                        <span :class="[
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                          transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          transaction.status === 'failed' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        ]">
                          {{ transaction.status }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Donation Categories Overview -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 animate-fade-in animation-delay-300">
        <!-- Donation by Category -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Donations by Category</h3>
            <div class="mt-6 h-80">
              <div class="relative h-full">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="h-full w-full">
                    <div class="h-full w-full" ref="donationChartRef"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Recent Activity</h3>
            <div class="mt-6 flow-root">
              <ul role="list" class="-mb-8">
                <li v-for="(activity, activityIdx) in recentActivity" :key="activity.id">
                  <div class="relative pb-8">
                    <span v-if="activityIdx !== recentActivity.length - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div class="relative flex space-x-3">
                      <div>
                        <span :class="[
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                          activity.type === 'donation' ? 'bg-green-500' :
                          activity.type === 'refund' ? 'bg-red-500' :
                          'bg-blue-500'
                        ]">
                          <component :is="activity.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p class="text-sm text-gray-500">
                            {{ activity.content }}
                            <a href="#" class="font-medium text-gray-900">{{ activity.user }}</a>
                          </p>
                        </div>
                        <div class="whitespace-nowrap text-right text-sm text-gray-500">
                          <time :datetime="activity.datetime">{{ activity.date }}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-400">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-base font-semibold leading-6 text-gray-900">Quick Actions</h3>
          <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <button
              v-for="action in quickActions"
              :key="action.name"
              @click="action.onClick"
              class="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <div class="flex items-center">
                <div :class="[
                  'inline-flex rounded-lg p-2',
                  action.bgColor
                ]">
                  <component :is="action.icon" class="h-5 w-5" :class="action.iconColor" />
                </div>
                <div class="ml-3">
                  <h4 class="text-sm font-medium text-gray-900">{{ action.name }}</h4>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue';
import { useRouter } from 'vue-router';
import {
  CreditCard,
  History,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  DollarSign,
  Users,
  Calendar,
  BarChart2,
  Heart,
  RefreshCcw,
  FileText,
  PlusCircle,
  Download,
  Zap,
  Settings
} from 'lucide-vue-next';

// Use shallowRef for ApexCharts to avoid reactivity issues
const ApexCharts = shallowRef(null);
const router = useRouter();
const donationChartRef = ref(null);

// Stats data
const stats = [
  {
    name: 'Total Donations',
    value: '₦1,250,000',
    change: '12%',
    changeType: 'increase',
    icon: DollarSign,
    bgColor: 'bg-indigo-600'
  },
  {
    name: 'Total Donors',
    value: '152',
    change: '5%',
    changeType: 'increase',
    icon: Users,
    bgColor: 'bg-purple-600'
  },
  {
    name: 'This Month',
    value: '₦320,000',
    change: '3%',
    changeType: 'decrease',
    icon: Calendar,
    bgColor: 'bg-green-600'
  },
  {
    name: 'Avg. Donation',
    value: '₦8,200',
    change: '7%',
    changeType: 'increase',
    icon: BarChart2,
    bgColor: 'bg-orange-600'
  }
];

// Recent transactions
const recentTransactions = [
  {
    id: 1,
    reference: 'TRX-001',
    donor: {
      name: 'John Doe',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    category: 'Tithes',
    amount: 50000,
    date: '2024-03-10',
    status: 'completed'
  },
  {
    id: 2,
    reference: 'TRX-002',
    donor: {
      name: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    category: 'Offerings',
    amount: 25000,
    date: '2024-03-09',
    status: 'completed'
  },
  {
    id: 3,
    reference: 'TRX-003',
    donor: {
      name: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    category: 'Missions',
    amount: 100000,
    date: '2024-03-08',
    status: 'pending'
  }
];

// Recent activity
const recentActivity = [
  {
    id: 1,
    type: 'donation',
    content: 'Made a donation to Tithes:',
    user: 'John Doe',
    date: '2 hours ago',
    datetime: '2024-03-10T13:00',
    icon: Heart
  },
  {
    id: 2,
    type: 'refund',
    content: 'Processed refund for:',
    user: 'Sarah Williams',
    date: '1 day ago',
    datetime: '2024-03-09T10:30',
    icon: RefreshCcw
  },
  {
    id: 3,
    type: 'receipt',
    content: 'Generated receipt for:',
    user: 'Mike Johnson',
    date: '2 days ago',
    datetime: '2024-03-08T15:45',
    icon: FileText
  }
];

// Quick actions
const quickActions = [
  {
    name: 'New Donation',
    icon: PlusCircle,
    bgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    onClick: () => router.push('/dashboard/payments/collection')
  },
  {
    name: 'Download Report',
    icon: Download,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600',
    onClick: () => console.log('Downloading report...')
  },
  {
    name: 'Quick Payment',
    icon: Zap,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    onClick: () => router.push('/dashboard/payments/collection')
  },
  {
    name: 'Settings',
    icon: Settings,
    bgColor: 'bg-gray-100',
    iconColor: 'text-gray-600',
    onClick: () => console.log('Opening settings...')
  }
];

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN'
  }).format(amount);
};

// Initialize chart with client-side only import
onMounted(async () => {
  // Only import and initialize ApexCharts on the client side
  if (typeof window !== 'undefined' && donationChartRef.value) {
    try {
      // Dynamically import ApexCharts only on client-side
      const ApexChartsModule = await import('apexcharts');
      ApexCharts.value = ApexChartsModule.default;
      
      const options = {
        series: [44, 25, 20, 11],
        chart: {
          type: 'donut',
          height: 320
        },
        labels: ['Tithes', 'Offerings', 'Missions', 'Special Donations'],
        colors: ['#6366F1', '#F59E0B', '#3B82F6', '#8B5CF6'],
        legend: {
          position: 'bottom'
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                height: 260
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ],
        plotOptions: {
          pie: {
            donut: {
              size: '50%'
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val: number) {
            return val.toFixed(0) + '%';
          }
        },
        tooltip: {
          y: {
            formatter: function(val: number) {
              return '₦' + val.toLocaleString();
            }
          }
        }
      };

      const chart = new ApexCharts.value(donationChartRef.value, options);
      chart.render();
    } catch (error) {
      console.error('Error loading ApexCharts:', error);
    }
  }
});

definePageMeta({
    layout: 'dashboard'
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

.animation-delay-100 {
  animation-delay: 100ms;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

.animation-delay-400 {
  animation-delay: 400ms;
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

