<template>
  <main>
    <div class="space-y-8">
      <!-- Page header -->
      <div>
        <h2 class="text-2xl font-bold leading-7 text-gray-900">Corporate Banking Dashboard</h2>
        <p class="mt-1 text-sm text-gray-500">Manage your church's financial operations in one place</p>
      </div>

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="stat in stats" :key="stat.name" 
          class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 transition-all duration-300 hover:shadow-md"
        >
          <div class="flex items-center">
            <div :class="[
              'flex h-12 w-12 items-center justify-center rounded-md',
              stat.bgColor
            ]">
              <component :is="stat.icon" class="h-6 w-6" :class="stat.iconColor" />
            </div>
            <div class="ml-4">
              <dt class="truncate text-sm font-medium text-gray-500">{{ stat.name }}</dt>
              <dd class="mt-1 text-xl font-semibold tracking-tight text-gray-900">{{ stat.value }}</dd>
            </div>
          </div>
        </div>
      </div>

      <!-- Feature Navigation Cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <NuxtLink to="/dashboard/banking/accounts" 
          class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow transition-all duration-300 hover:shadow-lg hover:border-purple-200"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative p-6">
            <div class="flex items-center">
              <div class="flex h-12 w-12 items-center justify-center rounded-md bg-purple-100">
                <Building2 class="h-6 w-6 text-purple-600" />
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">Bank Account Management</h3>
            </div>
            <div class="mt-4 space-y-3">
              <div class="flex items-center">
                <CheckCircle2 class="h-5 w-5 text-green-500" />
                <span class="ml-2 text-sm text-gray-600">Create & Manage Bank Accounts</span>
              </div>
              <div class="flex items-center">
                <CheckCircle2 class="h-5 w-5 text-green-500" />
                <span class="ml-2 text-sm text-gray-600">View Account Balances & Transactions</span>
              </div>
              <div class="flex items-center">
                <CheckCircle2 class="h-5 w-5 text-green-500" />
                <span class="ml-2 text-sm text-gray-600">Assign Account Signatories</span>
              </div>
            </div>
            <div class="mt-6 flex items-center">
              <span class="text-sm font-medium text-purple-600 group-hover:text-purple-800 transition-colors duration-300">Manage Accounts</span>
              <ArrowRight class="ml-2 h-4 w-4 text-purple-600 group-hover:text-purple-800 transition-colors duration-300" />
            </div>
          </div>
        </NuxtLink>

        <NuxtLink to="/dashboard/banking/transfers" 
          class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow transition-all duration-300 hover:shadow-lg hover:border-blue-200"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="relative p-6">
            <div class="flex items-center">
              <div class="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100">
                <SendHorizontal class="h-6 w-6 text-blue-600" />
              </div>
              <h3 class="ml-4 text-lg font-medium text-gray-900">Fund Transfers & Bill Payments</h3>
            </div>
            <div class="mt-4 space-y-3">
              <div class="flex items-center">
                <CheckCircle2 class="h-5 w-5 text-green-500" />
                <span class="ml-2 text-sm text-gray-600">Transfer Funds Between Accounts</span>
              </div>
              <div class="flex items-center">
                <CheckCircle2 class="h-5 w-5 text-green-500" />
                <span class="ml-2 text-sm text-gray-600">Pay Bills & Utilities</span>
              </div>
              <div class="flex items-center">
                <CheckCircle2 class="h-5 w-5 text-green-500" />
                <span class="ml-2 text-sm text-gray-600">Purchase Airtime & Data Bundles</span>
              </div>
            </div>
            <div class="mt-6 flex items-center">
              <span class="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors duration-300">Manage Transfers</span>
              <ArrowRight class="ml-2 h-4 w-4 text-blue-600 group-hover:text-blue-800 transition-colors duration-300" />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Account Overview -->
      <div class="rounded-lg border border-gray-200 bg-white shadow">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold leading-6 text-gray-900">Account Overview</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Quick summary of your accounts</p>
          </div>
          <NuxtLink to="/dashboard/banking/accounts" class="text-sm font-medium text-purple-600 hover:text-purple-800">
            View All
          </NuxtLink>
        </div>
        <div class="border-t border-gray-200">
          <div class="px-4 py-5 sm:p-6">
            <div class="flow-root">
              <ul role="list" class="-mb-8">
                <li v-for="(account, accountIdx) in accounts" :key="account.id">
                  <div class="relative pb-8">
                    <span v-if="accountIdx !== accounts.length - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div class="relative flex space-x-3">
                      <div>
                        <span :class="[
                          'flex h-8 w-8 items-center justify-center rounded-full',
                          account.type === 'savings' ? 'bg-blue-100' : 'bg-green-100'
                        ]">
                          <component 
                            :is="account.type === 'savings' ? Wallet : Building2" 
                            class="h-5 w-5"
                            :class="account.type === 'savings' ? 'text-blue-600' : 'text-green-600'"
                          />
                        </span>
                      </div>
                      <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p class="text-sm font-medium text-gray-900">{{ account.name }}</p>
                          <p class="text-sm text-gray-500">{{ account.accountNumber }}</p>
                        </div>
                        <div class="whitespace-nowrap text-right text-sm">
                          <p class="font-medium text-gray-900">{{ formatCurrency(account.balance) }}</p>
                          <p :class="[
                            'flex items-center justify-end',
                            account.trend > 0 ? 'text-green-600' : 'text-red-600'
                          ]">
                            <component :is="account.trend > 0 ? TrendingUp : TrendingDown" class="mr-1 h-4 w-4" />
                            {{ Math.abs(account.trend) }}%
                          </p>
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

      <!-- Recent Activity -->
      <div class="rounded-lg border border-gray-200 bg-white shadow">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 class="text-base font-semibold leading-6 text-gray-900">Recent Activity</h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">Latest transactions and bill payments</p>
          </div>
          <div class="flex space-x-3">
            <NuxtLink to="/banking/accounts" class="text-sm font-medium text-purple-600 hover:text-purple-800">
              View Transactions
            </NuxtLink>
            <span class="text-gray-300">|</span>
            <NuxtLink to="/dashboard/banking/transfers" class="text-sm font-medium text-purple-600 hover:text-purple-800">
              View Bills
            </NuxtLink>
          </div>
        </div>
        <div class="border-t border-gray-200">
          <div class="px-4 py-5 sm:p-6">
            <div class="flow-root">
              <ul role="list" class="-mb-8">
                <li v-for="(activity, activityIdx) in recentActivity" :key="activity.id">
                  <div class="relative pb-8">
                    <span v-if="activityIdx !== recentActivity.length - 1" class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                    <div class="relative flex space-x-3">
                      <div>
                        <span :class="[
                          'flex h-8 w-8 items-center justify-center rounded-full',
                          activity.bgColor
                        ]">
                          <component 
                            :is="activity.icon" 
                            class="h-5 w-5"
                            :class="activity.iconColor"
                          />
                        </span>
                      </div>
                      <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p class="text-sm font-medium text-gray-900">{{ activity.description }}</p>
                          <p class="text-sm text-gray-500">{{ activity.details }}</p>
                        </div>
                        <div class="whitespace-nowrap text-right text-sm">
                          <p :class="[
                            'font-medium',
                            activity.type === 'credit' ? 'text-green-600' : 
                            activity.type === 'debit' ? 'text-red-600' : 'text-gray-900'
                          ]">
                            {{ activity.type === 'credit' ? '+' : activity.type === 'debit' ? '-' : '' }}
                            {{ formatCurrency(activity.amount) }}
                          </p>
                          <p class="text-gray-500">{{ activity.time }}</p>
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
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Building2,
  Wallet,
  SendHorizontal,
  CreditCard,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  ArrowRight,
  ArrowDownLeft,
  ArrowUpRight,
  Zap,
  Wifi,
  Phone
} from 'lucide-vue-next';

