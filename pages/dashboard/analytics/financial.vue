<template>
    <NuxtLayout name="analytics">
      <div class="space-y-6">
        <!-- Page header -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold leading-7 text-gray-900">Financial & Operational Reports</h2>
            <p class="mt-1 text-sm text-gray-500">Generate custom reports, export data, and monitor financial health</p>
          </div>
          <div class="mt-4 flex sm:mt-0">
            <button 
              @click="showReportModal = true"
              class="inline-flex items-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              <Plus class="mr-1.5 h-5 w-5" />
              New Report
            </button>
          </div>
        </div>
  
        <!-- Report filters -->
        <div class="rounded-lg bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Report Filters</h3>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label for="report-type" class="block text-sm font-medium text-gray-700">Report Type</label>
                <select 
                  id="report-type" 
                  v-model="filters.reportType"
                  class="mt-1 block w-full border-[0.5px]  rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                >
                  <option value="donations">Donations</option>
                  <option value="expenses">Expenses</option>
                  <option value="payroll">Payroll</option>
                  <option value="attendance">Attendance</option>
                </select>
              </div>
              <div>
                <label for="date-range" class="block text-sm font-medium text-gray-700">Date Range</label>
                <select 
                  id="date-range" 
                  v-model="filters.dateRange"
                  class="mt-1 block w-full border-[0.5px]  rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                >
                  <option value="today">Today</option>
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="last-month">Last Month</option>
                  <option value="this-year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div v-if="filters.dateRange === 'custom'" class="sm:col-span-2">
                <div class="flex space-x-4">
                  <div class="flex-1">
                    <label for="start-date" class="block text-sm font-medium text-gray-700">Start Date</label>
                    <input 
                      type="date" 
                      id="start-date" 
                      v-model="filters.startDate"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    />
                  </div>
                  <div class="flex-1">
                    <label for="end-date" class="block text-sm font-medium text-gray-700">End Date</label>
                    <input 
                      type="date" 
                      id="end-date" 
                      v-model="filters.endDate"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-4 flex justify-end space-x-3">
              <button 
                @click="resetFilters"
                class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Reset
              </button>
              <button 
                @click="applyFilters"
                class="rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
  
        <!-- Financial Health Dashboard -->
        <div class="rounded-lg bg-white shadow">
          <div class="p-6">
            <div class="flex items-center justify-between">
              <h3 class="text-base font-semibold leading-6 text-gray-900">Financial Health Dashboard</h3>
              <div class="flex items-center">
                <span class="mr-2 text-sm text-gray-500">Real-time updates</span>
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
              </div>
            </div>
            
            <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div v-for="(metric, index) in financialMetrics" :key="index" 
                class="transform transition-all duration-300 hover:scale-105 overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6 border"
                :class="metric.borderColor"
              >
                <dt class="truncate text-sm font-medium text-gray-500">{{ metric.name }}</dt>
                <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ metric.value }}</dd>
                <dd class="mt-2">
                  <div class="flex items-center">
                    <div class="flex-1 h-2 rounded-full" :class="metric.bgColor">
                      <div class="h-2 rounded-full" :class="metric.fillColor" :style="{ width: metric.percentage }"></div>
                    </div>
                    <span class="ml-2 text-sm font-medium" :class="metric.textColor">{{ metric.percentage }}</span>
                  </div>
                </dd>
              </div>
            </div>
  
            <div class="mt-6">
              <div class="rounded-lg bg-gray-50 p-4">
                <h4 class="text-sm font-medium text-gray-900">Monthly Income vs. Expenses</h4>
                <div class="mt-4 h-64 w-full">
                  <!-- Chart placeholder - in a real app, you'd use a chart library like Chart.js -->
                  <div class="h-full w-full bg-white rounded-lg p-4 flex items-center justify-center">
                    <div class="w-full h-full relative">
                      <div class="absolute bottom-0 left-0 w-full h-full flex items-end">
                        <div v-for="(month, index) in chartData" :key="index" class="flex-1 mx-1 flex flex-col items-center">
                          <div class="w-full flex justify-center space-x-1">
                            <div 
                              class="w-4 bg-purple-500 rounded-t-sm transition-all duration-500" 
                              :style="{ height: `${month.income / 2}px` }"
                              :data-tooltip-target="`income-${index}`"
                            ></div>
                            <div 
                              class="w-4 bg-red-500 rounded-t-sm transition-all duration-500" 
                              :style="{ height: `${month.expenses / 2}px` }"
                              :data-tooltip-target="`expenses-${index}`"
                            ></div>
                          </div>
                          <div class="text-xs text-gray-500 mt-2">{{ month.name }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 flex justify-center space-x-8">
                  <div class="flex items-center">
                    <span class="h-3 w-3 rounded-full bg-purple-500"></span>
                    <span class="ml-2 text-sm text-gray-500">Income</span>
                  </div>
                  <div class="flex items-center">
                    <span class="h-3 w-3 rounded-full bg-red-500"></span>
                    <span class="ml-2 text-sm text-gray-500">Expenses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Recent Reports -->
        <div class="rounded-lg bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Recent Reports</h3>
            <div class="mt-6 flow-root">
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Report Name</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Date Range</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created</th>
                        <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Format</th>
                        <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                          <span class="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                      <tr v-for="(report, index) in reports" :key="index" class="hover:bg-gray-50">
                        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{{ report.name }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ report.type }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ report.dateRange }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ report.created }}</td>
                        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium" :class="report.formatClass">
                            {{ report.format }}
                          </span>
                        </td>
                        <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <div class="flex space-x-2 justify-end">
                            <button class="text-purple-600 hover:text-purple-900">
                              <Eye class="h-5 w-5" />
                            </button>
                            <button class="text-gray-600 hover:text-gray-900">
                              <Download class="h-5 w-5" />
                            </button>
                            <button class="text-gray-600 hover:text-red-900">
                              <Trash class="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="mt-6 flex items-center justify-between">
              <div class="text-sm text-gray-500">
                Showing <span class="font-medium">1</span> to <span class="font-medium">10</span> of <span class="font-medium">20</span> reports
              </div>
              <div class="flex space-x-2">
                <button class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Previous
                </button>
                <button class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Export Options -->
        <div class="rounded-lg bg-white shadow">
          <div class="p-6">
            <h3 class="text-base font-semibold leading-6 text-gray-900">Export Options</h3>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div class="transform transition-all duration-300 hover:scale-105 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm hover:shadow">
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <FileText class="h-6 w-6 text-green-600" />
                </div>
                <h3 class="mt-3 text-sm font-medium text-gray-900">CSV Format</h3>
                <p class="mt-2 text-xs text-gray-500">Export data in CSV format for spreadsheet applications</p>
                <button class="mt-4 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Export as CSV
                </button>
              </div>
              <div class="transform transition-all duration-300 hover:scale-105 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm hover:shadow">
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <FileText class="h-6 w-6 text-blue-600" />
                </div>
                <h3 class="mt-3 text-sm font-medium text-gray-900">PDF Format</h3>
                <p class="mt-2 text-xs text-gray-500">Export data in PDF format for printing and sharing</p>
                <button class="mt-4 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Export as PDF
                </button>
              </div>
              <div class="transform transition-all duration-300 hover:scale-105 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm hover:shadow">
                <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <FileText class="h-6 w-6 text-green-600" />
                </div>
                <h3 class="mt-3 text-sm font-medium text-gray-900">Excel Format</h3>
                <p class="mt-2 text-xs text-gray-500">Export data in Excel format for advanced analysis</p>
                <button class="mt-4 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  Export as Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Create Report Modal -->
      <Teleport to="body">
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="showReportModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50"></div>
        </transition>
  
        <transition
          enter-active-class="ease-out duration-300"
          enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div v-if="showReportModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button 
                    @click="showReportModal = false"
                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    <span class="sr-only">Close</span>
                    <X class="h-6 w-6" />
                  </button>
                </div>
                <div>
                  <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <FileText class="h-6 w-6 text-purple-600" />
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <h3 class="text-base font-semibold leading-6 text-gray-900">Create New Report</h3>
                    <div class="mt-4">
                      <div class="space-y-4">
                        <div>
                          <label for="report-name" class="block text-sm font-medium text-gray-700 text-left">Report Name</label>
                          <input 
                            type="text" 
                            id="report-name" 
                            v-model="newReport.name"
                            class="mt-1 block w-full border-[0.5px] px-3 py-3 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
                            placeholder="Enter report name"
                          />
                        </div>
                        <div>
                          <label for="report-type-select" class="block text-sm font-medium text-gray-700 text-left">Report Type</label>
                          <select 
                            id="report-type-select" 
                            v-model="newReport.type"
                            class="mt-1 block w-full border-[0.5px] px-3 rounded-md border-gray-300 py-3 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                          >
                            <option value="donations">Donations</option>
                            <option value="expenses">Expenses</option>
                            <option value="payroll">Payroll</option>
                            <option value="attendance">Attendance</option>
                          </select>
                        </div>
                        <div>
                          <label for="date-range-select" class="block text-sm font-medium text-gray-700 text-left">Date Range</label>
                          <select 
                            id="date-range-select" 
                            v-model="newReport.dateRange"
                            class="mt-1 block w-full border-[0.5px] px-3 rounded-md border-gray-300 py-3 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                          >
                            <option value="today">Today</option>
                            <option value="this-week">This Week</option>
                            <option value="this-month">This Month</option>
                            <option value="last-month">Last Month</option>
                            <option value="this-year">This Year</option>
                            <option value="custom">Custom Range</option>
                          </select>
                        </div>
                        <div>
                          <label for="format-select" class="block text-sm font-medium text-gray-700 text-left">Format</label>
                          <select 
                            id="format-select" 
                            v-model="newReport.format"
                            class="mt-1 block w-full border-[0.5px] px-3 rounded-md border-gray-300 py-3 pl-3 pr-10 text-base focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
                          >
                            <option value="csv">CSV</option>
                            <option value="pdf">PDF</option>
                            <option value="excel">Excel</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button 
                    @click="createReport"
                    class="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 sm:col-start-2"
                  >
                    Create
                  </button>
                  <button 
                    @click="showReportModal = false"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </Teleport>
    </NuxtLayout>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { 
    Plus, 
    FileText, 
    Download, 
    Eye, 
    Trash, 
    X 
  } from 'lucide-vue-next';
  
  // Report filters
  const filters = reactive({
    reportType: 'donations',
    dateRange: 'this-month',
    startDate: '',
    endDate: ''
  });
  
  const resetFilters = () => {
    filters.reportType = 'donations';
    filters.dateRange = 'this-month';
    filters.startDate = '';
    filters.endDate = '';
  };
  
  const applyFilters = () => {
    // In a real app, this would fetch filtered data
    console.log('Applying filters:', filters);
  };
  
  // Financial metrics
  const financialMetrics = [
    {
      name: 'Income to Expense Ratio',
      value: '1.35',
      percentage: '75%',
      bgColor: 'bg-green-100',
      fillColor: 'bg-green-500',
      borderColor: 'border-green-200',
      textColor: 'text-green-700'
    },
    {
      name: 'Budget Utilization',
      value: '68%',
      percentage: '68%',
      bgColor: 'bg-blue-100',
      fillColor: 'bg-blue-500',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    },
    {
      name: 'Donation Growth',
      value: '+12%',
      percentage: '62%',
      bgColor: 'bg-purple-100',
      fillColor: 'bg-purple-500',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700'
    }
  ];
  
  // Chart data
  const chartData = [
    { name: 'Jan', income: 120, expenses: 90 },
    { name: 'Feb', income: 150, expenses: 110 },
    { name: 'Mar', income: 180, expenses: 130 },
    { name: 'Apr', income: 160, expenses: 120 },
    { name: 'May', income: 190, expenses: 140 },
    { name: 'Jun', income: 220, expenses: 150 }
  ];
  
  // Reports data
  const reports = [
    {
      name: 'Monthly Donation Summary',
      type: 'Donations',
      dateRange: 'Mar 2025',
      created: 'Apr 1, 2025',
      format: 'PDF',
      formatClass: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Q1 Financial Report',
      type: 'Expenses',
      dateRange: 'Jan-Mar 2025',
      created: 'Mar 31, 2025',
      format: 'Excel',
      formatClass: 'bg-green-100 text-green-800'
    },
    {
      name: 'Staff Payroll',
      type: 'Payroll',
      dateRange: 'Mar 2025',
      created: 'Mar 30, 2025',
      format: 'CSV',
      formatClass: 'bg-gray-100 text-gray-800'
    },
    {
      name: 'Sunday Service Attendance',
      type: 'Attendance',
      dateRange: 'Mar 2025',
      created: 'Mar 29, 2025',
      format: 'PDF',
      formatClass: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Special Event Donations',
      type: 'Donations',
      dateRange: 'Mar 15, 2025',
      created: 'Mar 16, 2025',
      format: 'Excel',
      formatClass: 'bg-green-100 text-green-800'
    }
  ];
  
  // Create report modal
  const showReportModal = ref(false);
  const newReport = reactive({
    name: '',
    type: 'donations',
    dateRange: 'this-month',
    format: 'pdf'
  });
  
  const createReport = () => {
    // In a real app, this would create a new report
    console.log('Creating report:', newReport);
    
    // Add to reports list
    reports.unshift({
      name: newReport.name || 'Untitled Report',
      type: newReport.type.charAt(0).toUpperCase() + newReport.type.slice(1),
      dateRange: 'Custom',
      created: 'Today',
      format: newReport.format.toUpperCase(),
      formatClass: newReport.format === 'pdf' ? 'bg-blue-100 text-blue-800' : 
                   newReport.format === 'excel' ? 'bg-green-100 text-green-800' : 
                   'bg-gray-100 text-gray-800'
    });
    
    // Close modal and reset form
    showReportModal.value = false;
    newReport.name = '';
    newReport.type = 'donations';
    newReport.dateRange = 'this-month';
    newReport.format = 'pdf';
  };
  </script>
  