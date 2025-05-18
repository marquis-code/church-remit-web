<template>
    <main>
      <div class="space-y-8">
        <!-- Page header -->
        <div>
          <h2 class="text-2xl font-bold leading-7 text-gray-900">Church & Member Management</h2>
          <p class="mt-1 text-sm text-gray-500">Manage your church profile, members, staff, and branches</p>
        </div>
  
        <!-- Feature Navigation Cards -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <!-- Church Profile Card -->
          <NuxtLink to="/dashboard/church/profile" 
            class="group relative overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="p-6 relative">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600">
                    <Building2 class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Church Profile Setup</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Configure church details, branches, and financial settings
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <div class="flex items-center justify-between">
                  <div class="flex space-x-2">
                    <span class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                      {{ branchCount }} Branches
                    </span>
                    <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {{ adminCount }} Admins
                    </span>
                  </div>
                  <ArrowRight class="h-5 w-5 text-indigo-600 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </NuxtLink>
  
          <!-- Member Management Card -->
          <NuxtLink to="/dashboard/members" 
            class="group relative overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in animation-delay-100"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="p-6 relative">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-purple-600">
                    <Users class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Member & Staff Management</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Manage members, staff, roles, and activities
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <div class="flex items-center justify-between">
                  <div class="flex space-x-2">
                    <span class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                      {{ memberCount }} Members
                    </span>
                    <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {{ staffCount }} Staff
                    </span>
                  </div>
                  <ArrowRight class="h-5 w-5 text-purple-600 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </NuxtLink>
  
          <!-- Branch Management Card -->
          <NuxtLink to="/church/branches" 
            class="group relative overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in animation-delay-200"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="p-6 relative">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-emerald-600">
                    <GitBranch class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Branch Management</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Manage branches, reporting lines, and finances
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <div class="flex items-center justify-between">
                  <div class="flex space-x-2">
                    <span class="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      {{ activeBranches }} Active
                    </span>
                    <span class="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      {{ pendingReports }} Reports
                    </span>
                  </div>
                  <ArrowRight class="h-5 w-5 text-emerald-600 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
  
        <!-- Quick Stats -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in animation-delay-300">
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
              <p v-if="stat.change" :class="[
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
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 animate-fade-in animation-delay-400">
          <!-- Recent Members -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold leading-6 text-gray-900">Recent Members</h3>
                <NuxtLink
                  to="/dashboard/members"
                  class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </NuxtLink>
              </div>
              <div class="mt-6 flow-root">
                <ul role="list" class="divide-y divide-gray-200">
                  <li v-for="member in recentMembers" :key="member.id" class="py-4">
                    <div class="flex items-center space-x-4">
                      <img :src="member.avatar" alt="" class="h-8 w-8 rounded-full" />
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900">{{ member.name }}</p>
                        <p class="truncate text-sm text-gray-500">{{ member.email }}</p>
                      </div>
                      <div>
                        <span :class="[
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          member.type === 'member' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        ]">
                          {{ member.type }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <!-- Recent Branch Activity -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold leading-6 text-gray-900">Branch Activity</h3>
                <NuxtLink
                  to="/church/branches"
                  class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </NuxtLink>
              </div>
              <div class="mt-6 flow-root">
                <ul role="list" class="divide-y divide-gray-200">
                  <li v-for="activity in recentBranchActivity" :key="activity.id" class="py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <span class="inline-flex h-8 w-8 items-center justify-center rounded-full" :class="[
                          activity.type === 'report' ? 'bg-blue-100' : 
                          activity.type === 'financial' ? 'bg-green-100' : 
                          'bg-purple-100'
                        ]">
                          <component 
                            :is="activity.type === 'report' ? FileText : 
                                activity.type === 'financial' ? DollarSign : 
                                Users" 
                            class="h-4 w-4" 
                            :class="[
                              activity.type === 'report' ? 'text-blue-600' : 
                              activity.type === 'financial' ? 'text-green-600' : 
                              'text-purple-600'
                            ]"
                          />
                        </span>
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900">{{ activity.description }}</p>
                        <p class="truncate text-sm text-gray-500">{{ activity.branch }}</p>
                      </div>
                      <div class="text-sm text-gray-500">{{ activity.time }}</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Quick Actions -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in animation-delay-500">
          <button
            type="button"
            @click="navigateTo('/dashboard/members/new')"
            class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-left"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-100">
                  <UserPlus class="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-base font-medium text-gray-900">Add Member</h3>
                <p class="mt-1 text-sm text-gray-500">Register new member</p>
              </div>
            </div>
          </button>
  
          <button
            type="button"
            @click="navigateTo('/church/branches/new')"
            class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-left"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-purple-100">
                  <GitBranch class="h-6 w-6 text-purple-600" aria-hidden="true" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-base font-medium text-gray-900">New Branch</h3>
                <p class="mt-1 text-sm text-gray-500">Create branch</p>
              </div>
            </div>
          </button>
  
          <button
            type="button"
            @click="navigateTo('/dashboard/members/roles')"
            class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-left"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100">
                  <Users class="h-6 w-6 text-emerald-600" aria-hidden="true" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-base font-medium text-gray-900">Roles</h3>
                <p class="mt-1 text-sm text-gray-500">Manage roles</p>
              </div>
            </div>
          </button>
  
          <button
            type="button"
            @click="navigateTo('/church/branches/reports')"
            class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-left"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-amber-100">
                  <FileText class="h-6 w-6 text-amber-600" aria-hidden="true" />
                </div>
              </div>
              <div class="ml-4">
                <h3 class="text-base font-medium text-gray-900">Reports</h3>
                <p class="mt-1 text-sm text-gray-500">View reports</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    Building2,
    Users,
    GitBranch,
    ArrowRight,
    TrendingUp,
    TrendingDown,
    UserPlus,
    FileText,
    DollarSign
  } from 'lucide-vue-next';
  
  const router = useRouter();
  
  // Statistics
  const branchCount = ref(5);
  const adminCount = ref(12);
  const memberCount = ref(450);
  const staffCount = ref(35);
  const activeBranches = ref(5);
  const pendingReports = ref(8);

  definePageMeta({
    layout: 'dashboard'
  })
  
  // Stats data
  const stats = [
    {
      name: 'Total Members',
      value: '450',
      change: '12%',
      changeType: 'increase',
      icon: Users,
      bgColor: 'bg-indigo-600'
    },
    {
      name: 'Active Branches',
      value: '5',
      change: '2',
      changeType: 'increase',
      icon: GitBranch,
      bgColor: 'bg-purple-600'
    },
    {
      name: 'Staff Members',
      value: '35',
      change: '5%',
      changeType: 'increase',
      icon: Users,
      bgColor: 'bg-emerald-600'
    },
    {
      name: 'Monthly Growth',
      value: '8.5%',
      change: '2.3%',
      changeType: 'increase',
      icon: TrendingUp,
      bgColor: 'bg-amber-600'
    }
  ];
  
  // Recent members
  const recentMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      type: 'member',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'michael@example.com',
      type: 'staff',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily@example.com',
      type: 'member',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
    },
    {
      id: 4,
      name: 'James Wilson',
      email: 'james@example.com',
      type: 'staff',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
    }
  ];
  
  // Recent branch activity
  const recentBranchActivity = [
    {
      id: 1,
      type: 'report',
      description: 'Monthly Report Submitted',
      branch: 'Main Branch',
      time: '2h ago'
    },
    {
      id: 2,
      type: 'financial',
      description: 'Financial Statement Updated',
      branch: 'West Branch',
      time: '4h ago'
    },
    {
      id: 3,
      type: 'staff',
      description: 'New Staff Assignment',
      branch: 'North Branch',
      time: '6h ago'
    },
    {
      id: 4,
      type: 'report',
      description: 'Weekly Report Submitted',
      branch: 'South Branch',
      time: '12h ago'
    }
  ];
  
  // Helper functions
  const navigateTo = (path: string) => {
    router.push(path);
  };
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
  
  .animation-delay-500 {
    animation-delay: 500ms;
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