// Stats
const stats = [
  {
    name: 'Total Balance',
    value: '₦1,180,000.00',
    icon: Wallet,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    name: 'Monthly Transactions',
    value: '42',
    icon: ArrowRight,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    name: 'Pending Bills',
    value: '3',
    icon: CreditCard,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    name: 'Active Accounts',
    value: '3',
    icon: Building2,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  }
];

definePageMeta({
    layout: 'dashboard'
})

// Accounts
const accounts = ref([
  {
    id: 1,
    name: 'Main Church Account',
    accountNumber: '1234567890',
    type: 'current',
    balance: 250000.00,
    trend: 12
  },
  {
    id: 2,
    name: 'Building Fund',
    accountNumber: '0987654321',
    type: 'savings',
    balance: 750000.00,
    trend: 8
  },
  {
    id: 3,
    name: 'Staff Salary Account',
    accountNumber: '5678901234',
    type: 'current',
    balance: 180000.00,
    trend: -3
  }
]);

// Recent Activity
const recentActivity = ref([
  {
    id: 1,
    type: 'credit',
    description: 'Sunday Offering',
    details: 'Deposit to Main Church Account',
    amount: 15000.00,
    time: 'Today, 10:30 AM',
    icon: ArrowDownLeft,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 2,
    type: 'debit',
    description: 'Utility Payment',
    details: 'Electricity Bill',
    amount: 5000.00,
    time: 'Yesterday, 2:15 PM',
    icon: Zap,
    bgColor: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    id: 3,
    type: 'debit',
    description: 'Internet Service',
    details: 'Monthly Subscription',
    amount: 15000.00,
    time: '2 days ago, 9:45 AM',
    icon: Wifi,
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 4,
    type: 'credit',
    description: 'Building Fund Donation',
    details: 'Transfer from External Account',
    amount: 50000.00,
    time: '3 days ago, 11:20 AM',
    icon: ArrowDownLeft,
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 5,
    type: 'debit',
    description: 'Airtime Purchase',
    details: 'For Church Office',
    amount: 2000.00,
    time: '4 days ago, 3:30 PM',
    icon: Phone,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  }
]);

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount);
};
</script>