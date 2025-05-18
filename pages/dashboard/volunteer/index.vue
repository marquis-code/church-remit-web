<template>
    <main>
      <div class="space-y-8">
        <!-- Page header -->
        <div>
          <h2 class="text-2xl font-bold leading-7 text-gray-900">Volunteer & Workforce Management</h2>
          <p class="mt-1 text-sm text-gray-500">Manage volunteers, assignments, training, and certifications</p>
        </div>
  
        <!-- Feature Navigation Cards -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- Volunteer Assignments Card -->
          <NuxtLink to="/dashboard/volunteer/assignments" 
            class="group relative overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="p-6 relative">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-indigo-600">
                    <Users class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Volunteer Assignments</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Manage roles, departments, and track participation
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <div class="flex items-center justify-between">
                  <div class="flex space-x-2">
                    <span class="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                      {{ activeVolunteers }} Active Volunteers
                    </span>
                    <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {{ departmentCount }} Departments
                    </span>
                  </div>
                  <ArrowRight class="h-5 w-5 text-indigo-600 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </NuxtLink>
  
          <!-- Training & Certification Card -->
          <NuxtLink to="/volunteer/training" 
            class="group relative overflow-hidden rounded-lg bg-white shadow transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in animation-delay-100"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="p-6 relative">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="inline-flex h-12 w-12 items-center justify-center rounded-md bg-purple-600">
                    <GraduationCap class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                </div>
                <div class="ml-4">
                  <h3 class="text-lg font-medium text-gray-900">Training & Certification</h3>
                  <p class="mt-1 text-sm text-gray-500">
                    Online training modules and certification tracking
                  </p>
                </div>
              </div>
              <div class="mt-6">
                <div class="flex items-center justify-between">
                  <div class="flex space-x-2">
                    <span class="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                      {{ availableCourses }} Courses
                    </span>
                    <span class="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                      {{ activeLearners }} Active Learners
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
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 animate-fade-in animation-delay-300">
          <!-- Recent Assignments -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold leading-6 text-gray-900">Recent Assignments</h3>
                <NuxtLink
                  to="/dashboard/volunteer/assignments"
                  class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View all
                </NuxtLink>
              </div>
              <div class="mt-6 flow-root">
                <ul role="list" class="divide-y divide-gray-200">
                  <li v-for="assignment in recentAssignments" :key="assignment.id" class="py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <img :src="assignment.volunteerAvatar" alt="" class="h-8 w-8 rounded-full" />
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900">{{ assignment.volunteerName }}</p>
                        <p class="truncate text-sm text-gray-500">{{ assignment.role }}</p>
                      </div>
                      <div>
                        <span :class="[
                          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                          assignment.status === 'active' ? 'bg-green-100 text-green-800' :
                          assignment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        ]">
                          {{ assignment.status }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <!-- Training Progress -->
          <div class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-semibold leading-6 text-gray-900">Training Progress</h3>
                <NuxtLink
                  to="/volunteer/training"
                  class="text-sm font-medium text-purple-600 hover:text-purple-500"
                >
                  View all
                </NuxtLink>
              </div>
              <div class="mt-6 flow-root">
                <ul role="list" class="divide-y divide-gray-200">
                  <li v-for="progress in trainingProgress" :key="progress.id" class="py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <img :src="progress.userAvatar" alt="" class="h-8 w-8 rounded-full" />
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900">{{ progress.userName }}</p>
                        <p class="truncate text-sm text-gray-500">{{ progress.courseName }}</p>
                      </div>
                      <div class="flex items-center">
                        <div class="mr-2">
                          <div class="flex items-center">
                            <span class="text-sm font-medium text-gray-900">{{ progress.progress }}%</span>
                            <div class="ml-2 h-2 w-20 rounded-full bg-gray-200">
                              <div
                                class="h-2 rounded-full bg-purple-600"
                                :style="{ width: `${progress.progress}%` }"
                              ></div>
                            </div>
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
  
        <!-- Engagement Chart -->
        <div class="bg-white shadow rounded-lg animate-fade-in animation-delay-400">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Volunteer Engagement</h3>
              <div class="flex space-x-3">
                <button
                  type="button"
                  @click="setChartPeriod('week')"
                  :class="[
                    'inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-semibold',
                    chartPeriod === 'week' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  ]"
                >
                  Week
                </button>
                <button
                  type="button"
                  @click="setChartPeriod('month')"
                  :class="[
                    'inline-flex items-center rounded-md px-2.5 py-1.5 text-sm font-semibold',
                    chartPeriod === 'month' 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                  ]"
                >
                  Month
                </button>
              </div>
            </div>
            <div class="mt-6 h-80">
              <div class="relative h-full">
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="h-full w-full">
                    <ClientOnly>
                      <div class="h-full w-full" ref="engagementChartRef"></div>
                    </ClientOnly>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Quick Actions -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 animate-fade-in animation-delay-500">
        <button
          type="button"
          @click="openModal('assignment')"
          class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-left"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-100">
                <UserPlus class="h-6 w-6 text-indigo-600" aria-hidden="true" />
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-base font-medium text-gray-900">New Assignment</h3>
              <p class="mt-1 text-sm text-gray-500">Create volunteer assignment</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          @click="openModal('course')"
          class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-left"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-purple-100">
                <BookOpen class="h-6 w-6 text-purple-600" aria-hidden="true" />
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-base font-medium text-gray-900">New Course</h3>
              <p class="mt-1 text-sm text-gray-500">Create training course</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          @click="openModal('department')"
          class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-left"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-amber-100">
                <Building2 class="h-6 w-6 text-amber-600" aria-hidden="true" />
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-base font-medium text-gray-900">Departments</h3>
              <p class="mt-1 text-sm text-gray-500">Manage departments</p>
            </div>
          </div>
        </button>

        <button
          type="button"
          @click="openModal('reports')"
          class="relative overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:px-6 sm:pt-6 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1 text-left"
        >
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="inline-flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
                <BarChart3 class="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
            </div>
            <div class="ml-4">
              <h3 class="text-base font-medium text-gray-900">Reports</h3>
              <p class="mt-1 text-sm text-gray-500">View analytics</p>
            </div>
          </div>
        </button>
      </div>
      </div>

          <!-- Modals -->
    <AssignmentModal 
      :is-open="activeModal === 'assignment'" 
      @close="closeModal" 
      @created="handleAssignmentCreated" 
    />
    
    <CourseModal 
      :is-open="activeModal === 'course'" 
      @close="closeModal" 
      @created="handleCourseCreated" 
    />
    
    <DepartmentModal 
      :is-open="activeModal === 'department'" 
      @close="closeModal" 
      @created="handleDepartmentCreated" 
      @updated="handleDepartmentUpdated"
      :edit-data="departmentEditData"
    />
    
    <ReportsModal 
      :is-open="activeModal === 'reports'" 
      @close="closeModal" 
      @saved="handleReportSaved" 
    />
    </main>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import {
    Users,
    GraduationCap,
    ArrowRight,
    TrendingUp,
    TrendingDown,
    UserPlus,
    BookOpen,
    Building2,
    BarChart3
  } from 'lucide-vue-next';
  
  // Import ApexCharts dynamically only on client-side
  let ApexCharts: any = null;
  
  const router = useRouter();
  const engagementChartRef = ref(null);
  const chartPeriod = ref('week');
  
  // Import modals
