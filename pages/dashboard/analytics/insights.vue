<template>
    <NuxtLayout name="analytics">
      <div class="space-y-6">
        <!-- Page header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">AI-Powered Insights & Recommendations</h2>
            <p class="mt-1 text-sm text-gray-500">Leverage AI to detect trends, predict outcomes, and optimize operations</p>
          </div>
          <div class="mt-4 flex sm:mt-0">
            <button 
              @click="refreshInsights"
              class="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <RefreshCw class="mr-1.5 h-5 w-5" />
              Refresh Insights
            </button>
          </div>
        </div>
  
        <!-- AI Status -->
        <div class="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 shadow">
          <div class="p-6 text-white">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Brain class="h-8 w-8" />
              </div>
              <div class="ml-5">
                <h3 class="text-lg font-medium">AI Analysis Engine</h3>
                <div class="mt-1 flex items-center">
                  <span class="text-sm">Last updated: {{ lastUpdated }}</span>
                  <span class="ml-4 inline-flex items-center rounded-full bg-blue-200 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
            <div class="mt-4">
              <div class="w-full bg-blue-200 rounded-full h-2.5">
                <div class="bg-white h-2.5 rounded-full" style="width: 85%"></div>
              </div>
              <div class="mt-2 flex justify-between text-sm">
                <span>Data processed: 85%</span>
                <span>Next update in: 35 minutes</span>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Trend Analysis -->
        <div class="rounded-lg bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Donation & Attendance Trends</h3>
            <p class="mt-1 text-sm text-gray-500">AI-driven analysis of patterns and correlations</p>
            
            <div class="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div class="rounded-lg bg-gray-50 p-4">
                <h4 class="text-sm font-medium text-gray-900">Donation Patterns by Day of Week</h4>
                <div class="mt-4 h-64 w-full">
                  <!-- Chart placeholder -->
                  <div class="h-full w-full bg-white rounded-lg p-4 flex items-center justify-center">
                    <div class="w-full h-full relative">
                      <div class="absolute bottom-0 left-0 w-full h-full flex items-end">
                        <div v-for="(day, index) in donationsByDay" :key="index" class="flex-1 mx-1 flex flex-col items-center">
                          <div 
                            class="w-8 bg-blue-500 rounded-t-sm transition-all duration-500" 
                            :style="{ height: `${day.amount / 10}px` }"
                          ></div>
                          <div class="text-xs text-gray-500 mt-2">{{ day.name }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="rounded-md bg-blue-50 p-4">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <LightbulbIcon class="h-5 w-5 text-blue-400" />
                      </div>
                      <div class="ml-3">
                        <h3 class="text-sm font-medium text-blue-800">AI Insight</h3>
                        <div class="mt-2 text-sm text-blue-700">
                          <p>Sunday donations are 24% higher than other days. Consider implementing a digital giving reminder system for weekday services.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="rounded-lg bg-gray-50 p-4">
                <h4 class="text-sm font-medium text-gray-900">Attendance Correlation with Events</h4>
                <div class="mt-4 h-64 w-full">
                  <!-- Chart placeholder -->
                  <div class="h-full w-full bg-white rounded-lg p-4 flex items-center justify-center">
                    <div class="w-full h-full relative">
                      <div class="absolute bottom-0 left-0 w-full h-full flex items-end">
                        <div v-for="(event, index) in attendanceByEvent" :key="index" class="flex-1 mx-1 flex flex-col items-center">
                          <div 
                            class="w-8 bg-purple-500 rounded-t-sm transition-all duration-500" 
                            :style="{ height: `${event.attendance / 5}px` }"
                          ></div>
                          <div class="text-xs text-gray-500 mt-2 text-center">{{ event.name }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="rounded-md bg-purple-50 p-4">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <LightbulbIcon class="h-5 w-5 text-purple-400" />
                      </div>
                      <div class="ml-3">
                        <h3 class="text-sm font-medium text-purple-800">AI Insight</h3>
                        <div class="mt-2 text-sm text-purple-700">
                          <p>Community outreach events show 35% higher attendance. Consider increasing these events by 20% in the next quarter.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Predictive Analytics -->
        <div class="rounded-lg bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Predictive Analytics</h3>
            <p class="mt-1 text-sm text-gray-500">Financial forecasting and budget optimization</p>
            
            <div class="mt-6">
              <div class="rounded-lg bg-gray-50 p-4">
                <h4 class="text-sm font-medium text-gray-900">6-Month Donation Forecast</h4>
                <div class="mt-4 h-64 w-full">
                  <!-- Chart placeholder -->
                  <div class="h-full w-full bg-white rounded-lg p-4 flex items-center justify-center">
                    <div class="w-full h-full relative">
                      <div class="absolute bottom-0 left-0 w-full h-full flex items-end">
                        <div v-for="(month, index) in forecastData" :key="index" class="flex-1 mx-1 flex flex-col items-center">
                          <div class="relative w-full flex justify-center">
                            <div 
                              class="w-8 rounded-t-sm transition-all duration-500" 
                              :class="month.isPrediction ? 'bg-yellow-400' : 'bg-blue-500'"
                              :style="{ height: `${month.amount / 10}px` }"
                            ></div>
                            <div v-if="month.isPrediction" class="absolute -top-2 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                              <span class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-yellow-400 opacity-75"></span>
                              <span class="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                            </div>
                          </div>
                          <div class="text-xs text-gray-500 mt-2">{{ month.name }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 flex justify-center space-x-8">
                  <div class="flex items-center">
                    <span class="h-3 w-3 rounded-full bg-blue-500"></span>
                    <span class="ml-2 text-sm text-gray-500">Historical</span>
                  </div>
                  <div class="flex items-center">
                    <span class="h-3 w-3 rounded-full bg-yellow-400"></span>
                    <span class="ml-2 text-sm text-gray-500">Predicted</span>
                  </div>
                </div>
                <div class="mt-4">
                  <div class="rounded-md bg-yellow-50 p-4">
                    <div class="flex">
                      <div class="flex-shrink-0">
                        <TrendingUp class="h-5 w-5 text-yellow-400" />
                      </div>
                      <div class="ml-3">
                        <h3 class="text-sm font-medium text-yellow-800">Forecast Insight</h3>
                        <div class="mt-2 text-sm text-yellow-700">
                          <p>Predicted 18% increase in donations over the next 6 months. Consider allocating additional resources to facility improvements in Q4.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Optimization Recommendations -->
        <div class="rounded-lg bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Optimization Recommendations</h3>
            <p class="mt-1 text-sm text-gray-500">AI-generated suggestions to improve operations and engagement</p>
            
            <div class="mt-6 space-y-4">
              <div v-for="(recommendation, index) in recommendations" :key="index" 
                class="transform transition-all duration-300 hover:scale-[1.01] rounded-lg border-l-4 p-4 shadow-sm"
                :class="recommendation.borderColor"
              >
                <div class="flex">
                  <div class="flex-shrink-0">
                    <component :is="recommendation.icon" class="h-5 w-5" :class="recommendation.iconColor" />
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium" :class="recommendation.textColor">{{ recommendation.title }}</h3>
                    <div class="mt-2 text-sm" :class="recommendation.descriptionColor">
                      <p>{{ recommendation.description }}</p>
                    </div>
                    <div class="mt-3 flex space-x-2">
                      <button 
                        class="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium shadow-sm ring-1 ring-inset"
                        :class="recommendation.buttonClass"
                      >
                        Implement
                      </button>
                      <button class="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <div class="ml-auto flex-shrink-0">
                    <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium" :class="recommendation.priorityClass">
                      {{ recommendation.priority }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Risk Alerts -->
        <div class="rounded-lg bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Risk Alerts</h3>
            <p class="mt-1 text-sm text-gray-500">AI-detected unusual patterns or potential issues</p>
            
            <div class="mt-6 space-y-4">
              <div v-for="(alert, index) in riskAlerts" :key="index" 
                class="transform transition-all duration-300 hover:scale-[1.01] rounded-lg bg-red-50 p-4 shadow-sm"
              >
                <div class="flex">
                  <div class="flex-shrink-0">
                    <AlertTriangle class="h-5 w-5 text-red-400" />
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">{{ alert.title }}</h3>
                    <div class="mt-2 text-sm text-red-700">
                      <p>{{ alert.description }}</p>
                    </div>
                    <div class="mt-3 flex space-x-2">
                      <button class="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-red-700 shadow-sm ring-1 ring-inset ring-red-700 hover:bg-red-50">
                        Investigate
                      </button>
                      <button class="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        Dismiss
                      </button>
                    </div>
                  </div>
                  <div class="ml-auto flex-shrink-0">
                    <span class="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800">
                      {{ alert.severity }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { 
    Brain, 
    RefreshCw, 
    TrendingUp, 
    AlertTriangle, 
    DollarSign, 
    Users, 
    Calendar,
    LightbulbIcon,
    Zap,
    Target,
    Percent
  } from 'lucide-vue-next';
  
  const lastUpdated = ref('Today at 10:45 AM');
  
  const refreshInsights = () => {
    // In a real app, this would refresh the AI insights
    lastUpdated.value = 'Just now';
    
    // Add animation effect to show refresh
    const elements = document.querySelectorAll('.transform');
    elements.forEach(el => {
      el.classList.add('scale-105');
      setTimeout(() => {
        el.classList.remove('scale-105');
      }, 300);
    });
  };
  
  // Donation patterns by day
  const donationsByDay = [
    { name: 'Mon', amount: 250 },
    { name: 'Tue', amount: 320 },
    { name: 'Wed', amount: 480 },
    { name: 'Thu', amount: 380 },
    { name: 'Fri', amount: 430 },
    { name: 'Sat', amount: 590 },
    { name: 'Sun', amount: 780 }
  ];
  
  // Attendance by event type
  const attendanceByEvent = [
    { name: 'Sunday Service', attendance: 450 },
    { name: 'Bible Study', attendance: 180 },
    { name: 'Youth Group', attendance: 220 },
    { name: 'Community Outreach', attendance: 380 },
    { name: 'Special Events', attendance: 320 }
  ];
  
  // Forecast data
  const forecastData = [
    { name: 'Jan', amount: 580, isPrediction: false },
    { name: 'Feb', amount: 620, isPrediction: false },
    { name: 'Mar', amount: 680, isPrediction: false },
    { name: 'Apr', amount: 720, isPrediction: true },
    { name: 'May', amount: 780, isPrediction: true },
    { name: 'Jun', amount: 850, isPrediction: true }
  ];
  
  // Optimization recommendations
  const recommendations = [
    {
      title: 'Increase Digital Giving Options',
      description: 'Adding mobile payment options could increase donations by 15% based on current user behavior.',
      priority: 'High Priority',
      icon: DollarSign,
      iconColor: 'text-green-500',
      textColor: 'text-green-800',
      descriptionColor: 'text-green-700',
      borderColor: 'border-green-500',
      buttonClass: 'text-green-700 ring-green-700 hover:bg-green-50',
      priorityClass: 'bg-green-100 text-green-800'
    },
    {
      title: 'Optimize Volunteer Scheduling',
      description: 'Current volunteer utilization is at 65%. Implementing a rotation system could improve efficiency by 20%.',
      priority: 'Medium Priority',
      icon: Users,
      iconColor: 'text-blue-500',
      textColor: 'text-blue-800',
      descriptionColor: 'text-blue-700',
      borderColor: 'border-blue-500',
      buttonClass: 'text-blue-700 ring-blue-700 hover:bg-blue-50',
      priorityClass: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Reduce Facility Energy Costs',
      description: 'Analysis shows potential 12% reduction in energy costs by adjusting HVAC schedules based on actual usage patterns.',
      priority: 'Medium Priority',
      icon: Zap,
      iconColor: 'text-yellow-500',
      textColor: 'text-yellow-800',
      descriptionColor: 'text-yellow-700',
      borderColor: 'border-yellow-500',
      buttonClass: 'text-yellow-700 ring-yellow-700 hover:bg-yellow-50',
      priorityClass: 'bg-yellow-100 text-yellow-800'
    },
    {
      title: 'Targeted Member Engagement',
      description: 'Segmenting communications based on attendance patterns could increase engagement by 25%.',
      priority: 'High Priority',
      icon: Target,
      iconColor: 'text-purple-500',
      textColor: 'text-purple-800',
      descriptionColor: 'text-purple-700',
      borderColor: 'border-purple-500',
      buttonClass: 'text-purple-700 ring-purple-700 hover:bg-purple-50',
      priorityClass: 'bg-purple-100 text-purple-800'
    }
  ];
  
  // Risk alerts
  const riskAlerts = [
    {
      title: 'Unusual Transaction Pattern Detected',
      description: 'Multiple large transactions ($500+) from the same source within 24 hours.',
      severity: 'High Severity'
    },
    {
      title: 'Budget Variance Alert',
      description: 'Facility maintenance expenses are 35% over budget for the current quarter.',
      severity: 'Medium Severity'
    },
    {
      title: 'Declining Attendance Pattern',
      description: 'Youth program attendance has decreased by 18% over the last 3 months.',
      severity: 'Medium Severity'
    }
  ];
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  .transform {
    transition: all 0.3s ease;
  }
  </style>