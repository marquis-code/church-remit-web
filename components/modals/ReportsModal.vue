<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" @click="closeModal"></div>
  
        <!-- Modal panel -->
        <div class="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:align-middle">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <BarChart3 class="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">
                  Volunteer Reports & Analytics
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Generate and view reports on volunteer activity, training completion, and more.
                  </p>
                </div>
              </div>
            </div>
  
            <div class="mt-6">
              <!-- Report Filters -->
              <div class="mb-6 rounded-md bg-gray-50 p-4">
                <div class="flex flex-wrap items-center gap-4">
                  <div class="w-full sm:w-auto">
                    <label for="reportType" class="block text-sm font-medium text-gray-700">Report Type</label>
                    <select
                      id="reportType"
                      v-model="filters.reportType"
                      class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="volunteer-activity">Volunteer Activity</option>
                      <option value="training-completion">Training Completion</option>
                      <option value="department-stats">Department Statistics</option>
                      <option value="attendance">Attendance Report</option>
                    </select>
                  </div>
                  
                  <div class="w-full sm:w-auto">
                    <label for="dateRange" class="block text-sm font-medium text-gray-700">Date Range</label>
                    <select
                      id="dateRange"
                      v-model="filters.dateRange"
                      class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="last-week">Last Week</option>
                      <option value="last-month">Last Month</option>
                      <option value="last-quarter">Last Quarter</option>
                      <option value="last-year">Last Year</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>
                  
                  <div v-if="filters.dateRange === 'custom'" class="flex w-full flex-wrap gap-2 sm:w-auto">
                    <div>
                      <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
                      <input
                        type="date"
                        id="startDate"
                        v-model="filters.startDate"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div>
                      <label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
                      <input
                        type="date"
                        id="endDate"
                        v-model="filters.endDate"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div class="w-full sm:w-auto">
                    <label for="department" class="block text-sm font-medium text-gray-700">Department</label>
                    <select
                      id="department"
                      v-model="filters.departmentId"
                      class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">All Departments</option>
                      <option v-for="department in departments" :key="department.id" :value="department.id">
                        {{ department.name }}
                      </option>
                    </select>
                  </div>
                  
                  <div class="mt-auto">
                    <button
                      type="button"
                      class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      @click="generateReport"
                    >
                      <RefreshCw v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                      <FileBarChart v-else class="mr-2 h-4 w-4" />
                      {{ isLoading ? 'Generating...' : 'Generate Report' }}
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- Report Content -->
              <div class="rounded-md border border-gray-200">
                <!-- Report Header -->
                <div class="border-b border-gray-200 bg-gray-50 px-4 py-3 sm:flex sm:items-center sm:justify-between">
                  <h3 class="text-base font-medium text-gray-900">
                    {{ reportTitle }}
                  </h3>
                  <div class="mt-3 flex sm:mt-0">
                    <button
                      type="button"
                      class="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <Printer class="mr-1.5 h-4 w-4 text-gray-500" />
                      Print
                    </button>
                    <button
                      type="button"
                      class="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      <Download class="mr-1.5 h-4 w-4 text-gray-500" />
                      Export
                    </button>
                  </div>
                </div>
                
                <!-- Report Content -->
                <div class="p-4">
                  <div v-if="!reportData" class="py-12 text-center">
                    <FileBarChart class="mx-auto h-12 w-12 text-gray-400" />
                    <h3 class="mt-2 text-sm font-medium text-gray-900">No report generated</h3>
                    <p class="mt-1 text-sm text-gray-500">Select your filters and click "Generate Report" to view data.</p>
                  </div>
                  
                  <div v-else>
                    <!-- Report Summary -->
                    <div class="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                      <div v-for="(stat, index) in reportData.summary" :key="index" class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                        <dt class="truncate text-sm font-medium text-gray-500">{{ stat.name }}</dt>
                        <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{{ stat.value }}</dd>
                        <dd v-if="stat.change" class="mt-2 flex items-baseline">
                          <span :class="[
                            stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                            'text-sm font-semibold'
                          ]">
                            {{ stat.change }}
                          </span>
                          <span class="ml-2 text-sm text-gray-500">from previous period</span>
                        </dd>
                      </div>
                    </div>
                    
                    <!-- Chart -->
                    <div class="mb-6 overflow-hidden rounded-lg bg-white shadow">
                      <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-base font-medium text-gray-900">{{ reportData.chart.title }}</h3>
                        <div class="mt-4 h-64">
                          <ClientOnly>
                            <div ref="chartRef" class="h-full w-full"></div>
                          </ClientOnly>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Data Table -->
                    <div class="overflow-hidden rounded-lg bg-white shadow">
                      <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-base font-medium text-gray-900">{{ reportData.table.title }}</h3>
                        <div class="mt-4 flow-root">
                          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                              <table class="min-w-full divide-y divide-gray-300">
                                <thead>
                                  <tr>
                                    <th v-for="(header, index) in reportData.table.headers" :key="index" scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                                      {{ header }}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                  <tr v-for="(row, rowIndex) in reportData.table.rows" :key="rowIndex">
                                    <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500">
                                      {{ cell }}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              class="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              @click="saveReport"
              :disabled="!reportData || isSaving"
            >
              <Loader2 v-if="isSaving" class="mr-2 h-4 w-4 animate-spin" />
              {{ isSaving ? 'Saving...' : 'Save Report' }}
            </button>
            <button
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
              @click="closeModal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue';
  import { BarChart3, RefreshCw, FileBarChart, Printer, Download, Loader2 } from 'lucide-vue-next';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    }
  });
  
  const emit = defineEmits(['close', 'saved']);
  
  // Chart reference
  const chartRef = ref(null);
  let chart = null;
  
  // State variables
  const isLoading = ref(false);
  const isSaving = ref(false);
  const reportData = ref(null);
  
  // Filters
  const filters = ref({
    reportType: 'volunteer-activity',
    dateRange: 'last-month',
    startDate: '',
    endDate: '',
    departmentId: ''
  });
  
  // Mock data
  const departments = ref([
    { id: '1', name: 'Worship Team' },
    { id: '2', name: 'Children\'s Ministry' },
    { id: '3', name: 'Media Team' },
    { id: '4', name: 'Hospitality' },
    { id: '5', name: 'Outreach' }
  ]);
  
  // Computed properties
  const reportTitle = computed(() => {
    const reportTypes = {
      'volunteer-activity': 'Volunteer Activity Report',
      'training-completion': 'Training Completion Report',
      'department-stats': 'Department Statistics Report',
      'attendance': 'Attendance Report'
    };
    
    const dateRanges = {
      'last-week': 'Last Week',
      'last-month': 'Last Month',
      'last-quarter': 'Last Quarter',
      'last-year': 'Last Year',
      'custom': 'Custom Range'
    };
    
    let departmentText = filters.value.departmentId 
      ? departments.value.find(d => d.id === filters.value.departmentId)?.name 
      : 'All Departments';
    
    return `${reportTypes[filters.value.reportType]} - ${departmentText} (${dateRanges[filters.value.dateRange]})`;
  });
  
  // Methods
  const generateReport = async () => {
    isLoading.value = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock report data based on filters
      reportData.value = generateMockReportData();
      
      // Render chart in the next tick
      setTimeout(() => {
        renderChart();
      }, 0);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const generateMockReportData = () => {
    // Different mock data based on report type
    if (filters.value.reportType === 'volunteer-activity') {
      return {
        summary: [
          { name: 'Active Volunteers', value: '124', change: '+12%', changeType: 'increase' },
          { name: 'Hours Served', value: '1,248', change: '+8%', changeType: 'increase' },
          { name: 'Avg. Hours per Volunteer', value: '10.1', change: '-2%', changeType: 'decrease' },
          { name: 'New Volunteers', value: '18', change: '+5%', changeType: 'increase' }
        ],
        chart: {
          title: 'Volunteer Activity by Department',
          type: 'bar',
          data: {
            categories: ['Worship Team', 'Children\'s Ministry', 'Media Team', 'Hospitality', 'Outreach'],
            series: [
              { name: 'Active Volunteers', data: [32, 45, 18, 24, 15] },
              { name: 'Hours Served', data: [320, 410, 270, 190, 58] }
            ]
          }
        },
        table: {
          title: 'Top Volunteers by Hours',
          headers: ['Volunteer', 'Department', 'Role', 'Hours', 'Status'],
          rows: [
            ['Sarah Johnson', 'Children\'s Ministry', 'Elementary Teacher', '42', 'Active'],
            ['John Smith', 'Worship Team', 'Worship Leader', '38', 'Active'],
            ['Michael Brown', 'Media Team', 'Sound Engineer', '36', 'Active'],
            ['Emily Davis', 'Hospitality', 'Greeter', '32', 'Active'],
            ['David Wilson', 'Outreach', 'Community Volunteer', '28', 'Active']
          ]
        }
      };
    } else if (filters.value.reportType === 'training-completion') {
      return {
        summary: [
          { name: 'Total Courses', value: '15', change: '+3', changeType: 'increase' },
          { name: 'Active Learners', value: '45', change: '+12%', changeType: 'increase' },
          { name: 'Completion Rate', value: '78%', change: '+5%', changeType: 'increase' },
          { name: 'Avg. Completion Time', value: '3.2 days', change: '-8%', changeType: 'decrease' }
        ],
        chart: {
          title: 'Training Completion Rates by Course',
          type: 'bar',
          data: {
            categories: ['Child Safety', 'Leadership', 'Sound System', 'First Aid', 'Worship Planning'],
            series: [
              { name: 'Enrolled', data: [42, 28, 18, 32, 24] },
              { name: 'Completed', data: [38, 22, 12, 28, 20] }
            ]
          }
        },
        table: {
          title: 'Recent Course Completions',
          headers: ['Volunteer', 'Course', 'Completion Date', 'Score', 'Certificate'],
          rows: [
            ['Rachel Adams', 'Child Safety Training', '2023-03-05', '92%', 'Issued'],
            ['James Lee', 'Sound System Operation', '2023-03-02', '85%', 'Issued'],
            ['Lisa Chen', 'First Aid Certification', '2023-02-28', '90%', 'Issued'],
            ['David Wilson', 'Leadership Fundamentals', '2023-02-25', '88%', 'Issued'],
            ['Emily Davis', 'Media Team Orientation', '2023-02-20', '95%', 'Issued']
          ]
        }
      };
    } else {
      // Default mock data for other report types
      return {
        summary: [
          { name: 'Total Volunteers', value: '156', change: '+12%', changeType: 'increase' },
          { name: 'Active Roles', value: '48', change: '+8%', changeType: 'increase' },
          { name: 'Departments', value: '8', change: '+1', changeType: 'increase' },
          { name: 'Attendance Rate', value: '92%', change: '+3%', changeType: 'increase' }
        ],
        chart: {
          title: 'Department Performance Overview',
          type: 'line',
          data: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            series: [
              { name: 'Worship Team', data: [30, 32, 35, 38, 40, 42] },
              { name: 'Children\'s Ministry', data: [25, 28, 30, 32, 35, 38] },
              { name: 'Media Team', data: [15, 18, 20, 22, 24, 25] }
            ]
          }
        },
        table: {
          title: 'Department Statistics',
          headers: ['Department', 'Volunteers', 'Roles', 'Avg. Attendance', 'Training Completion'],
          rows: [
            ['Worship Team', '32', '8', '95%', '88%'],
            ['Children\'s Ministry', '45', '12', '92%', '96%'],
            ['Media Team', '18', '6', '90%', '82%'],
            ['Hospitality', '24', '4', '88%', '75%'],
            ['Outreach', '15', '5', '85%', '80%']
          ]
        }
      };
    }
  };
  
  const renderChart = async () => {
    if (!chartRef.value || !reportData.value) return;
    
    // Import ApexCharts only on client side
    if (process.client) {
      try {
        const ApexCharts = (await import('apexcharts')).default;
        
        // Clear previous chart if it exists
        if (chart) {
          chart.destroy();
        }
        
        // Configure chart options based on report data
        const chartData = reportData.value.chart.data;
        const options = {
          series: chartData.series,
          chart: {
            type: reportData.value.chart.type === 'line' ? 'line' : 'bar',
            height: 250,
            toolbar: {
              show: false
            }
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
              endingShape: 'rounded'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },
          xaxis: {
            categories: chartData.categories
          },
          yaxis: {
            title: {
              text: reportData.value.chart.type === 'bar' ? 'Count' : 'Value'
            }
          },
          fill: {
            opacity: 1
          },
          tooltip: {
            y: {
              formatter: function (val) {
                return val
              }
            }
          },
          colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']
        };
        
        // Create and render chart
        chart = new ApexCharts(chartRef.value, options);
        chart.render();
      } catch (error) {
        console.error('Error rendering chart:', error);
      }
    }
  };
  
  const saveReport = async () => {
    if (!reportData.value) return;
    
    isSaving.value = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would save the report to your database
      console.log('Report saved:', {
        title: reportTitle.value,
        filters: filters.value,
        data: reportData.value,
        savedAt: new Date().toISOString()
      });
      
      // Emit success event
      emit('saved', {
        id: Math.random().toString(36).substr(2, 9),
        title: reportTitle.value,
        type: filters.value.reportType,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving report:', error);
    } finally {
      isSaving.value = false;
    }
  };
  
  const closeModal = () => {
    emit('close');
  };
  
  // Set default dates for custom range
  onMounted(() => {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    filters.value.startDate = formatDate(lastMonth);
    filters.value.endDate = formatDate(today);
  });
  </script>