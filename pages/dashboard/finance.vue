<template>
  <div class="animate-fadeIn">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Finance Dashboard</h1>
      <div class="mt-4 md:mt-0 flex space-x-3">
        <button class="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium rounded-md transition-colors duration-200">
          <RefreshCwIcon class="w-4 h-4 mr-2" />
          Refresh Data
        </button>
        <button class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-md transition-colors duration-200">
          <DownloadIcon class="w-4 h-4 mr-2" />
          Export
        </button>
      </div>
    </div>
    
    <!-- Donation Trends Chart -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 lg:col-span-2">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Donation Trends</h2>
            <div class="flex items-center space-x-2">
              <select class="text-sm border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500">
                <option>Last 12 Months</option>
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
            </div>
          </div>
          <div class="h-80">
            <canvas ref="donationTrendsChartRef"></canvas>
          </div>
        </div>
      </div>
      
      <!-- Remittance Reports -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Remittance Reports</h2>
          <div class="space-y-4">
            <div 
              v-for="(report, index) in remittanceReports" 
              :key="index" 
              class="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors duration-200 group"
            >
              <div :class="`w-10 h-10 rounded-lg flex items-center justify-center ${report.iconBg}`">
                <component :is="report.icon" class="w-5 h-5 text-white" />
              </div>
              <div class="ml-3 flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-200">
                    {{ report.title }}
                  </h3>
                  <span class="text-xs text-gray-500">{{ report.date }}</span>
                </div>
                <p class="text-xs text-gray-500 mt-1">{{ report.description }}</p>
              </div>
              <DownloadIcon class="w-4 h-4 ml-2 text-gray-400 group-hover:text-purple-500 transition-colors duration-200" />
            </div>
          </div>
          <button class="mt-4 w-full text-center text-sm text-purple-600 hover:underline">
            View All Reports
          </button>
        </div>
      </div>
    </div>
    
    <!-- Outstanding Payments & Deductions -->
    <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 mb-6">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-semibold text-gray-800">Outstanding Payments & Deductions</h2>
          <button class="text-sm text-purple-600 hover:underline">View All</button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="(payment, index) in outstandingPayments" :key="index" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-800">{{ payment.description }}</div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="text-sm text-gray-600">{{ payment.type }}</div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="text-sm font-medium" :class="payment.type === 'Payment' ? 'text-red-600' : 'text-green-600'">
                    {{ payment.amount }}
                  </div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <div class="text-sm text-gray-600">{{ payment.dueDate }}</div>
                </td>
                <td class="px-4 py-3 whitespace-nowrap">
                  <span :class="`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${payment.statusClass}`">
                    {{ payment.status }}
                  </span>
                </td>
                <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <button class="text-purple-600 hover:text-purple-800 mr-3">
                    Process
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <!-- Payroll Overview and Fund Transfers -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Payroll Overview -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold text-gray-800">Payroll Overview</h2>
            <div class="flex items-center space-x-2">
              <select class="text-sm border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last Quarter</option>
              </select>
            </div>
          </div>
          <div class="h-64">
            <canvas ref="payrollChartRef"></canvas>
          </div>
          <div class="mt-4 grid grid-cols-2 gap-4">
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="text-xs text-gray-500">Total Payroll</p>
              <p class="text-lg font-semibold text-gray-800">$45,280</p>
            </div>
            <div class="bg-gray-50 p-3 rounded-lg">
              <p class="text-xs text-gray-500">Next Payroll Date</p>
              <p class="text-lg font-semibold text-gray-800">Mar 15, 2025</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Fund Transfers Summary -->
      <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        <div class="p-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Fund Transfers Summary</h2>
          <div class="space-y-4">
            <div 
              v-for="(transfer, index) in fundTransfers" 
              :key="index" 
              class="flex items-center p-3 bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <div :class="`w-10 h-10 rounded-lg flex items-center justify-center ${transfer.iconBg}`">
                <component :is="transfer.icon" class="w-5 h-5 text-white" />
              </div>
              <div class="ml-3 flex-1">
                <div class="flex items-center justify-between">
                  <h3 class="text-sm font-medium text-gray-800">
                    {{ transfer.title }}
                  </h3>
                  <span :class="`text-sm font-medium ${transfer.amountClass}`">{{ transfer.amount }}</span>
                </div>
                <div class="flex items-center justify-between mt-1">
                  <p class="text-xs text-gray-500">{{ transfer.date }}</p>
                  <span :class="`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${transfer.statusClass}`">
                    {{ transfer.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-700">Total Transfers (This Month)</span>
              <span class="text-lg font-semibold text-gray-800">$128,450</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { 
  RefreshCwIcon, 
  DownloadIcon, 
  FileTextIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSignIcon,
  UsersIcon,
  BuildingIcon,
  CreditCardIcon
} from 'lucide-vue-next'
import Chart from 'chart.js/auto'

// Remittance Reports
const remittanceReports = [
  {
    title: 'Monthly Donation Summary',
    description: 'Summary of all donations received in February 2025',
    date: 'Mar 1, 2025',
    icon: FileTextIcon,
    iconBg: 'bg-purple-500'
  },
  {
    title: 'Quarterly Financial Report',
    description: 'Q1 2025 financial performance report',
    date: 'Apr 5, 2025',
    icon: FileTextIcon,
    iconBg: 'bg-blue-500'
  },
  {
    title: 'Tax Deduction Report',
    description: 'Annual tax deduction report for donors',
    date: 'Jan 15, 2025',
    icon: FileTextIcon,
    iconBg: 'bg-emerald-500'
  },
  {
    title: 'Expense Allocation Report',
    description: 'Breakdown of organizational expenses by category',
    date: 'Feb 28, 2025',
    icon: FileTextIcon,
    iconBg: 'bg-yellow-500'
  }
]

// Outstanding Payments
const outstandingPayments = [
  {
    description: 'Office Rent',
    type: 'Payment',
    amount: '-$2,500.00',
    dueDate: 'Mar 15, 2025',
    status: 'Upcoming',
    statusClass: 'bg-yellow-100 text-yellow-800'
  },
  {
    description: 'Utility Bills',
    type: 'Payment',
    amount: '-$850.00',
    dueDate: 'Mar 20, 2025',
    status: 'Upcoming',
    statusClass: 'bg-yellow-100 text-yellow-800'
  },
  {
    description: 'Software Subscription',
    type: 'Payment',
    amount: '-$199.99',
    dueDate: 'Mar 5, 2025',
    status: 'Overdue',
    statusClass: 'bg-red-100 text-red-800'
  },
  {
    description: 'Tax Refund',
    type: 'Deduction',
    amount: '+$1,250.00',
    dueDate: 'Apr 15, 2025',
    status: 'Pending',
    statusClass: 'bg-blue-100 text-blue-800'
  },
  {
    description: 'Grant Disbursement',
    type: 'Deduction',
    amount: '+$5,000.00',
    dueDate: 'Mar 25, 2025',
    status: 'Approved',
    statusClass: 'bg-green-100 text-green-800'
  }
]

// Fund Transfers
const fundTransfers = [
  {
    title: 'Transfer to Operations Account',
    amount: '-$15,000',
    date: 'Mar 10, 2025',
    status: 'Completed',
    statusClass: 'bg-green-100 text-green-800',
    amountClass: 'text-red-600',
    icon: ArrowUpIcon,
    iconBg: 'bg-red-500'
  },
  {
    title: 'Transfer from Reserve Fund',
    amount: '+$25,000',
    date: 'Mar 5, 2025',
    status: 'Completed',
    statusClass: 'bg-green-100 text-green-800',
    amountClass: 'text-green-600',
    icon: ArrowDownIcon,
    iconBg: 'bg-green-500'
  },
  {
    title: 'Transfer to Payroll Account',
    amount: '-$45,280',
    date: 'Feb 28, 2025',
    status: 'Completed',
    statusClass: 'bg-green-100 text-green-800',
    amountClass: 'text-red-600',
    icon: ArrowUpIcon,
    iconBg: 'bg-red-500'
  },
  {
    title: 'Transfer from Donation Account',
    amount: '+$38,170',
    date: 'Feb 25, 2025',
    status: 'Completed',
    statusClass: 'bg-green-100 text-green-800',
    amountClass: 'text-green-600',
    icon: ArrowDownIcon,
    iconBg: 'bg-green-500'
  }
]

// Chart references
const donationTrendsChartRef = ref<HTMLCanvasElement | null>(null)
const payrollChartRef = ref<HTMLCanvasElement | null>(null)
let donationTrendsChart: Chart | null = null
let payrollChart: Chart | null = null

onMounted(() => {
  // Donation Trends Chart
  if (donationTrendsChartRef.value) {
    const ctx = donationTrendsChartRef.value.getContext('2d')
    if (ctx) {
      donationTrendsChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'One-time Donations',
              data: [5000, 7500, 6800, 8200, 7000, 9500, 10200, 9800, 11500, 12000, 13500, 15000],
              borderColor: 'rgba(124, 58, 237, 1)',
              backgroundColor: 'rgba(124, 58, 237, 0.1)',
              borderWidth: 2,
              tension: 0.4,
              fill: true
            },
            {
              label: 'Recurring Donations',
              data: [3000, 3200, 3500, 3800, 4000, 4200, 4500, 4800, 5000, 5200, 5500, 5800],
              borderColor: 'rgba(16, 185, 129, 1)',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return '$' + value.toLocaleString()
                }
              }
            }
          },
          plugins: {
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
  
  // Payroll Chart
  if (payrollChartRef.value) {
    const ctx = payrollChartRef.value.getContext('2d')
    if (ctx) {
      payrollChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Administrative', 'Program Staff', 'Operations', 'Contractors'],
          datasets: [
            {
              data: [15280, 18500, 8000, 3500],
              backgroundColor: [
                'rgba(124, 58, 237, 0.8)',
                'rgba(16, 185, 129, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(59, 130, 246, 0.8)'
              ],
              borderColor: [
                'rgba(124, 58, 237, 1)',
                'rgba(16, 185, 129, 1)',
                'rgba(245, 158, 11, 1)',
                'rgba(59, 130, 246, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || ''
                  const value = context.raw as number
                  const total = (context.dataset.data as number[]).reduce((a, b) => (a as number) + (b as number), 0) as number
                  const percentage = Math.round((value / total) * 100)
                  return `${label}: ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} (${percentage}%)`
                }
              }
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