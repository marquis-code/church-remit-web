<template>
 <main>
  <div class="space-y-8">
      <!-- Page header -->
      <div>
        <h2 class="text-2xl font-bold leading-7 text-gray-900">Legal & Compliance Management</h2>
        <p class="mt-1 text-sm text-gray-500">Manage church documents and regulatory compliance</p>
      </div>

      <!-- Feature Navigation Cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <!-- Document Storage Card -->
        <NuxtLink to="/dashboard/legal/documents" 
          class="group relative overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-teal-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="p-6 relative">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-teal-600">
                  <FolderLock class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Document Storage</h3>
                <p class="mt-1 text-sm text-gray-500">
                  Secure repository for church policies, agreements, and compliance documents
                </p>
              </div>
            </div>
            <div class="mt-6">
              <div class="flex items-center justify-between">
                <div class="flex space-x-2">
                  <span class="inline-flex items-center rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-800">
                    Secure Storage
                  </span>
                  <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Role-based Access
                  </span>
                </div>
                <ArrowRight class="h-5 w-5 text-teal-600 transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </NuxtLink>

        <!-- Compliance Tracking Card -->
        <NuxtLink to="/dashboard/legal/compliance" 
          class="group relative overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in animation-delay-100"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="p-6 relative">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-purple-600">
                  <ClipboardCheck class="h-6 w-6 text-white" aria-hidden="true" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-lg font-medium text-gray-900">Compliance Tracking</h3>
                <p class="mt-1 text-sm text-gray-500">
                  Monitor tax, financial, and legal compliance requirements
                </p>
              </div>
            </div>
            <div class="mt-6">
              <div class="flex items-center justify-between">
                <div class="flex space-x-2">
                  <span class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                    Automated Alerts
                  </span>
                  <span class="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800">
                    Compliance Monitoring
                  </span>
                </div>
                <ArrowRight class="h-5 w-5 text-purple-600 transform transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Overview Stats -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in animation-delay-200">
        <div v-for="(stat, index) in stats" :key="stat.name" 
          class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
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
      </div>

      <!-- Recent Activity -->
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 animate-fade-in animation-delay-300">
        <!-- Recent Documents -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Recent Documents</h3>
              <NuxtLink
                to="/dashboard/legal/documents"
                class="text-sm font-medium text-teal-600 hover:text-teal-500"
              >
                View all
              </NuxtLink>
            </div>
            <div class="mt-6 flow-root">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="document in recentDocuments" :key="document.id" class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <component :is="document.icon" :class="[
                        'h-8 w-8',
                        document.iconColor
                      ]" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-sm font-medium text-gray-900">{{ document.name }}</p>
                      <p class="truncate text-sm text-gray-500">{{ document.category }}</p>
                    </div>
                    <div>
                      <span :class="[
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        document.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      ]">
                        {{ document.status }}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Compliance Alerts -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Compliance Alerts</h3>
              <NuxtLink
                to="/dashboard/legal/compliance"
                class="text-sm font-medium text-teal-600 hover:text-teal-500"
              >
                View all
              </NuxtLink>
            </div>
            <div class="mt-6 flow-root">
              <ul role="list" class="divide-y divide-gray-200">
                <li v-for="alert in complianceAlerts" :key="alert.id" class="py-4">
                  <div class="flex items-center space-x-4">
                    <div class="flex-shrink-0">
                      <span :class="[
                        'inline-flex h-8 w-8 items-center justify-center rounded-full',
                        alert.priority === 'high' ? 'bg-red-100' :
                        alert.priority === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
                      ]">
                        <AlertCircle :class="[
                          'h-5 w-5',
                          alert.priority === 'high' ? 'text-red-600' :
                          alert.priority === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                        ]" />
                      </span>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm font-medium text-gray-900">{{ alert.title }}</p>
                      <p class="text-sm text-gray-500">Due: {{ alert.dueDate }}</p>
                    </div>
                    <div>
                      <span :class="[
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                        alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      ]">
                        {{ alert.priority }}
                      </span>
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
              class="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
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
 </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import {
  FolderLock,
  ClipboardCheck,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  FileText,
  FileCog,
  FileCheck,
  AlertCircle,
  Upload,
  Settings,
  Download
} from 'lucide-vue-next';

const router = useRouter();

definePageMeta({
    layout: 'dashboard'
})

// Stats data
const stats = [
  {
    name: 'Total Documents',
    value: '156',
    change: '12%',
    changeType: 'increase',
    icon: FileText,
    bgColor: 'bg-teal-600'
  },
  {
    name: 'Active Policies',
    value: '45',
    change: '5%',
    changeType: 'increase',
    icon: FileCog,
    bgColor: 'bg-purple-600'
  },
  {
    name: 'Compliance Rate',
    value: '98%',
    change: '2%',
    changeType: 'increase',
    icon: FileCheck,
    bgColor: 'bg-green-600'
  },
  {
    name: 'Pending Tasks',
    value: '3',
    change: '1',
    changeType: 'decrease',
    icon: AlertCircle,
    bgColor: 'bg-orange-600'
  }
];

// Recent documents
const recentDocuments = [
  {
    id: 1,
    name: 'Privacy Policy.pdf',
    category: 'Policies & Procedures',
    status: 'active',
    icon: FileText,
    iconColor: 'text-blue-500'
  },
  {
    id: 2,
    name: 'Board Meeting Minutes.docx',
    category: 'Corporate Documents',
    status: 'active',
    icon: FileText,
    iconColor: 'text-green-500'
  },
  {
    id: 3,
    name: 'Tax Compliance Report.pdf',
    category: 'Financial Documents',
    status: 'active',
    icon: FileText,
    iconColor: 'text-purple-500'
  }
];

// Compliance alerts
const complianceAlerts = [
  {
    id: 1,
    title: 'Annual Tax Filing Due',
    dueDate: 'March 15, 2024',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Policy Review Required',
    dueDate: 'March 30, 2024',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Quarterly Report Submission',
    dueDate: 'April 15, 2024',
    priority: 'low'
  }
];

// Quick actions
const quickActions = [
  {
    name: 'Upload Document',
    icon: Upload,
    bgColor: 'bg-teal-100',
    iconColor: 'text-teal-600',
    onClick: () => router.push('/dashboard/legal/documents')
  },
  {
    name: 'View Alerts',
    icon: AlertCircle,
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600',
    onClick: () => router.push('/dashboard/legal/compliance')
  },
  {
    name: 'Download Report',
    icon: Download,
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600',
    onClick: () => console.log('Downloading report...')
  },
  {
    name: 'Settings',
    icon: Settings,
    bgColor: 'bg-gray-100',
    iconColor: 'text-gray-600',
    onClick: () => console.log('Opening settings...')
  }
];
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