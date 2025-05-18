<!-- 
<template>
    <div class="container mx-auto">
      <h1 class="text-xl font-semibold">Analytics & Reporting</h1>
  
 
      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Financial Health Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div v-for="metric in financialMetrics" :key="metric.name" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-500 mb-1">{{ metric.name }}</h3>
            <p class="text-2xl font-bold" :class="metric.color">{{ metric.value }}</p>
            <div class="flex items-center mt-2">
              <icon-trend-up v-if="metric.trend === 'up'" class="w-4 h-4 text-green-500 mr-1" />
              <icon-trend-down v-else class="w-4 h-4 text-red-500 mr-1" />
              <span :class="metric.trend === 'up' ? 'text-green-500' : 'text-red-500'">
                {{ metric.trendValue }}
              </span>
            </div>
          </div>
        </div>
        <div class="h-80">
          <canvas ref="financialChart"></canvas>
        </div>
      </div>
  

      <div class="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4">Custom Reports</h2>
        <div class="flex flex-wrap gap-4 mb-6">
          <button v-for="report in reportTypes" :key="report"
                  @click="generateReport(report)"
                  class="px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors">
            {{ report }}
          </button>
        </div>
        <div v-if="selectedReport" class="border rounded-lg p-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium">{{ selectedReport }} Report</h3>
            <div class="flex gap-2">
              <button @click="exportReport('csv')" class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                Export CSV
              </button>
              <button @click="exportReport('pdf')" class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                Export PDF
              </button>
              <button @click="exportReport('excel')" class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                Export Excel
              </button>
            </div>
          </div>
 
          <table class="w-full">
            <thead>
              <tr class="bg-gray-50">
                <th class="p-2 text-left">Date</th>
                <th class="p-2 text-left">Category</th>
                <th class="p-2 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in reportData" :key="index" class="border-t">
                <td class="p-2">{{ item.date }}</td>
                <td class="p-2">{{ item.category }}</td>
                <td class="p-2">{{ formatCurrency(item.amount) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-semibold mb-4">AI-Powered Insights</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="border rounded-lg p-4">
            <h3 class="text-lg font-medium mb-2">Donation Trends</h3>
            <p class="text-gray-600 mb-4">
              Based on AI analysis, donations have increased by 15% compared to last quarter.
              The trend suggests a positive correlation with recent community outreach programs.
            </p>
            <div class="h-48">
              <canvas ref="donationTrendChart"></canvas>
            </div>
          </div>
          <div class="border rounded-lg p-4">
            <h3 class="text-lg font-medium mb-2">Expenditure Optimization</h3>
            <p class="text-gray-600 mb-4">
              AI recommends reducing utility costs by 10% through energy-efficient upgrades,
              potentially saving $5,000 annually.
            </p>
            <ul class="list-disc list-inside text-sm text-gray-600">
              <li>Install LED lighting throughout the facility</li>
              <li>Upgrade to a smart thermostat system</li>
              <li>Conduct an energy audit for further savings opportunities</li>
            </ul>
          </div>
          <div class="border rounded-lg p-4">
            <h3 class="text-lg font-medium mb-2">Attendance Patterns</h3>
            <p class="text-gray-600 mb-4">
              AI analysis shows a 20% increase in youth program attendance on Wednesdays.
              Consider expanding resources for this growing segment.
            </p>
            <div class="h-48">
              <canvas ref="attendanceChart"></canvas>
            </div>
          </div>
          <div class="border rounded-lg p-4">
            <h3 class="text-lg font-medium mb-2">Fundraising Forecast</h3>
            <p class="text-gray-600 mb-4">
              Based on historical data and current trends, AI predicts the upcoming
              fundraising event could raise 25% more than last year's event.
            </p>
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-500">Predicted Amount:</span>
              <span class="text-lg font-bold text-green-600">$125,000</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div class="bg-green-600 h-2.5 rounded-full" style="width: 75%"></div>
            </div>
            <div class="flex justify-between text-sm text-gray-500 mt-1">
              <span>$0</span>
              <span>$100,000</span>
              <span>$200,000</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { Chart, registerables } from 'chart.js'
  // import { IconTrendUp, IconTrendDown } from '@iconify/vue'
  
  Chart.register(...registerables)
  
  const financialChart = ref<HTMLCanvasElement | null>(null)
  const donationTrendChart = ref<HTMLCanvasElement | null>(null)
  const attendanceChart = ref<HTMLCanvasElement | null>(null)
  
  const financialMetrics = ref([
    { name: 'Total Revenue', value: '$250,000', trend: 'up', trendValue: '8%', color: 'text-green-600' },
    { name: 'Total Expenses', value: '$180,000', trend: 'down', trendValue: '3%', color: 'text-red-600' },
    { name: 'Net Income', value: '$70,000', trend: 'up', trendValue: '12%', color: 'text-green-600' },
    { name: 'Cash Reserves', value: '$100,000', trend: 'up', trendValue: '5%', color: 'text-blue-600' },
  ])
  
  const reportTypes = ['Donations', 'Expenses', 'Payroll', 'Attendance']
  const selectedReport = ref('')
  const reportData = ref([])
  
  const generateReport = (type: string) => {
    selectedReport.value = type
    // Simulated report data
    reportData.value = [
      { date: '2025-03-01', category: 'Sunday Offering', amount: 5000 },
      { date: '2025-03-08', category: 'Sunday Offering', amount: 5500 },
      { date: '2025-03-15', category: 'Sunday Offering', amount: 4800 },
      { date: '2025-03-22', category: 'Sunday Offering', amount: 5200 },
      { date: '2025-03-29', category: 'Sunday Offering', amount: 5100 },
    ]
  }
  
  const exportReport = (format: string) => {
    console.log(`Exporting ${selectedReport.value} report in ${format} format`)
    // Implement export logic here
  }
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  definePageMeta({
    layout: 'dashboard'
  })
  
  
  onMounted(() => {
    if (financialChart.value) {
      new Chart(financialChart.value, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Revenue',
              data: [30000, 35000, 40000, 38000, 42000, 45000],
              borderColor: 'rgb(34, 197, 94)',
              tension: 0.1
            },
            {
              label: 'Expenses',
              data: [25000, 28000, 30000, 31000, 29000, 32000],
              borderColor: 'rgb(239, 68, 68)',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }
  
    if (donationTrendChart.value) {
      new Chart(donationTrendChart.value, {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [{
            label: 'Donations',
            data: [65000, 70000, 75000, 85000],
            backgroundColor: 'rgba(59, 130, 246, 0.5)'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }
  
    if (attendanceChart.value) {
      new Chart(attendanceChart.value, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [{
            label: 'Youth Attendance',
            data: [50, 60, 75, 90],
            borderColor: 'rgb(249, 115, 22)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      })
    }
  })
  </script> -->

  <template>
    <NuxtLayout name="analytics">
      <div class="space-y-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="(stat, index) in stats" :key="index" 
            class="transform transition-all duration-300 hover:scale-105 overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
            :class="stat.color"
          >
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <component :is="stat.icon" class="h-8 w-8 text-white" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dt class="truncate text-sm font-medium text-white">{{ stat.name }}</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-white">{{ stat.value }}</div>
                  <div class="ml-2 flex items-baseline text-sm font-semibold" :class="stat.changeColor">
                    <component :is="stat.changeType === 'increase' ? TrendingUp : TrendingDown" class="h-4 w-4 flex-shrink-0 self-center" />
                    <span class="ml-1">{{ stat.change }}</span>
                  </div>
                </dd>
              </div>
            </div>
          </div>
        </div>
  
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="overflow-hidden rounded-lg bg-white shadow">
            <div class="p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">Recent Activity</h3>
                <div class="flex space-x-3">
                  <button class="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    Today
                  </button>
                  <button class="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    This Week
                  </button>
                  <button class="rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    This Month
                  </button>
                </div>
              </div>
              <div class="mt-6 flow-root">
                <ul role="list" class="-my-5 divide-y divide-gray-200">
                  <li v-for="(activity, index) in recentActivity" :key="index" class="py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <component :is="activity.icon" class="h-6 w-6" :class="activity.iconColor" />
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900">{{ activity.title }}</p>
                        <p class="truncate text-sm text-gray-500">{{ activity.description }}</p>
                      </div>
                      <div>
                        <span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" :class="activity.badgeColor">
                          {{ activity.time }}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mt-6">
                <NuxtLink to="/dashboard/analytics/financial" class="flex w-full items-center justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                  View all reports
                </NuxtLink>
              </div>
            </div>
          </div>
  
          <div class="overflow-hidden rounded-lg bg-white shadow">
            <div class="p-6">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium leading-6 text-gray-900">AI Insights</h3>
                <span class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                  New
                </span>
              </div>
              <div class="mt-6 flow-root">
                <ul role="list" class="-my-5 divide-y divide-gray-200">
                  <li v-for="(insight, index) in aiInsights" :key="index" class="py-4">
                    <div class="flex items-center space-x-4">
                      <div class="flex-shrink-0">
                        <component :is="insight.icon" class="h-6 w-6 text-blue-500" />
                      </div>
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-medium text-gray-900">{{ insight.title }}</p>
                        <p class="truncate text-sm text-gray-500">{{ insight.description }}</p>
                      </div>
                      <div>
                        <button class="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                          <ChevronRight class="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="mt-6">
                <NuxtLink to="/dashboard/analytics/insights" class="flex w-full items-center justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                  View all insights
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup lang="ts">
  import { 
    DollarSign, 
    Users, 
    Calendar, 
    TrendingUp, 
    TrendingDown, 
    ChevronRight,
    Brain,
    AlertTriangle,
    BarChart2,
    CreditCard
  } from 'lucide-vue-next';
  
  const stats = [
    { 
      name: 'Total Donations', 
      value: '$24,765', 
      change: '12%', 
      changeType: 'increase',
      changeColor: 'text-green-100',
      icon: DollarSign,
      color: 'bg-gradient-to-r from-purple-600 to-purple-700'
    },
    { 
      name: 'Attendance', 
      value: '1,432', 
      change: '8%', 
      changeType: 'increase',
      changeColor: 'text-green-100',
      icon: Users,
      color: 'bg-gradient-to-r from-blue-600 to-blue-700'
    },
    { 
      name: 'Expenses', 
      value: '$18,230', 
      change: '3%', 
      changeType: 'decrease',
      changeColor: 'text-red-100',
      icon: CreditCard,
      color: 'bg-gradient-to-r from-red-600 to-red-700'
    },
    { 
      name: 'Events', 
      value: '24', 
      change: '5%', 
      changeType: 'increase',
      changeColor: 'text-green-100',
      icon: Calendar,
      color: 'bg-gradient-to-r from-green-600 to-green-700'
    }
  ];
  
  const recentActivity = [
    {
      title: 'Monthly Financial Report',
      description: 'March 2025 financial summary is ready for review',
      time: 'Just now',
      icon: BarChart2,
      iconColor: 'text-purple-500',
      badgeColor: 'bg-green-100 text-green-800'
    },
    {
      title: 'Donation Export',
      description: 'Q1 donation data exported to Excel',
      time: '2h ago',
      icon: DollarSign,
      iconColor: 'text-green-500',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      title: 'Attendance Report',
      description: 'Weekly attendance report generated',
      time: '1d ago',
      icon: Users,
      iconColor: 'text-blue-500',
      badgeColor: 'bg-gray-100 text-gray-800'
    },
    {
      title: 'Payroll Summary',
      description: 'Staff payroll report for March completed',
      time: '2d ago',
      icon: CreditCard,
      iconColor: 'text-yellow-500',
      badgeColor: 'bg-gray-100 text-gray-800'
    }
  ];
  
  const aiInsights = [
    {
      title: 'Donation Pattern Detected',
      description: 'Donations increase by 24% after community events',
      icon: Brain
    },
    {
      title: 'Budget Optimization',
      description: 'Potential 15% cost savings in facility management',
      icon: BarChart2
    },
    {
      title: 'Unusual Transaction Alert',
      description: 'Multiple large transactions detected outside normal patterns',
      icon: AlertTriangle
    },
    {
      title: 'Engagement Recommendation',
      description: 'Increase member retention with targeted follow-ups',
      icon: Users
    }
  ];
  </script>