import AssignmentModal from '@/components/modals/AssignmentModal.vue';
import CourseModal from '@/components/modals/CourseModal.vue';
import DepartmentModal from '@/components/modals/DepartmentModal.vue';
import ReportsModal from '@/components/modals/ReportsModal.vue';

  // Statistics
  const activeVolunteers = ref(124);
  const departmentCount = ref(8);
  const availableCourses = ref(15);
  const activeLearners = ref(45);

  // Modal state
const activeModal = ref('');
const departmentEditData = ref(null);


// Methods
const openModal = (modalName, editData = null) => {
  activeModal.value = modalName;
  
  if (modalName === 'department' && editData) {
    departmentEditData.value = editData;
  } else {
    departmentEditData.value = null;
  }
};

const closeModal = () => {
  activeModal.value = '';
};
  
// Event handlers
const handleAssignmentCreated = (assignment) => {
  // In a real app, you would update your state or refetch data
  console.log('New assignment created:', assignment);
  // Show success notification
  // You could use a toast notification library here
};

const handleCourseCreated = (course) => {
  console.log('New course created:', course);
  availableCourses.value += 1;
};

const handleDepartmentCreated = (department) => {
  console.log('New department created:', department);
  departmentCount.value += 1;
};

const handleDepartmentUpdated = (department) => {
  console.log('Department updated:', department);
};

