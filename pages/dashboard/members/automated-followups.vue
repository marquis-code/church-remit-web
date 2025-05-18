<template>
    <div class="min-h-screen ">
      <div class="container mx-auto px-4">
        <div class="mb-8 animate-fade-in">
          <h1 class="text-3xl font-bold text-purple-800 mb-2">Automated Follow-ups</h1>
          <p class="text-gray-600">Automate engagement with members through personalized follow-ups.</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Sidebar with stats and quick actions -->
          <div class="lg:col-span-1">
            <div class="bg-white rounded-xl shadow-md p-6 mb-6 animate-slide-in" style="--delay: 0.1s">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-purple-50 rounded-lg p-4">
                  <p class="text-sm text-purple-600 font-medium">Active Automations</p>
                  <p class="text-2xl font-bold text-purple-800">{{ stats.activeAutomations }}</p>
                </div>
                <div class="bg-blue-50 rounded-lg p-4">
                  <p class="text-sm text-blue-600 font-medium">New Members</p>
                  <p class="text-2xl font-bold text-blue-800">{{ stats.newMembers }}</p>
                </div>
                <div class="bg-amber-50 rounded-lg p-4">
                  <p class="text-sm text-amber-600 font-medium">Absentees</p>
                  <p class="text-2xl font-bold text-amber-800">{{ stats.absentees }}</p>
                </div>
                <div class="bg-green-50 rounded-lg p-4">
                  <p class="text-sm text-green-600 font-medium">Engagement Rate</p>
                  <p class="text-2xl font-bold text-green-800">{{ stats.engagementRate }}%</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6 animate-slide-in" style="--delay: 0.2s">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
              <div class="space-y-3">
                <button @click="showCreateAutomationModal = true" class="w-full flex items-center justify-between p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-700 transition-colors">
                  <span class="font-medium">Create Automation</span>
                  <Icon name="mdi:plus-circle" />
                </button>
                <button class="w-full flex items-center justify-between p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-700 transition-colors">
                  <span class="font-medium">Send Test Message</span>
                  <Icon name="mdi:email-send" />
                </button>
                <button class="w-full flex items-center justify-between p-3 bg-amber-50 hover:bg-amber-100 rounded-lg text-amber-700 transition-colors">
                  <span class="font-medium">Manage Content</span>
                  <Icon name="mdi:file-document-edit" />
                </button>
                <button class="w-full flex items-center justify-between p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-700 transition-colors">
                  <span class="font-medium">View Analytics</span>
                  <Icon name="mdi:chart-line" />
                </button>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-md p-6 mt-6 animate-slide-in" style="--delay: 0.3s">
              <h2 class="text-xl font-semibold text-gray-800 mb-4">Upcoming Birthdays</h2>
              <div class="space-y-4">
                <div v-for="(birthday, index) in upcomingBirthdays" :key="index" class="flex items-center">
                  <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                    {{ birthday.name.split(' ').map(n => n[0]).join('') }}
                  </div>
                  <div class="ml-3">
                    <p class="text-gray-800 font-medium">{{ birthday.name }}</p>
                    <p class="text-sm text-gray-500">{{ birthday.date }}</p>
                  </div>
                  <div class="ml-auto">
                    <button class="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
                      <Icon name="mdi:cake-variant" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Main content area -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Tabs -->
            <div class="bg-white rounded-xl shadow-md animate-slide-in" style="--delay: 0.4s">
              <div class="border-b">
                <div class="flex overflow-x-auto">
                  <button 
                    v-for="tab in tabs" 
                    :key="tab.id" 
                    @click="activeTab = tab.id" 
                    class="px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors"
                    :class="activeTab === tab.id ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-600 hover:text-purple-600'"
                  >
                    {{ tab.name }}
                  </button>
                </div>
              </div>
              
              <!-- Automations Tab Content -->
              <div v-if="activeTab === 'automations'" class="p-6">
                <div class="flex justify-between items-center mb-6">
                  <h3 class="text-lg font-semibold text-gray-800">Active Automations</h3>
                  <div class="flex space-x-2">
                    <div class="relative">
                      <input 
                        type="text" 
                        placeholder="Search automations..." 
                        class="pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      />
                      <Icon name="mdi:magnify" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button class="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                      <Icon name="mdi:filter-variant" />
                    </button>
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div 
                    v-for="automation in automations" 
                    :key="automation.id" 
                    class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <div class="flex items-center">
                          <h4 class="text-lg font-semibold text-gray-800">{{ automation.name }}</h4>
                          <span 
                            class="ml-2 px-2 py-0.5 text-xs rounded-full"
                            :class="automation.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                          >
                            {{ automation.active ? 'Active' : 'Inactive' }}
                          </span>
                        </div>
                        <p class="text-gray-600 text-sm mt-1">{{ automation.description }}</p>
                        <div class="mt-2 flex items-center space-x-4">
                          <span class="flex items-center text-sm text-gray-500">
                            <Icon name="mdi:account-group" class="mr-1" />
                            {{ automation.targetGroup }}
                          </span>
                          <span class="flex items-center text-sm text-gray-500">
                            <Icon name="mdi:clock-outline" class="mr-1" />
                            {{ automation.frequency }}
                          </span>
                        </div>
                      </div>
                      <div class="flex space-x-2">
                        <button 
                          class="p-2 rounded-full transition-colors"
                          :class="automation.active ? 'text-amber-600 hover:bg-amber-50' : 'text-green-600 hover:bg-green-50'"
                        >
                          <Icon :name="automation.active ? 'mdi:pause' : 'mdi:play'" />
                        </button>
                        <button class="p-2 text-purple-600 hover:bg-purple-50 rounded-full transition-colors">
                          <Icon name="mdi:pencil" />
                        </button>
                        <button class="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors">
                          <Icon name="mdi:delete" />
                        </button>
                      </div>
                    </div>
                    
                    <div class="mt-4">
                      <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          class="bg-purple-600 h-2.5 rounded-full" 
                          :style="`width: ${automation.performance}%`"
                        ></div>
                      </div>
                      <div class="flex justify-between mt-1 text-xs text-gray-500">
                        <span>Performance</span>
                        <span>{{ automation.performance }}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Content Tab -->
              <div v-if="activeTab === 'content'" class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div 
                    v-for="content in contentItems" 
                    :key="content.id" 
                    class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div class="flex justify-between">
                      <div>
                        <h4 class="text-lg font-semibold text-gray-800">{{ content.title }}</h4>
                        <p class="text-gray-600 text-sm">{{ content.description }}</p>
                      </div>
                      <div class="flex items-start">
                        <span 
                          class="px-2 py-1 text-xs rounded-full"
                          :class="{
                            'bg-blue-100 text-blue-800': content.type === 'Devotional',
                            'bg-purple-100 text-purple-800': content.type === 'Study Plan',
                            'bg-amber-100 text-amber-800': content.type === 'Notification'
                          }"
                        >
                          {{ content.type }}
                        </span>
                      </div>
                    </div>
                    
                    <div class="mt-4 flex justify-between items-center">
                      <div class="flex items-center text-sm text-gray-500">
                        <Icon name="mdi:calendar" class="mr-1" />
                        {{ content.lastUpdated }}
                      </div>
                      <div class="flex space-x-2">
                        <button class="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                          Edit
                        </button>
                        <button class="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors">
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Analytics Tab -->
              <div v-if="activeTab === 'analytics'" class="p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Engagement Rate</h4>
                    <div class="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                      <!-- Placeholder for chart -->
                      <div class="text-center">
                        <div class="w-32 h-32 mx-auto rounded-full border-8 border-purple-500 border-t-transparent animate-spin"></div>
                        <p class="mt-4 text-gray-600">Engagement Rate: 78%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Message Open Rate</h4>
                    <div class="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                      <!-- Placeholder for chart -->
                      <div class="text-center">
                        <div class="w-32 h-32 mx-auto rounded-full border-8 border-blue-500 border-t-transparent animate-spin"></div>
                        <p class="mt-4 text-gray-600">Open Rate: 65%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div class="border border-gray-200 rounded-lg p-4 md:col-span-2">
                    <h4 class="text-lg font-semibold text-gray-800 mb-4">Monthly Engagement Trends</h4>
                    <div class="h-64 flex items-center justify-center bg-gray-100 rounded-lg">
                      <!-- Placeholder for chart -->
                      <div class="w-full max-w-md">
                        <div class="flex justify-between mb-2">
                          <span class="text-xs text-gray-500">Jan</span>
                          <span class="text-xs text-gray-500">Feb</span>
                          <span class="text-xs text-gray-500">Mar</span>
                          <span class="text-xs text-gray-500">Apr</span>
                          <span class="text-xs text-gray-500">May</span>
                          <span class="text-xs text-gray-500">Jun</span>
                        </div>
                        <div class="relative h-40">
                          <div class="absolute bottom-0 left-0 w-full h-full flex items-end">
                            <div class="w-1/6 h-[60%] bg-purple-500 mx-1 rounded-t-md"></div>
                            <div class="w-1/6 h-[45%] bg-purple-500 mx-1 rounded-t-md"></div>
                            <div class="w-1/6 h-[70%] bg-purple-500 mx-1 rounded-t-md"></div>
                            <div class="w-1/6 h-[55%] bg-purple-500 mx-1 rounded-t-md"></div>
                            <div class="w-1/6 h-[80%] bg-purple-500 mx-1 rounded-t-md"></div>
                            <div class="w-1/6 h-[75%] bg-purple-500 mx-1 rounded-t-md"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Recent Messages -->
            <div class="bg-white rounded-xl shadow-md p-6 animate-slide-in" style="--delay: 0.5s">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Recent Messages</h3>
              <div class="space-y-4">
                <div v-for="(message, index) in recentMessages" :key="index" class="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div class="flex justify-between">
                    <div>
                      <h4 class="font-medium text-gray-800">{{ message.subject }}</h4>
                      <p class="text-sm text-gray-600 mt-1">{{ message.preview }}</p>
                    </div>
                    <div>
                      <span 
                        class="px-2 py-1 text-xs rounded-full"
                        :class="{
                          'bg-green-100 text-green-800': message.status === 'Sent',
                          'bg-amber-100 text-amber-800': message.status === 'Scheduled',
                          'bg-blue-100 text-blue-800': message.status === 'Draft'
                        }"
                      >
                        {{ message.status }}
                      </span>
                    </div>
                  </div>
                  <div class="flex justify-between items-center mt-2">
                    <div class="flex items-center text-sm text-gray-500">
                      <Icon name="mdi:account-group" class="mr-1" />
                      <span>{{ message.recipients }}</span>
                      <span class="mx-2">•</span>
                      <Icon name="mdi:calendar" class="mr-1" />
                      <span>{{ message.date }}</span>
                    </div>
                    <div class="flex space-x-2">
                      <button class="text-purple-600 hover:text-purple-800 transition-colors">
                        <Icon name="mdi:eye" />
                      </button>
                      <button class="text-gray-600 hover:text-gray-800 transition-colors">
                        <Icon name="mdi:content-copy" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Create Automation Modal -->
      <Teleport to="body">
        <div v-if="showCreateAutomationModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 animate-modal-in">
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-gray-800">Create New Automation</h3>
                <button @click="showCreateAutomationModal = false" class="text-gray-500 hover:text-gray-700">
                  <Icon name="mdi:close" class="text-xl" />
                </button>
              </div>
              
              <form @submit.prevent="createAutomation">
                <div class="space-y-4">
                  <div>
                    <label for="automation-name" class="block text-sm font-medium text-gray-700 mb-1">Automation Name</label>
                    <input 
                      id="automation-name" 
                      v-model="newAutomation.name" 
                      type="text" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      placeholder="Enter automation name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="automation-description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      id="automation-description" 
                      v-model="newAutomation.description" 
                      rows="3" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                      placeholder="Enter automation description"
                    ></textarea>
                  </div>
                  
                  <div>
                    <label for="target-group" class="block text-sm font-medium text-gray-700 mb-1">Target Group</label>
                    <select 
                      id="target-group" 
                      v-model="newAutomation.targetGroup" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    >
                      <option value="New Members">New Members</option>
                      <option value="Absentees">Absentees</option>
                      <option value="All Members">All Members</option>
                      <option value="Group Leaders">Group Leaders</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="frequency" class="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                    <select 
                      id="frequency" 
                      v-model="newAutomation.frequency" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    >
                      <option value="Daily">Daily</option>
                      <option value="Weekly">Weekly</option>
                      <option value="Monthly">Monthly</option>
                      <option value="One-time">One-time</option>
                    </select>
                  </div>
                  
                  <div>
                    <label for="content-type" class="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                    <select 
                      id="content-type" 
                      v-model="newAutomation.contentType" 
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                    >
                      <option value="Devotional">Devotional</option>
                      <option value="Study Plan">Study Plan</option>
                      <option value="Notification">Notification</option>
                      <option value="Custom Message">Custom Message</option>
                    </select>
                  </div>
                  
                  <div class="flex items-center">
                    <input 
                      id="active-status" 
                      v-model="newAutomation.active" 
                      type="checkbox" 
                      class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <label for="active-status" class="ml-2 block text-sm text-gray-700">
                      Activate immediately
                    </label>
                  </div>
                </div>
                
                <div class="mt-6 flex justify-end space-x-3">
                  <button 
                    type="button" 
                    @click="showCreateAutomationModal = false"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Create Automation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  
  useHead({
    title: 'Automated Follow-ups',
    meta: [
      { name: 'description', content: 'Automate engagement with members through personalized follow-ups' }
    ]
  });
  
  // Stats data
  const stats = reactive({
    activeAutomations: 8,
    newMembers: 24,
    absentees: 15,
    engagementRate: 78
  });
  
  // Tabs
  const tabs = [
    { id: 'automations', name: 'Automations' },
    { id: 'content', name: 'Content Library' },
    { id: 'analytics', name: 'Analytics' }
  ];
  const activeTab = ref('automations');
  
  // Automations data
  const automations = ref([
    {
      id: 1,
      name: 'New Member Welcome Series',
      description: 'A series of welcome messages for new church members',
      targetGroup: 'New Members',
      frequency: 'Weekly',
      active: true,
      performance: 85
    },
    {
      id: 2,
      name: 'Absentee Follow-up',
      description: 'Reach out to members who have missed services',
      targetGroup: 'Absentees',
      frequency: 'Weekly',
      active: true,
      performance: 72
    },
    {
      id: 3,
      name: 'Daily Devotional',
      description: 'Send daily devotionals to all members',
      targetGroup: 'All Members',
      frequency: 'Daily',
      active: true,
      performance: 90
    },
    {
      id: 4,
      name: 'Birthday Greetings',
      description: 'Automated birthday wishes to members',
      targetGroup: 'All Members',
      frequency: 'One-time',
      active: true,
      performance: 95
    }
  ]);
  
  // Content items data
  const contentItems = ref([
    {
      id: 1,
      title: 'Daily Devotional: Faith',
      description: 'A week of devotionals focused on faith',
      type: 'Devotional',
      lastUpdated: '2025-03-01'
    },
    {
      id: 2,
      title: 'New Testament Study Plan',
      description: 'A 30-day study plan through the New Testament',
      type: 'Study Plan',
      lastUpdated: '2025-02-15'
    },
    {
      id: 3,
      title: 'Welcome to Our Church',
      description: 'Introduction series for new members',
      type: 'Devotional',
      lastUpdated: '2025-03-05'
    },
    {
      id: 4,
      title: 'Birthday Greeting Template',
      description: 'Template for birthday greetings',
      type: 'Notification',
      lastUpdated: '2025-01-20'
    }
  ]);
  
  // Recent messages data
  const recentMessages = ref([
    {
      subject: 'Welcome to Our Church Family!',
      preview: 'We\'re so glad you\'ve joined our community...',
      recipients: 'New Members',
      date: '2025-03-10',
      status: 'Sent'
    },
    {
      subject: 'Daily Devotional: Strength in Faith',
      preview: 'Today\'s devotional focuses on finding strength...',
      recipients: 'All Members',
      date: '2025-03-11',
      status: 'Scheduled'
    },
    {
      subject: 'We Miss You!',
      preview: 'We noticed you\'ve been away for a few weeks...',
      recipients: 'Absentees',
      date: '2025-03-09',
      status: 'Sent'
    },
    {
      subject: 'Happy Birthday from Your Church Family',
      preview: 'Wishing you a blessed birthday filled with joy...',
      recipients: 'March Birthdays',
      date: '2025-03-12',
      status: 'Draft'
    }
  ]);
  
  // Upcoming birthdays data
  const upcomingBirthdays = ref([
    {
      name: 'Michael Johnson',
      date: 'March 15'
    },
    {
      name: 'Sarah Williams',
      date: 'March 18'
    },
    {
      name: 'David Brown',
      date: 'March 22'
    },
    {
      name: 'Emily Davis',
      date: 'March 25'
    }
  ]);

  definePageMeta({
      layout: 'dashboard'
  })
  // Create Automation Modal
  const showCreateAutomationModal = ref(false);
  const newAutomation = reactive({
    name: '',
    description: '',
    targetGroup: 'New Members',
    frequency: 'Weekly',
    contentType: 'Devotional',
    active: true
  });
  
  function createAutomation() {
    // Add the new automation to the list
    const id = automations.value.length + 1;
    automations.value.push({
      id,
      name: newAutomation.name,
      description: newAutomation.description,
      targetGroup: newAutomation.targetGroup,
      frequency: newAutomation.frequency,
      active: newAutomation.active,
      performance: 0
    });
    
    // Reset form and close modal
    newAutomation.name = '';
    newAutomation.description = '';
    newAutomation.targetGroup = 'New Members';
    newAutomation.frequency = 'Weekly';
    newAutomation.contentType = 'Devotional';
    newAutomation.active = true;
    showCreateAutomationModal.value = false;
  }
  </script>
  
  <style scoped>
  .animate-fade-in {
    animation: fadeIn 0.8s ease-in-out;
  }
  
  .animate-slide-in {
    animation: slideIn 0.5s ease-out;
    animation-fill-mode: both;
    animation-delay: var(--delay, 0s);
  }
  
  .animate-modal-in {
    animation: modalIn 0.3s ease-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes modalIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>