const handleReportSaved = (report) => {
  console.log('Report saved:', report);
};

definePageMeta({
  layout: 'dashboard'
});

  // Stats data
  const stats = [
    {
      name: 'Total Volunteers',
      value: '156',
      change: '12%',
      changeType: 'increase',
      icon: Users,
      bgColor: 'bg-indigo-600'
    },
    {
      name: 'Active Roles',
      value: '48',
      change: '8%',
      changeType: 'increase',
      icon: UserPlus,
      bgColor: 'bg-green-600'
    },
    {
      name: 'Course Completion',
      value: '85%',
      change: '5%',
      changeType: 'increase',
      icon: GraduationCap,
      bgColor: 'bg-purple-600'
    },
    {
      name: 'Attendance Rate',
      value: '92%',
      change: '3%',
      changeType: 'increase',
      icon: TrendingUp,
      bgColor: 'bg-blue-600'
    }
  ];
  
  // Recent assignments
  const recentAssignments = [
    {
      id: 1,
      volunteerName: 'John Smith',
      volunteerAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'Worship Team Leader',
      status: 'active'
    },
    {
      id: 2,
      volunteerName: 'Sarah Johnson',
      volunteerAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      role: 'Children\'s Ministry',
      status: 'pending'
    },
    {
      id: 3,
      volunteerName: 'Michael Brown',
      volunteerAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      role: 'Usher',
      status: 'active'
    },
    {
      id: 4,
      volunteerName: 'Emily Davis',
      volunteerAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      role: 'Media Team',
      status: 'active'
    }
  ];
  
  // Training progress
  const trainingProgress = [
    {
      id: 1,
      userName: 'David Wilson',
      userAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      courseName: 'Leadership Fundamentals',
      progress: 75
    },
    {
      id: 2,
      userName: 'Rachel Adams',
      userAvatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      courseName: 'Child Safety Training',
      progress: 90
    },
    {
      id: 3,
      userName: 'James Lee',
      userAvatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      courseName: 'Sound System Operation',
      progress: 45
    },
    {
      id: 4,
      userName: 'Lisa Chen',
      userAvatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      courseName: 'First Aid Certification',
      progress: 60
    }
  ];
  
  // Helper functions
  const navigateTo = (path: string) => {
    router.push(path);
  };
  
  const setChartPeriod = (period: string) => {
    chartPeriod.value = period;
    renderEngagementChart();
  };
  
  const renderEngagementChart = () => {
    if (!engagementChartRef.value || !ApexCharts) return;
  
    // Different data based on selected period
    const chartData = chartPeriod.value === 'week' 
      ? [
          { name: 'Worship Team', data: [15, 18, 20, 22, 20, 25, 28] },
          { name: 'Children\'s Ministry', data: [12, 15, 18, 16, 20, 22, 20] },
          { name: 'Media Team', data: [8, 10, 12, 14, 12, 15, 14] }
        ]
      : [
          { name: 'Worship Team', data: [15, 18, 20, 22, 20, 25, 28, 30, 32, 35, 38, 40] },
          { name: 'Children\'s Ministry', data: [12, 15, 18, 16, 20, 22, 20, 24, 26, 28, 30, 32] },
          { name: 'Media Team', data: [8, 10, 12, 14, 12, 15, 14, 16, 18, 20, 22, 24] }
        ];
  
    const categories = chartPeriod.value === 'week'
      ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
    const options = {
      series: chartData,
      chart: {
        type: 'area',
        height: 320,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      colors: ['#6366f1', '#8b5cf6', '#3b82f6'],
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
          stops: [0, 90, 100]
        }
      },
      xaxis: {
        categories: categories
      },
      yaxis: {
        title: {
          text: 'Volunteers'
        }
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right'
      }
    };
  
    // Clear previous chart if it exists
    if (engagementChartRef.value.innerHTML) {
      engagementChartRef.value.innerHTML = '';
    }
  
    const chart = new ApexCharts(engagementChartRef.value, options);
    chart.render();
  };
  
  definePageMeta({
      layout: 'dashboard'
  })
  
  // Initialize chart on mount - only on client side
  onMounted(async () => {
    // Dynamically import ApexCharts only on client side
    if (process.client) {
      ApexCharts = (await import('apexcharts')).default;
      // Wait for the next tick to ensure the DOM is fully rendered
      setTimeout(() => {
        renderEngagementChart();
      }, 0);
    }
  });
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